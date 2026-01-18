import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import AdminLayout from '../Layout/AdminLayout'
import { IoCloudUploadOutline, IoCheckmarkCircle, IoAlertCircle } from 'react-icons/io5'
import './SeedPage.css'

// Import the static data
import { PricingData, frequentData } from '../../../../data/index.js'

export default function SeedPage() {
  const [seeding, setSeeding] = useState(false)
  const [status, setStatus] = useState([])
  const [completed, setCompleted] = useState(false)
  const [error, setError] = useState(null)

  function addStatus(message, type = 'info') {
    setStatus(prev => [...prev, { message, type, time: new Date().toLocaleTimeString() }])
  }

  async function runSeed() {
    setSeeding(true)
    setStatus([])
    setError(null)
    setCompleted(false)

    try {
      // Step 1: Clear existing data
      addStatus('Clearing existing data...')

      await supabase.from('cards').delete().neq('id', '00000000-0000-0000-0000-000000000000')
      await supabase.from('faqs').delete().neq('id', '00000000-0000-0000-0000-000000000000')
      // Delete sub-tabs first (those with parent_id)
      await supabase.from('tabs').delete().not('parent_id', 'is', null)
      // Then delete main tabs
      await supabase.from('tabs').delete().neq('id', '00000000-0000-0000-0000-000000000000')

      addStatus('Existing data cleared', 'success')

      // Step 2: Create the 4 main tabs with correct structure
      addStatus('Creating main tabs...')

      const mainTabsData = [
        { title: 'SMM', description: 'Social Media Management', order_position: 0, is_parent: false },
        { title: 'ADS', description: 'Ads Management Packages', order_position: 1, is_parent: false },
        { title: 'Content', description: 'Content Creation & Videography', order_position: 2, is_parent: false },
        { title: 'Others+', description: 'Additional Services', order_position: 3, is_parent: true }
      ]

      const { data: createdTabs, error: tabsError } = await supabase
        .from('tabs')
        .insert(mainTabsData)
        .select()

      if (tabsError) throw new Error(`Failed to create main tabs: ${tabsError.message}`)

      const tabMap = {}
      createdTabs.forEach(tab => {
        tabMap[tab.title] = tab.id
      })

      addStatus('Created main tabs: SMM, ADS, Content, Others+', 'success')

      // Step 3: Create sub-tabs under Others+
      addStatus('Creating sub-tabs under Others+...')

      const othersTabId = tabMap['Others+']
      const subTabsData = [
        { title: 'Web', description: 'Website Design & Development', order_position: 0, parent_id: othersTabId, is_parent: false },
        { title: 'Graphics', description: 'Graphics Design Services', order_position: 1, parent_id: othersTabId, is_parent: false }
      ]

      const { data: createdSubTabs, error: subTabsError } = await supabase
        .from('tabs')
        .insert(subTabsData)
        .select()

      if (subTabsError) throw new Error(`Failed to create sub-tabs: ${subTabsError.message}`)

      createdSubTabs.forEach(tab => {
        tabMap[tab.title] = tab.id
      })

      addStatus('Created sub-tabs: Web, Graphics', 'success')

      // Step 4: Seed cards for each tab based on PricingData
      addStatus('Seeding cards...')

      // Map PricingData categories to tabs
      const categoryToTab = {
        'Social Media Management': 'SMM',
        'Ads Management Packages': 'ADS',
        'ORVYN MEDIA MOBILE VIDEOGRAPHY RATES': 'Content',
        'Graphics Design': 'Graphics',
        'Website Design & Development': 'Web'
      }

      for (const category of PricingData) {
        const tabName = categoryToTab[category.category]
        if (!tabName) {
          addStatus(`Skipping unknown category: ${category.category}`, 'warning')
          continue
        }

        const tabId = tabMap[tabName]
        if (!tabId) {
          addStatus(`Tab not found for: ${tabName}`, 'warning')
          continue
        }

        addStatus(`Adding cards to ${tabName}...`)

        let cardOrder = 0

        if (category.packages) {
          // Categories with packages array
          for (const pkg of category.packages) {
            // Check if this package has nested tiers (like Videography)
            if (Array.isArray(pkg.tier)) {
              // Nested tier structure (Videography)
              for (const tierItem of pkg.tier) {
                const deliverables = tierItem.deliverables || []

                const { error: cardError } = await supabase
                  .from('cards')
                  .insert({
                    tab_id: tabId,
                    tier: tierItem.tierPack,
                    tagline: tierItem.description || pkg.typeText || '',
                    prep_time: tierItem.prepTime || '',
                    deliverables: deliverables,
                    button_label: tierItem.buttonLabel || 'Get Started',
                    button_link: tierItem.buttonLink || '/contact',
                    order_position: cardOrder++
                  })

                if (cardError) {
                  addStatus(`Warning: Could not create card "${tierItem.tierPack}"`, 'warning')
                } else {
                  addStatus(`  - Created: ${tierItem.tierPack}`, 'success')
                }
              }
            } else {
              // Simple package structure (SMM, Ads)
              const deliverables = pkg.deliverables || []

              const { error: cardError } = await supabase
                .from('cards')
                .insert({
                  tab_id: tabId,
                  tier: pkg.tier,
                  tagline: pkg.tagline || pkg.description || '',
                  prep_time: pkg.prepTime || '',
                  deliverables: deliverables,
                  button_label: pkg.buttonLabel || 'Get Started',
                  button_link: pkg.buttonLink || '/contact',
                  order_position: cardOrder++
                })

              if (cardError) {
                addStatus(`Warning: Could not create card "${pkg.tier}"`, 'warning')
              } else {
                addStatus(`  - Created: ${pkg.tier}`, 'success')
              }
            }
          }
        } else if (category.deliverables && Array.isArray(category.deliverables)) {
          // Graphics Design and Website Dev have deliverables as array of objects
          const deliverableStrings = category.deliverables.map(d => `${d.title}: ${d.text}`)

          const { error: cardError } = await supabase
            .from('cards')
            .insert({
              tab_id: tabId,
              tier: category.category,
              tagline: category.description || '',
              prep_time: '',
              deliverables: deliverableStrings,
              button_label: category.buttonLabel || 'Get Started',
              button_link: category.buttonLink || '/contact',
              order_position: 0
            })

          if (cardError) {
            addStatus(`Warning: Could not create card for "${category.category}"`, 'warning')
          } else {
            addStatus(`  - Created: ${category.category}`, 'success')
          }
        }
      }

      // Step 5: Seed FAQs
      addStatus('Seeding FAQs...')

      for (let i = 0; i < frequentData.length; i++) {
        const faq = frequentData[i]

        // Convert answer format - ensure highlight is boolean
        const answerParts = faq.answer.map(part => ({
          text: part.text,
          highlight: Boolean(part.highlight && part.highlight.length > 0)
        }))

        const { error: faqError } = await supabase
          .from('faqs')
          .insert({
            question: faq.question,
            answer: answerParts,
            order_position: i
          })

        if (faqError) {
          addStatus(`Warning: Could not create FAQ "${faq.question.substring(0, 30)}..."`, 'warning')
        } else {
          addStatus(`Created FAQ: ${faq.question.substring(0, 40)}...`, 'success')
        }
      }

      addStatus('Seeding completed successfully!', 'success')
      setCompleted(true)

    } catch (err) {
      console.error('Seed error:', err)
      setError(err.message)
      addStatus(`Error: ${err.message}`, 'error')
    } finally {
      setSeeding(false)
    }
  }

  // Calculate expected counts
  const expectedTabs = 6 // 4 main + 2 sub
  const expectedCards = PricingData.reduce((acc, cat) => {
    if (cat.packages) {
      return acc + cat.packages.reduce((a, p) => {
        if (Array.isArray(p.tier)) return a + p.tier.length
        return a + 1
      }, 0)
    }
    return acc + 1
  }, 0)

  return (
    <AdminLayout>
      <div className="admin-page seed-page">
        <div className="admin-page-header">
          <div>
            <h1>Seed Database</h1>
            <p>Populate the database with existing static data</p>
          </div>
        </div>

        <div className="admin-card seed-card">
          <div className="seed-intro">
            <IoCloudUploadOutline className="seed-icon" />
            <h2>Import Static Data</h2>
            <p>
              This will import your existing pricing data and FAQs with the correct tab structure:
            </p>
            <ul className="structure-list">
              <li><strong>SMM</strong> - Social Media Management cards</li>
              <li><strong>ADS</strong> - Ads Management cards</li>
              <li><strong>Content</strong> - Videography/Content cards</li>
              <li><strong>Others+</strong> (Parent Tab)
                <ul>
                  <li><strong>Web</strong> - Website Design cards</li>
                  <li><strong>Graphics</strong> - Graphics Design cards</li>
                </ul>
              </li>
            </ul>

            <div className="seed-summary">
              <div className="summary-item">
                <span className="summary-count">{expectedTabs}</span>
                <span className="summary-label">Tabs</span>
              </div>
              <div className="summary-item">
                <span className="summary-count">{expectedCards}</span>
                <span className="summary-label">Cards</span>
              </div>
              <div className="summary-item">
                <span className="summary-count">{frequentData.length}</span>
                <span className="summary-label">FAQs</span>
              </div>
            </div>

            <button
              className="seed-btn"
              onClick={runSeed}
              disabled={seeding || completed}
            >
              {seeding ? 'Seeding...' : completed ? 'Completed' : 'Start Seeding'}
            </button>
          </div>

          {status.length > 0 && (
            <div className="seed-log">
              <h3>Progress Log</h3>
              <div className="log-entries">
                {status.map((entry, idx) => (
                  <div key={idx} className={`log-entry ${entry.type}`}>
                    {entry.type === 'success' && <IoCheckmarkCircle />}
                    {entry.type === 'error' && <IoAlertCircle />}
                    {entry.type === 'warning' && <IoAlertCircle />}
                    <span className="log-time">{entry.time}</span>
                    <span className="log-message">{entry.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="seed-error">
              <IoAlertCircle />
              <p>{error}</p>
            </div>
          )}

          {completed && (
            <div className="seed-success">
              <IoCheckmarkCircle />
              <p>Database seeded successfully! You can now manage your content from the admin panel.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
