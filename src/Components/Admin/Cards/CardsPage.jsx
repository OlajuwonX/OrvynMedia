import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import AdminLayout from '../Layout/AdminLayout'
import Modal from '../Modal/Modal'
import {
  IoAddOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoDocumentTextOutline,
  IoWarningOutline,
  IoCloseOutline,
  IoAddCircleOutline
} from 'react-icons/io5'
import './CardsPage.css'

export default function CardsPage() {
  const [cards, setCards] = useState([])
  const [tabs, setTabs] = useState([])
  const [selectedTabFilter, setSelectedTabFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  // Form states
  const [formData, setFormData] = useState({
    tab_id: '',
    tier: '',
    tagline: '',
    prep_time: '',
    deliverables: [''],
    button_label: '',
    button_link: ''
  })
  const [formError, setFormError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [tabsRes, cardsRes] = await Promise.all([
        supabase.from('tabs').select('*').order('order_position'),
        supabase.from('cards').select('*').order('order_position')
      ])

      if (tabsRes.error) throw tabsRes.error
      if (cardsRes.error) throw cardsRes.error

      setTabs(tabsRes.data || [])
      setCards(cardsRes.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get tabs that can have cards (non-parent main tabs + all sub-tabs)
  function getAssignableTabs() {
    return tabs.filter(tab => !tab.is_parent)
  }

  // Get tabs for filter (includes parent tabs to show grouped cards)
  function getFilterTabs() {
    // Main tabs only for filter
    return tabs.filter(tab => !tab.parent_id)
  }

  // Get sub-tabs of a parent
  function getSubTabs(parentId) {
    return tabs.filter(tab => tab.parent_id === parentId)
  }

  function getFilteredCards() {
    if (selectedTabFilter === 'all') return cards

    const filterTab = tabs.find(t => t.id === selectedTabFilter)
    if (!filterTab) return cards

    if (filterTab.is_parent) {
      // If filtering by parent tab, show cards from all sub-tabs
      const subTabIds = getSubTabs(filterTab.id).map(t => t.id)
      return cards.filter(card => subTabIds.includes(card.tab_id))
    }

    return cards.filter(card => card.tab_id === selectedTabFilter)
  }

  function getTabName(tabId) {
    const tab = tabs.find(t => t.id === tabId)
    if (!tab) return 'Unknown'

    // If it's a sub-tab, show parent > sub format
    if (tab.parent_id) {
      const parent = tabs.find(t => t.id === tab.parent_id)
      return parent ? `${parent.title} > ${tab.title}` : tab.title
    }

    return tab.title
  }

  function openCreateModal() {
    const assignableTabs = getAssignableTabs()
    setFormData({
      tab_id: assignableTabs[0]?.id || '',
      tier: '',
      tagline: '',
      prep_time: '',
      deliverables: [''],
      button_label: 'Get Started',
      button_link: '/contact'
    })
    setFormError('')
    setCreateModalOpen(true)
  }

  function openEditModal(card) {
    setSelectedCard(card)
    setFormData({
      tab_id: card.tab_id,
      tier: card.tier,
      tagline: card.tagline || '',
      prep_time: card.prep_time || '',
      deliverables: card.deliverables?.length > 0 ? card.deliverables : [''],
      button_label: card.button_label,
      button_link: card.button_link
    })
    setFormError('')
    setEditModalOpen(true)
  }

  function openDeleteModal(card) {
    setSelectedCard(card)
    setDeleteModalOpen(true)
  }

  function closeModals() {
    setCreateModalOpen(false)
    setEditModalOpen(false)
    setDeleteModalOpen(false)
    setSelectedCard(null)
    setFormData({
      tab_id: '',
      tier: '',
      tagline: '',
      prep_time: '',
      deliverables: [''],
      button_label: '',
      button_link: ''
    })
    setFormError('')
  }

  function addDeliverable() {
    setFormData({
      ...formData,
      deliverables: [...formData.deliverables, '']
    })
  }

  function removeDeliverable(index) {
    if (formData.deliverables.length === 1) return
    const newDeliverables = formData.deliverables.filter((_, i) => i !== index)
    setFormData({ ...formData, deliverables: newDeliverables })
  }

  function updateDeliverable(index, value) {
    const newDeliverables = [...formData.deliverables]
    newDeliverables[index] = value
    setFormData({ ...formData, deliverables: newDeliverables })
  }

  function validateForm() {
    if (!formData.tab_id) {
      setFormError('Please select a tab')
      return false
    }
    if (!formData.tier.trim()) {
      setFormError('Tier name is required')
      return false
    }
    if (!formData.button_label.trim()) {
      setFormError('Button label is required')
      return false
    }
    if (!formData.button_link.trim()) {
      setFormError('Button link is required')
      return false
    }
    const validDeliverables = formData.deliverables.filter(d => d.trim())
    if (validDeliverables.length === 0) {
      setFormError('At least one deliverable is required')
      return false
    }
    return true
  }

  async function handleCreate(e) {
    e.preventDefault()
    setFormError('')

    if (!validateForm()) return

    setSaving(true)
    try {
      const tabCards = cards.filter(c => c.tab_id === formData.tab_id)
      const newCard = {
        tab_id: formData.tab_id,
        tier: formData.tier.trim(),
        tagline: formData.tagline.trim(),
        prep_time: formData.prep_time.trim(),
        deliverables: formData.deliverables.filter(d => d.trim()),
        button_label: formData.button_label.trim(),
        button_link: formData.button_link.trim(),
        order_position: tabCards.length
      }

      const { error } = await supabase.from('cards').insert([newCard])
      if (error) throw error

      await fetchData()
      closeModals()
    } catch (error) {
      setFormError(error.message || 'Failed to create card')
    } finally {
      setSaving(false)
    }
  }

  async function handleEdit(e) {
    e.preventDefault()
    setFormError('')

    if (!validateForm()) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('cards')
        .update({
          tab_id: formData.tab_id,
          tier: formData.tier.trim(),
          tagline: formData.tagline.trim(),
          prep_time: formData.prep_time.trim(),
          deliverables: formData.deliverables.filter(d => d.trim()),
          button_label: formData.button_label.trim(),
          button_link: formData.button_link.trim()
        })
        .eq('id', selectedCard.id)

      if (error) throw error

      await fetchData()
      closeModals()
    } catch (error) {
      setFormError(error.message || 'Failed to update card')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('cards')
        .delete()
        .eq('id', selectedCard.id)

      if (error) throw error

      await fetchData()
      closeModals()
    } catch (error) {
      console.error('Error deleting card:', error)
    } finally {
      setSaving(false)
    }
  }

  const filteredCards = getFilteredCards()
  const assignableTabs = getAssignableTabs()
  const filterTabs = getFilterTabs()

  // Group assignable tabs by parent for the dropdown
  function renderTabOptions() {
    const mainTabs = tabs.filter(t => !t.parent_id && !t.is_parent)
    const parentTabs = tabs.filter(t => t.is_parent)

    return (
      <>
        {mainTabs.map(tab => (
          <option key={tab.id} value={tab.id}>{tab.title}</option>
        ))}
        {parentTabs.map(parent => {
          const subTabs = getSubTabs(parent.id)
          return subTabs.map(sub => (
            <option key={sub.id} value={sub.id}>{parent.title} → {sub.title}</option>
          ))
        })}
      </>
    )
  }

  return (
    <AdminLayout>
      <div className="admin-page cards-page">
        <div className="admin-page-header">
          <div>
            <h1>Cards</h1>
            <p>Manage service pricing cards</p>
          </div>
          <button className="add-btn" onClick={openCreateModal} disabled={assignableTabs.length === 0}>
            <IoAddOutline />
            Add Card
          </button>
        </div>

        {/* Tab filter */}
        {filterTabs.length > 0 && (
          <div className="tab-filter">
            <button
              className={`filter-btn ${selectedTabFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedTabFilter('all')}
            >
              All
            </button>
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                className={`filter-btn ${selectedTabFilter === tab.id ? 'active' : ''}`}
                onClick={() => setSelectedTabFilter(tab.id)}
              >
                {tab.title}
              </button>
            ))}
          </div>
        )}

        <div className="admin-card">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
            </div>
          ) : assignableTabs.length === 0 ? (
            <div className="empty-state">
              <IoDocumentTextOutline />
              <h3>No tabs available</h3>
              <p>Create a tab first before adding cards</p>
            </div>
          ) : filteredCards.length > 0 ? (
            <div className="cards-grid">
              {filteredCards.map((card) => (
                <div key={card.id} className="card-item">
                  <div className="card-header">
                    <span className="card-tab-badge">{getTabName(card.tab_id)}</span>
                    <div className="card-actions">
                      <button
                        className="action-btn edit"
                        onClick={() => openEditModal(card)}
                        title="Edit"
                      >
                        <IoPencilOutline />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => openDeleteModal(card)}
                        title="Delete"
                      >
                        <IoTrashOutline />
                      </button>
                    </div>
                  </div>
                  <h3 className="card-tier">{card.tier}</h3>
                  {card.tagline && <p className="card-tagline">{card.tagline}</p>}
                  {card.prep_time && (
                    <span className="card-prep">{card.prep_time}</span>
                  )}
                  <ul className="card-deliverables">
                    {card.deliverables?.slice(0, 4).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                    {card.deliverables?.length > 4 && (
                      <li className="more">+{card.deliverables.length - 4} more</li>
                    )}
                  </ul>
                  <div className="card-button-preview">
                    {card.button_label}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <IoDocumentTextOutline />
              <h3>No cards yet</h3>
              <p>Create your first pricing card</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={closeModals}
        title="Create New Card"
        size="large"
      >
        <form onSubmit={handleCreate}>
          {formError && <div className="form-error">{formError}</div>}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tab">Tab *</label>
              <select
                id="tab"
                value={formData.tab_id}
                onChange={(e) => setFormData({ ...formData, tab_id: e.target.value })}
              >
                {renderTabOptions()}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="tier">Tier Name *</label>
              <input
                type="text"
                id="tier"
                value={formData.tier}
                onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                placeholder="e.g., Basic, Premium"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tagline">Tagline</label>
              <input
                type="text"
                id="tagline"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="Short description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="prep_time">Prep Time</label>
              <input
                type="text"
                id="prep_time"
                value={formData.prep_time}
                onChange={(e) => setFormData({ ...formData, prep_time: e.target.value })}
                placeholder="e.g., 3-5 days"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Deliverables *</label>
            <div className="deliverables-list">
              {formData.deliverables.map((item, index) => (
                <div key={index} className="deliverable-item">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateDeliverable(index, e.target.value)}
                    placeholder="Enter deliverable"
                  />
                  {formData.deliverables.length > 1 && (
                    <button
                      type="button"
                      className="remove-deliverable"
                      onClick={() => removeDeliverable(index)}
                    >
                      <IoCloseOutline />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="add-deliverable"
                onClick={addDeliverable}
              >
                <IoAddCircleOutline />
                Add Deliverable
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="button_label">Button Label *</label>
              <input
                type="text"
                id="button_label"
                value={formData.button_label}
                onChange={(e) => setFormData({ ...formData, button_label: e.target.value })}
                placeholder="e.g., Get Started"
              />
            </div>
            <div className="form-group">
              <label htmlFor="button_link">Button Link *</label>
              <input
                type="text"
                id="button_link"
                value={formData.button_link}
                onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                placeholder="/contact or https://..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={closeModals}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Creating...' : 'Create Card'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={closeModals}
        title="Edit Card"
        size="large"
      >
        <form onSubmit={handleEdit}>
          {formError && <div className="form-error">{formError}</div>}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-tab">Tab *</label>
              <select
                id="edit-tab"
                value={formData.tab_id}
                onChange={(e) => setFormData({ ...formData, tab_id: e.target.value })}
              >
                {renderTabOptions()}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="edit-tier">Tier Name *</label>
              <input
                type="text"
                id="edit-tier"
                value={formData.tier}
                onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                placeholder="e.g., Basic, Premium"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-tagline">Tagline</label>
              <input
                type="text"
                id="edit-tagline"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="Short description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-prep_time">Prep Time</label>
              <input
                type="text"
                id="edit-prep_time"
                value={formData.prep_time}
                onChange={(e) => setFormData({ ...formData, prep_time: e.target.value })}
                placeholder="e.g., 3-5 days"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Deliverables *</label>
            <div className="deliverables-list">
              {formData.deliverables.map((item, index) => (
                <div key={index} className="deliverable-item">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateDeliverable(index, e.target.value)}
                    placeholder="Enter deliverable"
                  />
                  {formData.deliverables.length > 1 && (
                    <button
                      type="button"
                      className="remove-deliverable"
                      onClick={() => removeDeliverable(index)}
                    >
                      <IoCloseOutline />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="add-deliverable"
                onClick={addDeliverable}
              >
                <IoAddCircleOutline />
                Add Deliverable
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-button_label">Button Label *</label>
              <input
                type="text"
                id="edit-button_label"
                value={formData.button_label}
                onChange={(e) => setFormData({ ...formData, button_label: e.target.value })}
                placeholder="e.g., Get Started"
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-button_link">Button Link *</label>
              <input
                type="text"
                id="edit-button_link"
                value={formData.button_link}
                onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                placeholder="/contact or https://..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={closeModals}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={closeModals}
        title="Delete Card"
        size="small"
      >
        <div className="confirm-dialog">
          <div className="warning-icon">
            <IoWarningOutline />
          </div>
          <p>
            Are you sure you want to delete the <strong>{selectedCard?.tier}</strong> card?
            This action cannot be undone.
          </p>
          <div className="form-actions">
            <button className="btn btn-secondary" onClick={closeModals}>
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={saving}
            >
              {saving ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  )
}
