import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import {
  IoGridOutline,
  IoLayersOutline,
  IoDocumentTextOutline,
  IoHelpCircleOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoChevronForward,
  IoChevronBackOutline
} from 'react-icons/io5'
import './AdminLayout.css'

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: IoGridOutline },
  { path: '/admin/tabs', label: 'Tabs', icon: IoLayersOutline },
  { path: '/admin/cards', label: 'Cards', icon: IoDocumentTextOutline },
  { path: '/admin/faqs', label: 'FAQs', icon: IoHelpCircleOutline }
]

export default function AdminLayout({ children }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved === 'true') {
      setSidebarCollapsed(true)
    }
  }, [])

  function toggleCollapse() {
    const newState = !sidebarCollapsed
    setSidebarCollapsed(newState)
    localStorage.setItem('sidebar-collapsed', String(newState))
  }

  async function handleLogout() {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className={`admin-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Mobile header */}
      <header className="admin-mobile-header">
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <IoCloseOutline /> : <IoMenuOutline />}
        </button>
        {/*<span className="admin-title">Orvyn Admin</span>*/}
      </header>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''} ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h1> </h1>
          <button className="collapse-btn" onClick={toggleCollapse} title={sidebarCollapsed ? 'Expand' : 'Collapse'}>
            {sidebarCollapsed ? <IoChevronForward /> : <IoChevronBackOutline />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
              title={sidebarCollapsed ? item.label : ''}
            >
              <item.icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              <IoChevronForward className="nav-arrow" />
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="user-details">
              <span className="user-email">{user?.email || 'Admin'}</span>
              <span className="user-role">Administrator</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <IoLogOutOutline />
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}
