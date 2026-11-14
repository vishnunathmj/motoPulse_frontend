import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FiPlus, FiX } from 'react-icons/fi'
import DocumentCard from '../components/documents/DocumentCard'
import {
  addDocumentAPI,
  deleteDocumentAPI,
  getDocumentByIdAPI,
  getDocumentsAPI,
  getVehiclesAPI
} from '../services/allApi'

const emptyForm = {
  vehicleId: '',
  documentType: 'Insurance',
  documentNumber: '',
  issueDate: '',
  expiryDate: '',
  notes: ''
}

const dateInputValue = (value) => {
  if (!value) return ''
  return new Date(value).toISOString().slice(0, 10)
}

const formatDate = (value) => {
  if (!value) return '—'

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value))
}

const documentLabels = {
  RC: 'Registration (RC)',
  Insurance: 'Insurance Policy',
  PUC: 'PUC Certificate',
  Other: 'Other'
}

const getErrorMessage = (error, fallback) => {
  return error.response?.data?.message || fallback
}

export default function DocumentsPage() {
  const [selectedType, setSelectedType] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [documents, setDocuments] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [formValues, setFormValues] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [vehiclesLoading, setVehiclesLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [vehiclesError, setVehiclesError] = useState('')
  const [success, setSuccess] = useState('')
  const [viewingDocument, setViewingDocument] = useState(null)

  const loadDocuments = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await getDocumentsAPI()
      setDocuments(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      setError(getErrorMessage(err, 'Could not load documents. Please try again.'))
    } finally {
      setLoading(false)
    }
  }, [])

  const loadVehicles = useCallback(async () => {
    setVehiclesLoading(true)
    setVehiclesError('')
    try {
      const response = await getVehiclesAPI()
      setVehicles(response.data.vehicles || [])
    } catch (err) {
      setVehiclesError(getErrorMessage(err, 'Could not load vehicles.'))
    } finally {
      setVehiclesLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDocuments()
    loadVehicles()
  }, [loadDocuments, loadVehicles])

  const filteredDocuments = useMemo(() => {
    return documents.filter(
      (item) => selectedType === 'All' || item.documentType === selectedType
    )
  }, [documents, selectedType])

  function handleCloseModal() {
    if (!saving) {
      setIsModalOpen(false)
    }
  }

  const openAddModal = () => {
    setFormValues({ ...emptyForm, vehicleId: vehicles[0]?._id || '' })
    setFormError('')
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setSuccess('')
    setSaving(true)
    try {
      const response = await addDocumentAPI({
        ...formValues,
        documentNumber: formValues.documentNumber.trim(),
        notes: formValues.notes.trim()
      })
      setSuccess(response.data.message || 'Document added successfully.')
      setIsModalOpen(false)
      setFormValues(emptyForm)
      await loadDocuments()
    } catch (err) {
      setFormError(getErrorMessage(err, 'Could not save document. Please try again.'))
    } finally {
      setSaving(false)
    }
  }

  const handleView = async (item) => {
    setActionLoading(true)
    setError('')
    try {
      const response = await getDocumentByIdAPI(item._id)
      setViewingDocument(response.data)
    } catch (err) {
      setError(getErrorMessage(err, 'Could not load document details.'))
    } finally {
      setActionLoading(false)
    }
  }

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete the ${documentLabels[item.documentType] || item.documentType} document? This cannot be undone.`)) {
      return
    }
    setActionLoading(true)
    setError('')
    setSuccess('')
    try {
      const response = await deleteDocumentAPI(item._id)
      setSuccess(response.data.message || 'Document deleted successfully.')
      await loadDocuments()
    } catch (err) {
      setError(getErrorMessage(err, 'Could not delete document. Please try again.'))
    } finally {
      setActionLoading(false)
    }
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        handleCloseModal()
        setViewingDocument(null)
      }
    }

    if (isModalOpen || viewingDocument) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen, viewingDocument, saving])

  const updateFormValue = (e) => {
    setFormValues((current) => ({
      ...current,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Vehicle Documents &amp; Compliance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your vehicle registration, insurance, and compliance documents
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={openAddModal}
            disabled={!vehicles.length}
            className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-xs px-3 py-1.5 gap-1.5"
          >
            <FiPlus className="w-4 h-4 shrink-0" /> Add Document Record
          </button>
        </div>
      </div>

      {success && (
        <p role="status" className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          {success}
        </p>
      )}
      {error && (
        <p role="alert" className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
          {error}{' '}
          <button
            type="button"
            onClick={loadDocuments}
            className="font-semibold underline ml-2"
          >
            Retry
          </button>
        </p>
      )}

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-600">Vehicle:</label>
            <span className="text-xs sm:text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              All vehicles
            </span>
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs sm:text-sm rounded-xl border border-slate-200 px-3 py-1.5 bg-white text-slate-800 focus:outline-none focus:border-[#0F9D91]"
          >
            <option value="All">All Document Types</option>
            <option value="Insurance">Insurance Policy</option>
            <option value="PUC">PUC Certificate</option>
            <option value="RC">Registration (RC)</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="text-xs text-slate-500">
          Showing{' '}
          <span className="font-semibold text-slate-800">{filteredDocuments.length}</span>{' '}
          compliance documents
        </div>
      </div>

      {vehiclesError && (
        <p role="alert" className="text-xs text-rose-600">
          {vehiclesError}{' '}
          <button
            type="button"
            onClick={loadVehicles}
            className="underline font-semibold"
          >
            Retry
          </button>
        </p>
      )}
      {loading ? (
        <p className="text-sm text-slate-500 py-8 text-center">Loading documents...</p>
      ) : error ? null : filteredDocuments.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocuments.map((item) => (
            <DocumentCard
              key={item._id}
              document={item}
              onView={handleView}
              onDelete={handleDelete}
              actionLoading={actionLoading}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs py-12 sm:py-16 text-center flex flex-col items-center justify-center">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            {documents.length ? 'No documents found' : 'No documents yet'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1 mb-6 leading-relaxed">
            {documents.length
              ? 'No documents match the selected type.'
              : 'Add a document record to track its expiry and details.'}
          </p>
          {documents.length ? (
            <button
              type="button"
              onClick={() => setSelectedType('All')}
              className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E]"
            >
              Clear Filter
            </button>
          ) : (
            <button
              type="button"
              disabled={!vehicles.length}
              onClick={openAddModal}
              className="inline-flex items-center gap-2 text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E] disabled:opacity-50"
            >
              <FiPlus /> Add Document
            </button>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={handleCloseModal}
          />
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden transform transition-all my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Add Vehicle Document Record
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Track your registration and compliance documents
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 max-h-[calc(85vh-130px)] overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Target Vehicle <span className="text-rose-500">*</span>
                </label>
                <select
                  name="vehicleId"
                  value={formValues.vehicleId}
                  onChange={updateFormValue}
                  required
                  disabled={vehiclesLoading || !vehicles.length}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                >
                  <option value="">
                    {vehiclesLoading ? 'Loading vehicles...' : 'Select a vehicle'}
                  </option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle._id} value={vehicle._id}>
                      {vehicle.vehicleName} ({vehicle.registrationNumber})
                    </option>
                  ))}
                </select>
                {vehiclesError && (
                  <p role="alert" className="text-xs text-rose-600 mt-1">
                    {vehiclesError}{' '}
                    <button
                      type="button"
                      onClick={loadVehicles}
                      className="underline font-semibold"
                    >
                      Retry
                    </button>
                  </p>
                )}
                {!vehiclesLoading && !vehicles.length && !vehiclesError && (
                  <p className="text-xs text-slate-500 mt-1">
                    Add a vehicle before adding documents.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Document Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="documentType"
                    value={formValues.documentType}
                    onChange={updateFormValue}
                    required
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  >
                    <option value="Insurance">Insurance Policy</option>
                    <option value="PUC">PUC Certificate</option>
                    <option value="RC">Registration (RC)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Document / Policy Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="documentNumber"
                    value={formValues.documentNumber}
                    onChange={updateFormValue}
                    type="text"
                    placeholder="Enter document number"
                    required
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Issue Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="issueDate"
                    value={formValues.issueDate}
                    onChange={updateFormValue}
                    type="date"
                    required
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Expiry Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="expiryDate"
                    value={formValues.expiryDate}
                    onChange={updateFormValue}
                    type="date"
                    min={formValues.issueDate || undefined}
                    required
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formValues.notes}
                  onChange={updateFormValue}
                  rows="2"
                  placeholder="Optional notes"
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                />
              </div>

              {formError && (
                <p role="alert" className="text-sm text-rose-600">{formError}</p>
              )}

              <div className="-mx-6 -mb-5 px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={saving}
                  onClick={handleCloseModal}
                  className="inline-flex items-center justify-center text-xs px-3 py-1.5 font-medium rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !vehicles.length}
                  className="inline-flex items-center justify-center text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Document Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close document details"
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setViewingDocument(null)}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Document Details</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {viewingDocument.vehicleId?.vehicleName || 'Vehicle'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewingDocument(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-3 text-sm">
              {[
                ['Vehicle', `${viewingDocument.vehicleId?.vehicleName || 'Vehicle'} (${viewingDocument.vehicleId?.registrationNumber || '—'})`],
                ['Document Type', documentLabels[viewingDocument.documentType] || viewingDocument.documentType],
                ['Document Number', viewingDocument.documentNumber || '—'],
                ['Issue Date', formatDate(viewingDocument.issueDate)],
                ['Expiry Date', formatDate(viewingDocument.expiryDate)],
                ['Notes', viewingDocument.notes || '—']
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-slate-100 pb-2"
                >
                  <span className="text-slate-500">{label}</span>
                  <span className="font-medium text-slate-900 text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
