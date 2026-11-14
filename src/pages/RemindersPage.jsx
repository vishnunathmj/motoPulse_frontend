import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiCheckCircle, FiX } from 'react-icons/fi'
import ReminderCard from '../components/reminders/ReminderCard'
import {
  addReminderAPI,
  deleteReminderAPI,
  getRemindersAPI,
  getVehiclesAPI,
  updateReminderAPI
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

const emptyForm = () => ({
  vehicleId: '',
  title: '',
  description: '',
  reminderType: 'Service',
  dueDate: today(),
  dueOdometer: '',
  priority: 'Medium'
})

const dayStart = (value) => {
  const date = new Date(value)
  date.setHours(0, 0, 0, 0)
  return date
}

function RemindersPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [reminders, setReminders] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingReminder, setEditingReminder] = useState(null)
  const [formValues, setFormValues] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [vehiclesLoading, setVehiclesLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [actionId, setActionId] = useState('')
  const [error, setError] = useState('')
  const [vehiclesError, setVehiclesError] = useState('')
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState('')

  const loadReminders = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await getRemindersAPI()
      setReminders(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load reminders. Please try again.')
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
    loadReminders()
    loadVehicles()
  }, [loadReminders, loadVehicles])

  const counts = useMemo(() => {
    const start = dayStart(new Date())
    const dueSoonLimit = new Date(start)
    dueSoonLimit.setDate(dueSoonLimit.getDate() + 7)
    const overdueCount = reminders.filter((reminder) => {
      const dueDate = reminder.dueDate ? dayStart(reminder.dueDate) : null
      return reminder.status === 'Pending' && dueDate && dueDate < start
    }).length

    const dueSoonCount = reminders.filter((reminder) => {
      const dueDate = reminder.dueDate ? dayStart(reminder.dueDate) : null
      return reminder.status === 'Pending'
        && dueDate
        && dueDate >= start
        && dueDate <= dueSoonLimit
    }).length

    const upcomingCount = reminders.filter((reminder) => {
      const dueDate = reminder.dueDate ? dayStart(reminder.dueDate) : null
      return reminder.status === 'Pending' && (!dueDate || dueDate > dueSoonLimit)
    }).length

    return {
      all: reminders.length,
      overdue: overdueCount,
      'due-soon': dueSoonCount,
      upcoming: upcomingCount
    }
  }, [reminders])

  const filteredReminders = useMemo(() => {
    const start = dayStart(new Date())
    const dueSoonLimit = new Date(start)
    dueSoonLimit.setDate(dueSoonLimit.getDate() + 7)
    if (activeTab === 'all') return reminders
    if (activeTab === 'overdue') {
      return reminders.filter((reminder) => {
        const dueDate = reminder.dueDate ? dayStart(reminder.dueDate) : null
        return reminder.status === 'Pending' && dueDate && dueDate < start
      })
    }

    if (activeTab === 'due-soon') {
      return reminders.filter((reminder) => {
        const dueDate = reminder.dueDate ? dayStart(reminder.dueDate) : null
        return reminder.status === 'Pending'
          && dueDate
          && dueDate >= start
          && dueDate <= dueSoonLimit
      })
    }

    return reminders.filter((reminder) => {
      const dueDate = reminder.dueDate ? dayStart(reminder.dueDate) : null
      return reminder.status === 'Pending' && (!dueDate || dueDate > dueSoonLimit)
    })
  }, [reminders, activeTab])

  const tabs = [
    { id: 'all', label: 'All Reminders' },
    { id: 'overdue', label: 'Overdue' },
    { id: 'due-soon', label: 'Due Soon' },
    { id: 'upcoming', label: 'Upcoming' }
  ]

  const handleOpenModal = () => {
    setEditingReminder(null)
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
      title: formValues.title.trim(),
      description: formValues.description.trim(),
      reminderType: formValues.reminderType,
      dueDate: formValues.dueDate || null,
      dueOdometer: formValues.dueOdometer,
      priority: formValues.priority
    }
    try {
      const response = editingReminder
        ? await updateReminderAPI(editingReminder._id, payload)
        : await addReminderAPI(payload)
      const successMessage = editingReminder
        ? 'Reminder updated successfully.'
        : 'Reminder added successfully.'
      setSuccess(response.data.message || successMessage)
      setIsModalOpen(false)
      await loadReminders()
    } catch (err) {
      setFormError(err.response?.data?.message || 'Could not save reminder. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (reminder) => {
    setEditingReminder(reminder)
    setFormValues({
      vehicleId: reminder.vehicleId?._id || reminder.vehicleId || '',
      title: reminder.title || '',
      description: reminder.description || '',
      reminderType: reminder.reminderType || 'Other',
      dueDate: dateInputValue(reminder.dueDate),
      dueOdometer: reminder.dueOdometer == null ? '' : String(reminder.dueOdometer),
      priority: reminder.priority || 'Medium'
    })
    setFormError('')
    setIsModalOpen(true)
  }

  const handleDelete = async (reminder) => {
    if (!window.confirm(`Delete the reminder “${reminder.title}”? This cannot be undone.`)) {
      return
    }
    setActionId(reminder._id)
    setError('')
    setSuccess('')
    try {
      const response = await deleteReminderAPI(reminder._id)
      setSuccess(response.data.message || 'Reminder deleted successfully.')
      await loadReminders()
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete reminder. Please try again.')
    } finally {
      setActionId('')
    }
  }

  const handleStatusUpdate = async (reminder) => {
    const status = reminder.status === 'Completed' ? 'Pending' : 'Completed'
    setActionId(reminder._id)
    setError('')
    setSuccess('')
    try {
      const response = await updateReminderAPI(reminder._id, { status })
      setSuccess(response.data.message || `Reminder marked ${status.toLowerCase()}.`)
      await loadReminders()
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update reminder status. Please try again.')
    } finally {
      setActionId('')
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Vehicle Reminders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Service intervals, oil changes, insurance renewals, and PUC expirations for your vehicles
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenModal}
          className="inline-flex items-center gap-2 text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm cursor-pointer"
        >
          <FiPlus className="w-4 h-4" /> New Reminder
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
            onClick={loadReminders}
            className="underline font-semibold ml-1"
          >
            Retry
          </button>
        </p>
      )}

      <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${activeTab === tab.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
          >
            <span>{tab.label}</span>
            <span className={`text-[11px] px-1.5 rounded-full font-semibold ${activeTab === tab.id ? 'bg-[#0F9D91]/15 text-[#0A7067]' : 'bg-slate-200 text-slate-600'}`}>
              {counts[tab.id]}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-slate-500 py-8 text-center">Loading reminders...</p>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs py-10 text-center text-sm text-slate-500">
          Reminders could not be loaded. Use Retry above.
        </div>
      ) : filteredReminders.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReminders.map((reminder) => (
            <ReminderCard
              key={reminder._id}
              reminder={reminder}
              actionLoading={actionId === reminder._id}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs py-12 sm:py-16 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
            <FiCheckCircle className="w-7 h-7" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            {reminders.length ? 'No reminders in this view' : 'No reminders yet'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1 mb-6 leading-relaxed">
            {reminders.length
              ? 'There are no reminders under this tab.'
              : 'Create a reminder to keep track of upcoming service and document dates.'}
          </p>
          <button
            type="button"
            onClick={handleOpenModal}
            className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E] cursor-pointer"
          >
            Create New Reminder
          </button>
        </div>
      )}

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
                  {editingReminder ? 'Edit Reminder' : 'Create Service Reminder'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Set a due date or odometer milestone for your vehicle
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
                  Target Vehicle
                </label>
                <select
                  name="vehicleId"
                  value={formValues.vehicleId}
                  onChange={handleChange}
                  required
                  disabled={vehiclesLoading || vehicles.length === 0 || Boolean(editingReminder)}
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
                {editingReminder && (
                  <p className="text-xs text-slate-500 mt-1">
                    Vehicle cannot be changed by the current reminder API.
                  </p>
                )}
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
                  Reminder Title
                </label>
                <input
                  name="title"
                  type="text"
                  value={formValues.title}
                  onChange={handleChange}
                  required
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Reminder Type
                  </label>
                  <select
                    name="reminderType"
                    value={formValues.reminderType}
                    onChange={handleChange}
                    required
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  >
                    <option>Service</option>
                    <option>Insurance</option>
                    <option>PUC</option>
                    <option>Oil Change</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formValues.priority}
                    onChange={handleChange}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Due Date
                  </label>
                  <input
                    name="dueDate"
                    type="date"
                    value={formValues.dueDate}
                    onChange={handleChange}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Due Odometer (km)
                  </label>
                  <input
                    name="dueOdometer"
                    type="number"
                    min="0"
                    value={formValues.dueOdometer}
                    onChange={handleChange}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
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
                  {saving
                    ? 'Saving...'
                    : editingReminder
                      ? 'Save Changes'
                      : 'Create Reminder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default RemindersPage
