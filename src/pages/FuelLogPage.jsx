import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiPlus,
  FiDroplet,
  FiDollarSign,
  FiZap,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiX
} from 'react-icons/fi'
import {
  addFuelAPI,
  deleteFuelAPI,
  getFuelByIdAPI,
  getFuelEntriesAPI,
  getVehiclesAPI,
  updateFuelAPI
} from '../services/allApi'

const today = () => {
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${date.getFullYear()}-${month}-${day}`
}

const dateInputValue = (value) => {
  if (!value) return today()
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
  fuelDate: today(),
  odometer: '',
  litres: '',
  pricePerLitre: '',
  fuelType: 'Petrol',
  notes: ''
})

function FuelLogPage() {
  const [fuelEntries, setFuelEntries] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFuel, setEditingFuel] = useState(null)
  const [viewingFuel, setViewingFuel] = useState(null)
  const [formValues, setFormValues] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [vehiclesLoading, setVehiclesLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')
  const [vehiclesError, setVehiclesError] = useState('')
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState('')

  const loadFuelEntries = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await getFuelEntriesAPI()
      setFuelEntries(response.data.fuelEntries || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load fuel entries. Please try again.')
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
    loadFuelEntries()
    loadVehicles()
  }, [loadFuelEntries, loadVehicles])

  const totals = useMemo(() => {
    const totalSpent = fuelEntries.reduce(
      (sum, entry) => sum + (Number(entry.totalAmount) || 0),
      0
    )
    const totalLitres = fuelEntries.reduce(
      (sum, entry) => sum + (Number(entry.litres) || 0),
      0
    )
    const totalPrice = fuelEntries.reduce((sum, entry) => {
      const pricePerLitre = Number(entry.pricePerLitre) || 0
      const litres = Number(entry.litres) || 0
      return sum + (pricePerLitre * litres)
    }, 0)
    return {
      totalSpent,
      totalLitres,
      averagePrice: totalLitres ? totalPrice / totalLitres : 0
    }
  }, [fuelEntries])

  const handleOpenModal = () => {
    setEditingFuel(null)
    setFormValues({ ...emptyForm(), vehicleId: vehicles[0]?._id || '' })
    setFormError('')
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    if (!saving) {
      setIsModalOpen(false)
    }
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
      fuelDate: formValues.fuelDate,
      litres: Number(formValues.litres),
      pricePerLitre: Number(formValues.pricePerLitre),
      odometer: Number(formValues.odometer),
      fuelType: formValues.fuelType,
      notes: formValues.notes.trim()
    }
    try {
      const response = editingFuel
        ? await updateFuelAPI(editingFuel._id, payload)
        : await addFuelAPI(payload)
      const successMessage = editingFuel
        ? 'Fuel entry updated successfully.'
        : 'Fuel entry added successfully.'
      setSuccess(response.data.message || successMessage)
      setIsModalOpen(false)
      await loadFuelEntries()
    } catch (err) {
      setFormError(err.response?.data?.message || 'Could not save fuel entry. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (entry) => {
    setEditingFuel(entry)
    setFormValues({
      vehicleId: entry.vehicleId?._id || entry.vehicleId || '',
      fuelDate: dateInputValue(entry.fuelDate),
      odometer: String(entry.odometer ?? ''),
      litres: String(entry.litres ?? ''),
      pricePerLitre: String(entry.pricePerLitre ?? ''),
      fuelType: entry.fuelType || 'Petrol',
      notes: entry.notes || ''
    })
    setFormError('')
    setIsModalOpen(true)
  }

  const handleDelete = async (entry) => {
    const vehicleName = entry.vehicleId?.vehicleName || 'this vehicle'
    if (!window.confirm(`Delete this fuel entry for ${vehicleName}? This cannot be undone.`)) {
      return
    }
    setActionLoading(true)
    setError('')
    setSuccess('')
    try {
      const response = await deleteFuelAPI(entry._id)
      setSuccess(response.data.message || 'Fuel entry deleted successfully.')
      await loadFuelEntries()
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete fuel entry. Please try again.')
    } finally {
      setActionLoading(false)
    }
  }

  const handleView = async (entry) => {
    setActionLoading(true)
    setError('')
    try {
      const response = await getFuelByIdAPI(entry._id)
      setViewingFuel(response.data.fuel)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load fuel entry details.')
    } finally {
      setActionLoading(false)
    }
  }

  const computedTotal =
    (Number(formValues.litres) || 0) * (Number(formValues.pricePerLitre) || 0)

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Fuel Log &amp; Efficiency
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track fuel receipts, consumption rate, and cost per kilometer for your vehicles
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenModal}
          className="inline-flex items-center gap-2 text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm cursor-pointer"
        >
          <FiPlus className="w-4 h-4" /> Add Fuel Entry
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
            onClick={loadFuelEntries}
            className="underline font-semibold ml-1"
          >
            Retry
          </button>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Total Fuel Expenses</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                {loading ? '…' : error ? '—' : formatCurrency(totals.totalSpent)}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-slate-100 text-slate-800">
              <FiDollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">All-time total from your fuel entries</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Total Fuel Volume</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                {loading ? '…' : error ? '—' : `${totals.totalLitres.toFixed(1)} L`}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[#E6F5F4] text-[#0F9D91]">
              <FiDroplet className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">Total litres across your records</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Fuel Entries</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                {loading ? '…' : error ? '—' : fuelEntries.length}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-700">
              <FiZap className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">Recorded fill-ups</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Average Price per Litre</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                {loading ? '…' : error ? '—' : `${formatCurrency(totals.averagePrice)}/L`}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-amber-50 text-amber-700">
              <FiFilter className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">Weighted average from your records</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-600 whitespace-nowrap">
            Selected Vehicle:
          </label>
          <span className="text-xs sm:text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            All Vehicles
          </span>
        </div>
        <div className="text-xs text-slate-500">
          Displaying{' '}
          <span className="font-semibold text-slate-800">
            {loading ? '…' : fuelEntries.length}
          </span>{' '}
          recorded {fuelEntries.length === 1 ? 'fill-up' : 'fill-ups'}
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
            <tr>
              {['Date', 'Vehicle & Reg #', 'Odometer', 'Fuel Volume', 'Price / L', 'Total Spend', 'Fuel Type', 'Notes', 'Actions'].map((heading) => (
                <th key={heading} className="py-3.5 px-4 sm:px-5">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="9" className="px-5 py-10 text-center text-sm text-slate-500">
                  Loading fuel entries...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="9" className="px-5 py-10 text-center text-sm text-slate-500">
                  Fuel entries could not be loaded. Use Retry above.
                </td>
              </tr>
            ) : fuelEntries.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center">
                    <FiDroplet className="w-8 h-8 text-slate-300 mb-3" />
                    <p className="text-sm font-semibold text-slate-700">No fuel entries yet</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Add a fuel entry to start tracking your expenses.
                    </p>
                    <button
                      type="button"
                      onClick={handleOpenModal}
                      className="mt-4 inline-flex items-center gap-2 text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E]"
                    >
                      <FiPlus /> Add Fuel Entry
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              fuelEntries.map((entry) => (
                <tr key={entry._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-medium text-slate-800 whitespace-nowrap">
                    {formatDate(entry.fuelDate)}
                  </td>
                  <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {entry.vehicleId?.vehicleName || 'Vehicle'}
                      </p>
                      <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                        {entry.vehicleId?.registrationNumber || '—'}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-mono text-slate-700 whitespace-nowrap">
                    {Number(entry.odometer || 0).toLocaleString()} km
                  </td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-slate-800 whitespace-nowrap">
                    {Number(entry.litres || 0).toFixed(2)} L
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-600 whitespace-nowrap">
                    {formatCurrency(entry.pricePerLitre)}
                  </td>
                  <td className="px-5 py-3.5 text-xs font-bold text-slate-900 whitespace-nowrap">
                    {formatCurrency(entry.totalAmount)}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-600 whitespace-nowrap">
                    {entry.fuelType}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 max-w-[200px] truncate">
                    {entry.notes || '—'}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5 text-slate-400">
                      <button
                        type="button"
                        disabled={actionLoading}
                        onClick={() => handleView(entry)}
                        className="p-1 hover:text-[#0F9D91] transition-colors cursor-pointer disabled:opacity-50"
                        title="View Details"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEdit(entry)}
                        className="p-1 hover:text-slate-800 transition-colors cursor-pointer"
                        title="Edit Log"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={actionLoading}
                        onClick={() => handleDelete(entry)}
                        className="p-1 hover:text-rose-600 transition-colors cursor-pointer disabled:opacity-50"
                        title="Delete Log"
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
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {editingFuel ? 'Edit Fuel Entry' : 'Log Fuel Entry'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Record odometer reading, fuel quantity, and receipt cost
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

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select Vehicle
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
                    Add a vehicle before recording fuel.{' '}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Log Date
                  </label>
                  <input
                    name="fuelDate"
                    type="date"
                    value={formValues.fuelDate}
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

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Quantity (L)
                  </label>
                  <input
                    name="litres"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={formValues.litres}
                    onChange={handleChange}
                    required
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Price / L (₹)
                  </label>
                  <input
                    name="pricePerLitre"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={formValues.pricePerLitre}
                    onChange={handleChange}
                    required
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Total Cost (₹)
                  </label>
                  <input
                    readOnly
                    value={computedTotal.toFixed(2)}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Fuel Type
                  </label>
                  <select
                    name="fuelType"
                    value={formValues.fuelType}
                    onChange={handleChange}
                    required
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  >
                    <option>Petrol</option>
                    <option>Diesel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Notes (Optional)
                  </label>
                  <input
                    name="notes"
                    type="text"
                    value={formValues.notes}
                    onChange={handleChange}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
              </div>

              {formError && (
                <p role="alert" className="text-sm text-rose-600">{formError}</p>
              )}

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
                  {saving ? 'Saving...' : editingFuel ? 'Save Changes' : 'Save Fuel Log'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingFuel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close details"
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setViewingFuel(null)}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Fuel Entry Details</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {viewingFuel.vehicleId?.vehicleName || 'Vehicle'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewingFuel(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-3 text-sm">
              {[
                ['Vehicle', `${viewingFuel.vehicleId?.vehicleName || 'Vehicle'} (${viewingFuel.vehicleId?.registrationNumber || '—'})`],
                ['Fuel Type', viewingFuel.fuelType],
                ['Date', formatDate(viewingFuel.fuelDate)],
                ['Quantity', `${viewingFuel.litres} L`],
                ['Price per Litre', formatCurrency(viewingFuel.pricePerLitre)],
                ['Total Amount', formatCurrency(viewingFuel.totalAmount)],
                ['Odometer', `${Number(viewingFuel.odometer || 0).toLocaleString()} km`],
                ['Notes', viewingFuel.notes || '—']
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

export default FuelLogPage
