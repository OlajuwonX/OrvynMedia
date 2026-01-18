import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { tabsApi, cardsApi, faqsApi } from '../../../lib/supabase'
import AdminLayout from '../Layout/AdminLayout'
import {
  IoLayersOutline,
  IoDocumentTextOutline,
  IoHelpCircleOutline,
  IoArrowForward,
  IoTimeOutline
} from 'react-icons/io5'
import './Dashboard.css'

export default function Dashboard() {
  const [stats, setStats] = useState({
    tabs: 0,
    cards: 0,
    faqs: 0
  })
  const [recentItems, setRecentItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [tabs, cards, faqs] = await Promise.all([
        tabsApi.getAll(),
        cardsApi.getAll(),
        faqsApi.getAll()
      ])

      setStats({
        tabs: tabs?.length || 0,
        cards: cards?.length || 0,
        faqs: faqs?.length || 0
      })

      // Get recent items from all types
      const allItems = [
        ...(tabs || []).map(t => ({ ...t, type: 'tab', name: t.title })),
        ...(cards || []).map(c => ({ ...c, type: 'card', name: c.tier })),
        ...(faqs || []).map(f => ({ ...f, type: 'faq', name: f.question?.substring(0, 50) + '...' }))
      ]

      // Sort by updated_at and take last 5
      allItems.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      setRecentItems(allItems.slice(0, 5))
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const statCards = [
    {
      title: 'Tabs',
      count: stats.tabs,
      icon: IoLayersOutline,
      link: '/admin/tabs',
      color: '#a63509'
    },
    {
      title: 'Cards',
      count: stats.cards,
      icon: IoDocumentTextOutline,
      link: '/admin/cards',
      color: '#059669'
    },
    {
      title: 'FAQs',
      count: stats.faqs,
      icon: IoHelpCircleOutline,
      link: '/admin/faqs',
      color: '#7c3aed'
    }
  ]

  return (
    <AdminLayout>
      <div className="admin-page dashboard-page">
        <div className="admin-page-header">
          <div>
            <h1>Dashboard</h1>
            <p>Overview of your content</p>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <div className="stats-grid">
              {statCards.map((stat) => (
                <Link
                  key={stat.title}
                  to={stat.link}
                  className="stat-card"
                >
                  <div
                    className="stat-icon"
                    style={{ background: `${stat.color}15`, color: stat.color }}
                  >
                    <stat.icon />
                  </div>
                  <div className="stat-info">
                    <span className="stat-count">{stat.count}</span>
                    <span className="stat-title">{stat.title}</span>
                  </div>
                  <IoArrowForward className="stat-arrow" />
                </Link>
              ))}
            </div>

            <div className="dashboard-section">
              <h2>
                <IoTimeOutline />
                Recent Activity
              </h2>
              <div className="admin-card">
                {recentItems.length > 0 ? (
                  <ul className="activity-list">
                    {recentItems.map((item) => (
                      <li key={`${item.type}-${item.id}`} className="activity-item">
                        <div className="activity-icon" data-type={item.type}>
                          {item.type === 'tab' && <IoLayersOutline />}
                          {item.type === 'card' && <IoDocumentTextOutline />}
                          {item.type === 'faq' && <IoHelpCircleOutline />}
                        </div>
                        <div className="activity-content">
                          <span className="activity-name">{item.name}</span>
                          <span className="activity-type">
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </span>
                        </div>
                        <span className="activity-time">
                          {formatDate(item.updated_at)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="empty-state">
                    <IoTimeOutline />
                    <h3>No recent activity</h3>
                    <p>Start by creating some content</p>
                  </div>
                )}
              </div>
            </div>

            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                <Link to="/admin/tabs" className="action-card">
                  <IoLayersOutline />
                  <span>Manage Tabs</span>
                </Link>
                <Link to="/admin/cards" className="action-card">
                  <IoDocumentTextOutline />
                  <span>Manage Cards</span>
                </Link>
                <Link to="/admin/faqs" className="action-card">
                  <IoHelpCircleOutline />
                  <span>Manage FAQs</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
