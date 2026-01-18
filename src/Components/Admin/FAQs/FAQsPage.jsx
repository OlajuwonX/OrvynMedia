import { useState, useEffect } from 'react'
import { faqsApi } from '../../../lib/supabase'
import AdminLayout from '../Layout/AdminLayout'
import Modal from '../Modal/Modal'
import {
  IoAddOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoHelpCircleOutline,
  IoWarningOutline,
  IoCloseOutline,
  IoAddCircleOutline,
  IoReorderThreeOutline,
  IoSparklesOutline
} from 'react-icons/io5'
import './FAQsPage.css'

export default function FAQsPage() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedFaq, setSelectedFaq] = useState(null)

  // Form states
  const [formData, setFormData] = useState({
    question: '',
    answerParts: [{ text: '', highlight: false }]
  })
  const [formError, setFormError] = useState('')

  useEffect(() => {
    fetchFaqs()
  }, [])

  async function fetchFaqs() {
    try {
      const data = await faqsApi.getAll()
      setFaqs(data || [])
    } catch (error) {
      console.error('Error fetching FAQs:', error)
    } finally {
      setLoading(false)
    }
  }

  function openCreateModal() {
    setFormData({
      question: '',
      answerParts: [{ text: '', highlight: false }]
    })
    setFormError('')
    setCreateModalOpen(true)
  }

  function openEditModal(faq) {
    setSelectedFaq(faq)
    // Parse the answer - it's stored as JSONB array
    const answerParts = Array.isArray(faq.answer)
      ? faq.answer.map(part => ({
          text: part.text || '',
          highlight: part.highlight || false
        }))
      : [{ text: '', highlight: false }]

    setFormData({
      question: faq.question,
      answerParts: answerParts.length > 0 ? answerParts : [{ text: '', highlight: false }]
    })
    setFormError('')
    setEditModalOpen(true)
  }

  function openDeleteModal(faq) {
    setSelectedFaq(faq)
    setDeleteModalOpen(true)
  }

  function closeModals() {
    setCreateModalOpen(false)
    setEditModalOpen(false)
    setDeleteModalOpen(false)
    setSelectedFaq(null)
    setFormData({
      question: '',
      answerParts: [{ text: '', highlight: false }]
    })
    setFormError('')
  }

  function addAnswerPart() {
    setFormData({
      ...formData,
      answerParts: [...formData.answerParts, { text: '', highlight: false }]
    })
  }

  function removeAnswerPart(index) {
    if (formData.answerParts.length === 1) return
    const newParts = formData.answerParts.filter((_, i) => i !== index)
    setFormData({ ...formData, answerParts: newParts })
  }

  function updateAnswerPart(index, field, value) {
    const newParts = [...formData.answerParts]
    newParts[index] = { ...newParts[index], [field]: value }
    setFormData({ ...formData, answerParts: newParts })
  }

  function validateForm() {
    if (!formData.question.trim()) {
      setFormError('Question is required')
      return false
    }
    const validParts = formData.answerParts.filter(p => p.text.trim())
    if (validParts.length === 0) {
      setFormError('At least one answer part is required')
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
      const newFaq = {
        question: formData.question.trim(),
        answer: formData.answerParts
          .filter(p => p.text.trim())
          .map(p => ({ text: p.text.trim(), highlight: p.highlight })),
        order_position: faqs.length
      }
      await faqsApi.create(newFaq)
      await fetchFaqs()
      closeModals()
    } catch (error) {
      setFormError(error.message || 'Failed to create FAQ')
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
      await faqsApi.update(selectedFaq.id, {
        question: formData.question.trim(),
        answer: formData.answerParts
          .filter(p => p.text.trim())
          .map(p => ({ text: p.text.trim(), highlight: p.highlight }))
      })
      await fetchFaqs()
      closeModals()
    } catch (error) {
      setFormError(error.message || 'Failed to update FAQ')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    setSaving(true)
    try {
      await faqsApi.delete(selectedFaq.id)
      await fetchFaqs()
      closeModals()
    } catch (error) {
      console.error('Error deleting FAQ:', error)
    } finally {
      setSaving(false)
    }
  }

  function renderAnswer(answer) {
    if (!Array.isArray(answer)) return ''
    return answer.map((part, idx) => (
      <span key={idx} className={part.highlight ? 'highlight' : ''}>
        {part.text}
      </span>
    ))
  }

  return (
    <AdminLayout>
      <div className="admin-page faqs-page">
        <div className="admin-page-header">
          <div>
            <h1>FAQs</h1>
            <p>Manage frequently asked questions</p>
          </div>
          <button className="add-btn" onClick={openCreateModal}>
            <IoAddOutline />
            Add FAQ
          </button>
        </div>

        <div className="admin-card">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
            </div>
          ) : faqs.length > 0 ? (
            <div className="faqs-list">
              {faqs.map((faq, index) => (
                <div key={faq.id} className="faq-item">
                  <div className="faq-drag">
                    <IoReorderThreeOutline />
                  </div>
                  <div className="faq-order">{index + 1}</div>
                  <div className="faq-content">
                    <h3>{faq.question}</h3>
                    <p>{renderAnswer(faq.answer)}</p>
                  </div>
                  <div className="faq-actions">
                    <button
                      className="action-btn edit"
                      onClick={() => openEditModal(faq)}
                      title="Edit"
                    >
                      <IoPencilOutline />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => openDeleteModal(faq)}
                      title="Delete"
                    >
                      <IoTrashOutline />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <IoHelpCircleOutline />
              <h3>No FAQs yet</h3>
              <p>Create your first FAQ entry</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={closeModals}
        title="Create New FAQ"
        size="large"
      >
        <form onSubmit={handleCreate}>
          {formError && <div className="form-error">{formError}</div>}

          <div className="form-group">
            <label htmlFor="question">Question *</label>
            <input
              type="text"
              id="question"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="e.g., How long does it take to get started?"
            />
          </div>

          <div className="form-group">
            <label>
              Answer Parts *
              <span className="label-hint">Add text segments with optional highlighting</span>
            </label>
            <div className="answer-parts-list">
              {formData.answerParts.map((part, index) => (
                <div key={index} className="answer-part-item">
                  <textarea
                    value={part.text}
                    onChange={(e) => updateAnswerPart(index, 'text', e.target.value)}
                    placeholder="Enter text segment"
                    rows={2}
                  />
                  <div className="answer-part-controls">
                    <label className="highlight-toggle">
                      <input
                        type="checkbox"
                        checked={part.highlight}
                        onChange={(e) => updateAnswerPart(index, 'highlight', e.target.checked)}
                      />
                      <IoSparklesOutline />
                      <span>Highlight</span>
                    </label>
                    {formData.answerParts.length > 1 && (
                      <button
                        type="button"
                        className="remove-part"
                        onClick={() => removeAnswerPart(index)}
                      >
                        <IoCloseOutline />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="add-part"
                onClick={addAnswerPart}
              >
                <IoAddCircleOutline />
                Add Answer Part
              </button>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={closeModals}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Creating...' : 'Create FAQ'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={closeModals}
        title="Edit FAQ"
        size="large"
      >
        <form onSubmit={handleEdit}>
          {formError && <div className="form-error">{formError}</div>}

          <div className="form-group">
            <label htmlFor="edit-question">Question *</label>
            <input
              type="text"
              id="edit-question"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="e.g., How long does it take to get started?"
            />
          </div>

          <div className="form-group">
            <label>
              Answer Parts *
              <span className="label-hint">Add text segments with optional highlighting</span>
            </label>
            <div className="answer-parts-list">
              {formData.answerParts.map((part, index) => (
                <div key={index} className="answer-part-item">
                  <textarea
                    value={part.text}
                    onChange={(e) => updateAnswerPart(index, 'text', e.target.value)}
                    placeholder="Enter text segment"
                    rows={2}
                  />
                  <div className="answer-part-controls">
                    <label className="highlight-toggle">
                      <input
                        type="checkbox"
                        checked={part.highlight}
                        onChange={(e) => updateAnswerPart(index, 'highlight', e.target.checked)}
                      />
                      <IoSparklesOutline />
                      <span>Highlight</span>
                    </label>
                    {formData.answerParts.length > 1 && (
                      <button
                        type="button"
                        className="remove-part"
                        onClick={() => removeAnswerPart(index)}
                      >
                        <IoCloseOutline />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="add-part"
                onClick={addAnswerPart}
              >
                <IoAddCircleOutline />
                Add Answer Part
              </button>
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
        title="Delete FAQ"
        size="small"
      >
        <div className="confirm-dialog">
          <div className="warning-icon">
            <IoWarningOutline />
          </div>
          <p>
            Are you sure you want to delete this FAQ?
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
