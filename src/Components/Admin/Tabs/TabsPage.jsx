import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import AdminLayout from '../Layout/AdminLayout'
import Modal from '../Modal/Modal'
import {
  IoAddOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoLayersOutline,
  IoWarningOutline,
  IoChevronDownOutline,
  IoChevronForwardOutline
} from 'react-icons/io5'
import './TabsPage.css'

export default function TabsPage() {
  const [tabs, setTabs] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [expandedTabs, setExpandedTabs] = useState({})

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState(null)
  const [createType, setCreateType] = useState('main') // 'main' or 'sub'
  const [parentTabId, setParentTabId] = useState(null)

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    is_parent: false
  })
  const [formError, setFormError] = useState('')

  useEffect(() => {
    fetchTabs()
  }, [])

  async function fetchTabs() {
    try {
      const { data, error } = await supabase
        .from('tabs')
        .select('*')
        .order('order_position', { ascending: true })

      if (error) throw error
      setTabs(data || [])

      // Auto-expand parent tabs
      const expanded = {}
      data?.forEach(tab => {
        if (tab.is_parent) {
          expanded[tab.id] = true
        }
      })
      setExpandedTabs(expanded)
    } catch (error) {
      console.error('Error fetching tabs:', error)
    } finally {
      setLoading(false)
    }
  }

  // Organize tabs into hierarchy
  function getMainTabs() {
    return tabs.filter(tab => !tab.parent_id)
  }

  function getSubTabs(parentId) {
    return tabs.filter(tab => tab.parent_id === parentId)
  }

  function getParentTabs() {
    return tabs.filter(tab => tab.is_parent)
  }

  function toggleExpand(tabId) {
    setExpandedTabs(prev => ({
      ...prev,
      [tabId]: !prev[tabId]
    }))
  }

  function openCreateModal(type = 'main', parentId = null) {
    setCreateType(type)
    setParentTabId(parentId)
    setFormData({ title: '', description: '', is_parent: false })
    setFormError('')
    setCreateModalOpen(true)
  }

  function openEditModal(tab) {
    setSelectedTab(tab)
    setFormData({
      title: tab.title,
      description: tab.description || '',
      is_parent: tab.is_parent || false
    })
    setFormError('')
    setEditModalOpen(true)
  }

  function openDeleteModal(tab) {
    setSelectedTab(tab)
    setDeleteModalOpen(true)
  }

  function closeModals() {
    setCreateModalOpen(false)
    setEditModalOpen(false)
    setDeleteModalOpen(false)
    setSelectedTab(null)
    setParentTabId(null)
    setFormData({ title: '', description: '', is_parent: false })
    setFormError('')
  }

  async function handleCreate(e) {
    e.preventDefault()
    setFormError('')

    if (!formData.title.trim()) {
      setFormError('Title is required')
      return
    }

    setSaving(true)
    try {
      const relevantTabs = createType === 'sub'
        ? tabs.filter(t => t.parent_id === parentTabId)
        : tabs.filter(t => !t.parent_id)

      const newTab = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        is_parent: createType === 'main' ? formData.is_parent : false,
        parent_id: createType === 'sub' ? parentTabId : null,
        order_position: relevantTabs.length
      }

      const { error } = await supabase.from('tabs').insert([newTab])
      if (error) throw error

      await fetchTabs()
      closeModals()
    } catch (error) {
      setFormError(error.message || 'Failed to create tab')
    } finally {
      setSaving(false)
    }
  }

  async function handleEdit(e) {
    e.preventDefault()
    setFormError('')

    if (!formData.title.trim()) {
      setFormError('Title is required')
      return
    }

    setSaving(true)
    try {
      const { error } = await supabase
        .from('tabs')
        .update({
          title: formData.title.trim(),
          description: formData.description.trim(),
          is_parent: selectedTab.parent_id ? false : formData.is_parent
        })
        .eq('id', selectedTab.id)

      if (error) throw error

      await fetchTabs()
      closeModals()
    } catch (error) {
      setFormError(error.message || 'Failed to update tab')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('tabs')
        .delete()
        .eq('id', selectedTab.id)

      if (error) throw error

      await fetchTabs()
      closeModals()
    } catch (error) {
      console.error('Error deleting tab:', error)
    } finally {
      setSaving(false)
    }
  }

  const mainTabs = getMainTabs()
  const parentTabs = getParentTabs()

  return (
    <AdminLayout>
      <div className="admin-page tabs-page">
        <div className="admin-page-header">
          <div>
            <h1>Tabs</h1>
            <p>Manage your service category tabs</p>
          </div>
          <button className="add-btn" onClick={() => openCreateModal('main')}>
            <IoAddOutline />
            Add Main Tab
          </button>
        </div>

        <div className="admin-card">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
            </div>
          ) : mainTabs.length > 0 ? (
            <div className="tabs-list">
              {mainTabs.map((tab, index) => {
                const subTabs = getSubTabs(tab.id)
                const isExpanded = expandedTabs[tab.id]

                return (
                  <div key={tab.id} className="tab-group">
                    <div className={`tab-item ${tab.is_parent ? 'is-parent' : ''}`}>
                      {tab.is_parent && subTabs.length > 0 && (
                        <button
                          className="expand-btn"
                          onClick={() => toggleExpand(tab.id)}
                        >
                          {isExpanded ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
                        </button>
                      )}
                      {(!tab.is_parent || subTabs.length === 0) && (
                        <div className="expand-placeholder"></div>
                      )}
                      <div className="tab-order">{index + 1}</div>
                      <div className="tab-content">
                        <div className="tab-title-row">
                          <h3>{tab.title}</h3>
                          {tab.is_parent && (
                            <span className="parent-badge">Parent Tab</span>
                          )}
                        </div>
                        {tab.description && <p>{tab.description}</p>}
                      </div>
                      <div className="tab-actions">
                        {tab.is_parent && (
                          <button
                            className="action-btn add-sub"
                            onClick={() => openCreateModal('sub', tab.id)}
                            title="Add Sub-tab"
                          >
                            <IoAddOutline />
                          </button>
                        )}
                        <button
                          className="action-btn edit"
                          onClick={() => openEditModal(tab)}
                          title="Edit"
                        >
                          <IoPencilOutline />
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => openDeleteModal(tab)}
                          title="Delete"
                        >
                          <IoTrashOutline />
                        </button>
                      </div>
                    </div>

                    {/* Sub-tabs */}
                    {tab.is_parent && isExpanded && subTabs.length > 0 && (
                      <div className="sub-tabs">
                        {subTabs.map((subTab, subIndex) => (
                          <div key={subTab.id} className="tab-item sub-tab">
                            <div className="sub-indicator"></div>
                            <div className="tab-order sub">{subIndex + 1}</div>
                            <div className="tab-content">
                              <h3>{subTab.title}</h3>
                              {subTab.description && <p>{subTab.description}</p>}
                            </div>
                            <div className="tab-actions">
                              <button
                                className="action-btn edit"
                                onClick={() => openEditModal(subTab)}
                                title="Edit"
                              >
                                <IoPencilOutline />
                              </button>
                              <button
                                className="action-btn delete"
                                onClick={() => openDeleteModal(subTab)}
                                title="Delete"
                              >
                                <IoTrashOutline />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="empty-state">
              <IoLayersOutline />
              <h3>No tabs yet</h3>
              <p>Create your first tab to get started</p>
            </div>
          )}
        </div>

        <div className="tabs-info">
          <h4>Tab Structure</h4>
          <p>
            <strong>Main Tabs:</strong> SMM, ADS, Content, Others+<br />
            <strong>Parent Tabs:</strong> Can contain sub-tabs (like Others+ contains Web & Graphics)<br />
            <strong>Sub-tabs:</strong> Nested under parent tabs, cards can be assigned to them
          </p>
        </div>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={closeModals}
        title={createType === 'sub' ? 'Create Sub-tab' : 'Create Main Tab'}
      >
        <form onSubmit={handleCreate}>
          {formError && <div className="form-error">{formError}</div>}

          {createType === 'sub' && parentTabId && (
            <div className="form-info">
              Adding sub-tab under: <strong>{tabs.find(t => t.id === parentTabId)?.title}</strong>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={createType === 'sub' ? 'e.g., Web, Graphics' : 'e.g., SMM, ADS, Content'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional description for this tab"
              rows={3}
            />
          </div>

          {createType === 'main' && (
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.is_parent}
                  onChange={(e) => setFormData({ ...formData, is_parent: e.target.checked })}
                />
                <span>This is a parent tab (can contain sub-tabs like "Others+")</span>
              </label>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={closeModals}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Creating...' : 'Create Tab'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={closeModals}
        title="Edit Tab"
      >
        <form onSubmit={handleEdit}>
          {formError && <div className="form-error">{formError}</div>}

          <div className="form-group">
            <label htmlFor="edit-title">Title *</label>
            <input
              type="text"
              id="edit-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional description for this tab"
              rows={3}
            />
          </div>

          {selectedTab && !selectedTab.parent_id && (
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.is_parent}
                  onChange={(e) => setFormData({ ...formData, is_parent: e.target.checked })}
                />
                <span>This is a parent tab (can contain sub-tabs)</span>
              </label>
            </div>
          )}

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
        title="Delete Tab"
        size="small"
      >
        <div className="confirm-dialog">
          <div className="warning-icon">
            <IoWarningOutline />
          </div>
          <p>
            Are you sure you want to delete <strong>{selectedTab?.title}</strong>?
            {selectedTab?.is_parent && ' This will also delete all sub-tabs.'}
            {' '}All cards associated with this tab will also be deleted.
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
