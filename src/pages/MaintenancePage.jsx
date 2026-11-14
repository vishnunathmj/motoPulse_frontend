import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiPlus,
  FiTool,
  FiDollarSign,
  FiClock,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiX
} from 'react-icons/fi'
import {
  addMaintenanceAPI,
  deleteMaintenanceAPI,
  getMaintenanceAPI,
  getMaintenanceByIdAPI,
  getVehiclesAPI,
  updateMaintenanceAPI
} from '../services/allApi'

const today = () => {
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${date.getFullYear()}-${month}-${day}`
}

const dateInputValue = (value) => {
  return value ? String(value).slice(0, 10) : ''
}

const formatDate = (value) => {
  if (!value) return '—'

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value))
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(value) || 0)
}

const emptyForm = () => ({
  vehicleId: '',
  serviceType: '',
  serviceDate: today(),
  odometer: '',
  serviceCenter: '',
  description: '',
  partsReplaced: '',
  labourCost: '0',
  partsCost: '0',
  nextServiceDate: '',
  nextServiceOdometer: '',
  notes: ''
})

function MaintenancePage() {
  const [maintenanceRecords, setMaintenanceRecords] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [viewingRecord, setViewingRecord] = useState(null)
  const [formValues, setFormValues] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [vehiclesLoading, setVehiclesLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')
  const [vehiclesError, setVehiclesError] = useState('')
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState('')

  const loadMaintenanceRecords = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await getMaintenanceAPI()
      setMaintenanceRecords(response.data.maintenanceRecords || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load maintenance records. Please try again.')
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
      setVehiclesError(err.response?.data?.message || 'Could not load vehicles.')
    } finally {
      setVehiclesLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMaintenanceRecords()
    loadVehicles()
  }, [loadMaintenanceRecords, loadVehicles])

  const categories = useMemo(() => {
    const serviceTypes = maintenanceRecords
      .map((record) => record.serviceType)
      .filter(Boolean)

    return ['All', ...new Set(serviceTypes)]
  }, [maintenanceRecords])

  const filteredRecords = useMemo(() => {
    if (selectedCategory === 'All') return maintenanceRecords

    return maintenanceRecords.filter(
      (record) => record.serviceType === selectedCategory
    )
  }, [maintenanceRecords, selectedCategory])

  const totalMaintenanceCost = useMemo(() => {
    return maintenanceRecords.reduce(
      (total, record) => total + (Number(record.totalCost) || 0),
      0
    )
  }, [maintenanceRecords])

  const nextServiceRecord = useMemo(() => {
    return maintenanceRecords
      .filter((record) => record.nextServiceDate && new Date(record.nextServiceDate) >= new Date())
      .sort((a, b) => new Date(a.nextServiceDate) - new Date(b.nextServiceDate))[0]
  }, [maintenanceRecords])

  const handleOpenModal = () => {
    setEditingRecord(null)
    setFormValues({ ...emptyForm(), vehicleId: vehicles[0]?._id || '' })
    setFormError('')
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    if (!saving) {
      setIsModalOpen(false)
    }
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleChange = (e) => {
    setFormValues((current) => ({
      ...current,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setSaving(true)
    const payload = {
      vehicleId: formValues.vehicleId,
      serviceType: formValues.serviceType.trim(),
      serviceDate: formValues.serviceDate,
      odometer: Number(formValues.odometer),
      serviceCenter: formValues.serviceCenter.trim(),
      description: formValues.description.trim(),
      partsReplaced: formValues.partsReplaced
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean),
      labourCost: Number(formValues.labourCost || 0),
      partsCost: Number(formValues.partsCost || 0),
      nextServiceOdometer: formValues.nextServiceOdometer === ''
        ? undefined
        : Number(formValues.nextServiceOdometer),
      notes: formValues.notes.trim()
    }
    if (formValues.nextServiceDate) payload.nextServiceDate = formValues.nextServiceDate
    try {
      const response = editingRecord
        ? await updateMaintenanceAPI(editingRecord._id, payload)
        : await addMaintenanceAPI(payload)
      const successMessage = editingRecord
        ? 'Maintenance record updated successfully.'
        : 'Maintenance record added successfully.'
      setSuccess(response.data.message || successMessage)
      setIsModalOpen(false)
      await loadMaintenanceRecords()
    } catch (err) {
      setFormError(err.response?.data?.message || 'Could not save maintenance record. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (record) => {
    setEditingRecord(record)
    setFormValues({
      vehicleId: record.vehicleId?._id || record.vehicleId || '',
      serviceType: record.serviceType || '',
      serviceDate: dateInputValue(record.serviceDate),
      odometer: String(record.odometer ?? ''),
      serviceCenter: record.serviceCenter || '',
      description: record.description || '',
      partsReplaced: Array.isArray(record.partsReplaced) ? record.partsReplaced.join(', ') : '',
      labourCost: String(record.labourCost ?? 0),
      partsCost: String(record.partsCost ?? 0),
      nextServiceDate: dateInputValue(record.nextServiceDate),
      nextServiceOdometer: record.nextServiceOdometer == null ? '' : String(record.nextServiceOdometer),
      notes: record.notes || ''
    })
    setFormError('')
    setIsModalOpen(true)
  }

  const handleDelete = async (record) => {
    if (!window.confirm(`Delete the ${record.serviceType} maintenance record? This cannot be undone.`)) {
      return
    }
    setActionLoading(true)
    setError('')
    setSuccess('')
    try {
      const response = await deleteMaintenanceAPI(record._id)
      setSuccess(response.data.message || 'Maintenance record deleted successfully.')
      await loadMaintenanceRecords()
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete maintenance record. Please try again.')
    } finally {
      setActionLoading(false)
    }
  }

  const handleView = async (record) => {
    setActionLoading(true)
    setError('')
    try {
      const response = await getMaintenanceByIdAPI(record._id)
      setViewingRecord(response.data.maintenance)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load maintenance record details.')
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Service &amp; Maintenance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Keep track of service records, parts replaced, and warranty maintenance targets
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenModal}
          className="inline-flex items-center gap-2 text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm cursor-pointer"
        >
          <FiPlus className="w-4 h-4" /> Add Service
        </button>
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
            onClick={loadMaintenanceRecords}
            className="underline font-semibold ml-1"
          >
            Retry
          </button>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                Total Maintenance Expenses
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                {loading ? '…' : error ? '—' : formatCurrency(totalMaintenanceCost)}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-slate-100 text-slate-800">
              <FiDollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">Sum of recorded service costs</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Services Recorded</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                {loading
                  ? '…'
                  : error
                    ? '—'
                    : `${maintenanceRecords.length} ${maintenanceRecords.length === 1 ? 'Service' : 'Services'}`}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[#E6F5F4] text-[#0F9D91]">
              <FiTool className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">Maintenance records in your account</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Next Service Target</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                {loading ? '…' : error ? '—' : formatDate(nextServiceRecord?.nextServiceDate)}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-amber-50 text-amber-600">
              <FiClock className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            {nextServiceRecord?.nextServiceOdometer != null
              ? `Due at ${Number(nextServiceRecord.nextServiceOdometer).toLocaleString()} km`
              : 'Next due odometer not set'}
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-600">Vehicle:</label>
            <span className="text-xs sm:text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              All Vehicles
            </span>
          </div>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="text-xs sm:text-sm rounded-xl border border-slate-200 px-3 py-1.5 bg-white text-slate-800 focus:outline-none focus:border-[#0F9D91]"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'All' ? 'All Service Types' : category}
              </option>
            ))}
          </select>
        </div>
        <div className="text-xs text-slate-500">
          Showing{' '}
          <span className="font-semibold text-slate-800">
            {loading ? '…' : filteredRecords.length}
          </span>{' '}
          service records
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
            <tr>
              {['Service Date', 'Vehicle & Reg #', 'Service Type', 'Odometer', 'Workshop / Center', 'Cost', 'Next Due (Target)', 'Actions'].map((heading) => (
                <th key={heading} className="py-3.5 px-5">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="8" className="px-6 py-10 text-center text-sm text-slate-500">
                  Loading maintenance records...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="8" className="px-6 py-10 text-center text-sm text-slate-500">
                  Maintenance records could not be loaded. Use Retry above.
                </td>
              </tr>
            ) : filteredRecords.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center">
                    <FiTool className="w-8 h-8 text-slate-300 mb-3" />
                    <p className="text-sm font-semibold text-slate-700">
                      {maintenanceRecords.length
                        ? 'No maintenance records match this filter'
                        : 'No maintenance records yet'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {maintenanceRecords.length
                        ? 'Choose another service type.'
                        : 'Add a service record to start tracking maintenance.'}
                    </p>
                    {!maintenanceRecords.length && (
                      <button
                        type="button"
                        onClick={handleOpenModal}
                        className="mt-4 inline-flex items-center gap-2 text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E]"
                      >
                        <FiPlus /> Add Service
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredRecords.map((record) => (
                <tr key={record._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-medium text-slate-800 whitespace-nowrap">
                    {formatDate(record.serviceDate)}
                  </td>
                  <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {record.vehicleId?.vehicleName || 'Vehicle'}
                      </p>
                      <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                        {record.vehicleId?.registrationNumber || '—'}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 font-medium rounded-full border text-xs px-2.5 py-1 bg-[#E6F5F4] text-[#0A7067] border-[#BBE3E0]">
                      {record.serviceType}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-mono text-slate-700 whitespace-nowrap">
                    {Number(record.odometer || 0).toLocaleString()} km
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-800 whitespace-nowrap">
                    {record.serviceCenter || '—'}
                  </td>
                  <td className="px-5 py-3.5 text-xs font-bold text-slate-900 whitespace-nowrap">
                    {formatCurrency(record.totalCost)}
                  </td>
                  <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                    <p className="font-semibold text-slate-800">
                      {formatDate(record.nextServiceDate)}
                    </p>
                    <p className="text-slate-400 font-mono">
                      {record.nextServiceOdometer != null
                        ? `at ${Number(record.nextServiceOdometer).toLocaleString()} km`
                        : '—'}
                    </p>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5 text-slate-400">
                      <button
                        type="button"
                        disabled={actionLoading}
                        onClick={() => handleView(record)}
                        className="p-1 hover:text-[#0F9D91] transition-colors cursor-pointer disabled:opacity-50"
                        title="View Details"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEdit(record)}
                        className="p-1 hover:text-slate-800 transition-colors cursor-pointer"
                        title="Edit Record"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={actionLoading}
                        onClick={() => handleDelete(record)}
                        className="p-1 hover:text-rose-600 transition-colors cursor-pointer disabled:opacity-50"
                        title="Delete Record"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={handleCloseModal}
          />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {editingRecord ? 'Edit Service Record' : 'Log Service & Maintenance'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Record service details, costs, and next service target
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Vehicle
                  </label>
                  <select
                    name="vehicleId"
                    value={formValues.vehicleId}
                    onChange={handleChange}
                    required
                    disabled={vehiclesLoading || vehicles.length === 0}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
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
                  {!vehiclesLoading && !vehiclesError && vehicles.length === 0 && (
                    <p className="text-xs text-slate-500 mt-1">
                      Add a vehicle first.{' '}
                      <Link
                        to="/vehicles"
                        onClick={() => setIsModalOpen(false)}
                        className="text-[#0F9D91] underline"
                      >
                        Go to vehicles
                      </Link>
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Service Type
                  </label>
                  <input
                    name="serviceType"
                    value={formValues.serviceType}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Periodic Maintenance"
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Service Date
                  </label>
                  <input
                    name="serviceDate"
                    type="date"
                    value={formValues.serviceDate}
                    onChange={handleChange}
                    required
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Odometer (km)
                  </label>
                  <input
                    name="odometer"
                    type="number"
                    min="0"
                    value={formValues.odometer}
                    onChange={handleChange}
                    required
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Workshop / Service Center
                </label>
                <input
                  name="serviceCenter"
                  value={formValues.serviceCenter}
                  onChange={handleChange}
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  rows="2"
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Parts Replaced <span className="font-normal text-slate-400">(comma separated)</span>
                </label>
                <input
                  name="partsReplaced"
                  value={formValues.partsReplaced}
                  onChange={handleChange}
                  placeholder="e.g. Oil filter, Brake pads"
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Labour Cost (₹)
                  </label>
                  <input
                    name="labourCost"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formValues.labourCost}
                    onChange={handleChange}
                    required
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Parts Cost (₹)
                  </label>
                  <input
                    name="partsCost"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formValues.partsCost}
                    onChange={handleChange}
                    required
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Next Service Date
                  </label>
                  <input
                    name="nextServiceDate"
                    type="date"
                    value={formValues.nextServiceDate}
                    onChange={handleChange}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Next Service Odometer (km)
                  </label>
                  <input
                    name="nextServiceOdometer"
                    type="number"
                    min="0"
                    value={formValues.nextServiceOdometer}
                    onChange={handleChange}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
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
                  onChange={handleChange}
                  rows="2"
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                />
              </div>

              {formError && (
                <p role="alert" className="text-sm text-rose-600">{formError}</p>
              )}
              <p className="text-xs text-slate-500">
                Total cost is calculated by the server from labour and parts costs.
              </p>

              <div className="px-6 py-3.5 -mx-6 -mb-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={saving}
                  onClick={handleCloseModal}
                  className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || vehiclesLoading || vehicles.length === 0}
                  className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E] disabled:opacity-50 cursor-pointer"
                >
                  {saving
                    ? 'Saving...'
                    : editingRecord
                      ? 'Save Changes'
                      : 'Save Service Log'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close details"
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setViewingRecord(null)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Maintenance Record Details
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {viewingRecord.vehicleId?.vehicleName || 'Vehicle'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewingRecord(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-3 text-sm">
              {[
                ['Vehicle', `${viewingRecord.vehicleId?.vehicleName || 'Vehicle'} (${viewingRecord.vehicleId?.registrationNumber || '—'})`],
                ['Service Type', viewingRecord.serviceType],
                ['Service Date', formatDate(viewingRecord.serviceDate)],
                ['Odometer', `${Number(viewingRecord.odometer || 0).toLocaleString()} km`],
                ['Service Center', viewingRecord.serviceCenter || '—'],
                ['Description', viewingRecord.description || '—'],
                ['Parts Replaced', viewingRecord.partsReplaced?.length ? viewingRecord.partsReplaced.join(', ') : '—'],
                ['Labour Cost', formatCurrency(viewingRecord.labourCost)],
                ['Parts Cost', formatCurrency(viewingRecord.partsCost)],
                ['Total Cost', formatCurrency(viewingRecord.totalCost)],
                ['Next Service Date', formatDate(viewingRecord.nextServiceDate)],
                ['Next Service Odometer', viewingRecord.nextServiceOdometer != null ? `${Number(viewingRecord.nextServiceOdometer).toLocaleString()} km` : '—'],
                ['Notes', viewingRecord.notes || '—']
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-slate-100 pb-2">
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

export default MaintenancePage
