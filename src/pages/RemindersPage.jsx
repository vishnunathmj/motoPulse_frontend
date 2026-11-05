import React, { useState } from 'react'
import { FiPlus, FiCheckCircle, FiX } from 'react-icons/fi'
import ReminderCard from '../components/reminders/ReminderCard'

function RemindersPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const vehicle = {
    name: 'Hyundai Creta',
    registration: 'KL 01 AB 1234'
  }

  const tabs = [
    { id: 'all',      label: 'All Reminders', count: 1 },
    { id: 'overdue',  label: 'Overdue',        count: 0 },
    { id: 'due-soon', label: 'Due Soon',        count: 1 },
    { id: 'upcoming', label: 'Upcoming',        count: 0 }
  ]

  const hasReminders = activeTab === 'all' || activeTab === 'due-soon'

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Vehicle Reminders</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Service intervals, oil changes, insurance renewals, and PUC expirations for {vehicle.name} ({vehicle.registration})
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

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[11px] px-1.5 rounded-full font-semibold ${
              activeTab === tab.id ? 'bg-[#0F9D91]/15 text-[#0A7067]' : 'bg-slate-200 text-slate-600'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Reminders Grid */}
      {hasReminders ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* FUTURE BACKEND: Load reminders from the backend API. */}
          {/* DUPLICATE CARD: Reuse ReminderCard when additional reminders are loaded from the backend. */}
          <ReminderCard />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs py-12 sm:py-16 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
            <FiCheckCircle className="w-7 h-7" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">All caught up!</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1 mb-6 leading-relaxed">
            There are no active reminders under this tab. Your vehicle is completely up to date.
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

      {/* Create Reminder Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Create Service Reminder</h3>
                <p className="text-xs text-slate-500 mt-0.5">Set custom due dates or odometer milestones with automatic advance alerts</p>
              </div>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Target Vehicle</label>
                  <select className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20">
                    <option>{vehicle.name} ({vehicle.registration})</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Reminder Title</label>
                  <input type="text" defaultValue="Engine Oil &amp; Filter Change" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category</label>
                    <select className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20">
                      <option>Scheduled Service</option>
                      <option>Document Renewal</option>
                      <option>Insurance</option>
                      <option>Maintenance</option>
                      <option>Inspection</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Priority</label>
                    <select className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20">
                      <option>Low</option><option selected>Medium</option><option>High</option><option>Urgent</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Due Date</label>
                    <input type="date" defaultValue="2027-09-12" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Due Odometer (km)</label>
                    <input type="number" defaultValue="27000" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
                  <strong>Note:</strong> UI Design Review mode. Form submissions are visual demonstrations.
                </div>
              </form>
            </div>
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button type="button" onClick={handleCloseModal} className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer">Cancel</button>
              <button type="button" onClick={handleSubmit} className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E] cursor-pointer">Create Reminder (Demo)</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default RemindersPage
