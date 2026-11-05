import React, { useState } from 'react'
import { FiPlus, FiTool, FiDollarSign, FiClock, FiEye, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'

function MaintenancePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const vehicle = {
    name: 'Hyundai Creta',
    registration: 'KL 01 AB 1234'
  }

  const serviceRecord = {
    date: '12 Sep 2026',
    category: 'Periodic Maintenance',
    odometer: '17,000 km',
    workshop: 'Popular Hyundai, Kazhakkoottam, Thiruvananthapuram',
    invoice: 'POP-TRV-2026-4412',
    cost: '₹5,800.00',
    nextDueDate: '12 Sep 2027',
    nextDueOdo: '27,000 km'
  }

  const matchesCategory = selectedCategory === 'All' || selectedCategory === 'Periodic Maintenance'

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Service &amp; Maintenance</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Keep track of service records, parts replaced, and warranty maintenance targets for {vehicle.name} ({vehicle.registration})
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

      {/* 3 Summary Stat Cards */}
      {/* FUTURE BACKEND: Load maintenance summary from the backend API. */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Total Maintenance Expenses</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">₹14,800</p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-slate-100 text-slate-800">
              <FiDollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">All recorded periodic services</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Services Recorded</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">1 Service</p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[#E6F5F4] text-[#0F9D91]">
              <FiTool className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">Inspection, AC, alignment, oil</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Next Service Target</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">{serviceRecord.nextDueDate}</p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-amber-50 text-amber-600">
              <FiClock className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">Due at {serviceRecord.nextDueOdo} (Creta)</p>
        </div>

      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-600">Vehicle:</label>
            <span className="text-xs sm:text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              {vehicle.name} ({vehicle.registration})
            </span>
          </div>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="text-xs sm:text-sm rounded-xl border border-slate-200 px-3 py-1.5 bg-white text-slate-800 focus:outline-none focus:border-[#0F9D91]"
          >
            <option value="All">All Service Types</option>
            <option value="Periodic Maintenance">Periodic Maintenance</option>
            <option value="Wheel Alignment & Balancing">Wheel Alignment &amp; Balancing</option>
            <option value="AC Servicing & Cabin Filter">AC Servicing &amp; Cabin Filter</option>
            <option value="1st Periodic Inspection">1st Periodic Inspection</option>
          </select>
        </div>
        <div className="text-xs text-slate-500">
          Showing <span className="font-semibold text-slate-800">{matchesCategory ? 1 : 0}</span> service records
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
            <tr>
              <th className="py-3.5 px-5">Service Date</th>
              <th className="py-3.5 px-5">Vehicle &amp; Reg #</th>
              <th className="py-3.5 px-5">Service Type</th>
              <th className="py-3.5 px-5">Odometer</th>
              <th className="py-3.5 px-5">Workshop / Center</th>
              <th className="py-3.5 px-5">Cost</th>
              <th className="py-3.5 px-5">Next Due (Target)</th>
              <th className="py-3.5 px-5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {/* FUTURE BACKEND: Load maintenance records from the backend API. */}
            {/* DUPLICATE CARD: Reuse table row when additional maintenance records are loaded from the backend. */}
            {matchesCategory ? (
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="px-5 py-3.5 text-xs font-medium text-slate-800 whitespace-nowrap">{serviceRecord.date}</td>
                <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                  <div>
                    <p className="font-semibold text-slate-900">{vehicle.name}</p>
                    <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">{vehicle.registration}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 font-medium rounded-full border text-xs px-2.5 py-1 bg-[#E6F5F4] text-[#0A7067] border-[#BBE3E0]">
                    {serviceRecord.category}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-xs font-mono text-slate-700 whitespace-nowrap">{serviceRecord.odometer}</td>
                <td className="px-5 py-3.5 text-xs text-slate-800 whitespace-nowrap">
                  <div>
                    <p className="text-slate-800">{serviceRecord.workshop}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{serviceRecord.invoice}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs font-bold text-slate-900 whitespace-nowrap">{serviceRecord.cost}</td>
                <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                  <p className="font-semibold text-slate-800">{serviceRecord.nextDueDate}</p>
                  <p className="text-slate-400 font-mono">at {serviceRecord.nextDueOdo}</p>
                </td>
                <td className="px-5 py-3.5 text-xs text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5 text-slate-400">
                    <button type="button" className="p-1 hover:text-[#0F9D91] transition-colors cursor-pointer" title="View Details"><FiEye className="w-4 h-4" /></button>
                    <button type="button" className="p-1 hover:text-slate-800 transition-colors cursor-pointer" title="Edit Record"><FiEdit2 className="w-4 h-4" /></button>
                    <button type="button" className="p-1 hover:text-rose-600 transition-colors cursor-pointer" title="Delete Record"><FiTrash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-xs text-slate-500">
                  No maintenance records match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Log Service &amp; Maintenance</h3>
                <p className="text-xs text-slate-500 mt-0.5">Record parts replaced, workshop invoices, and next service target</p>
              </div>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5 max-h-[calc(85vh-130px)] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Vehicle</label>
                    <select className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20">
                      <option>{vehicle.name} ({vehicle.registration})</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Service Category</label>
                    <select className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20">
                      <option>Periodic Maintenance</option>
                      <option>Oil &amp; Filter Replacement</option>
                      <option>Brake Inspection &amp; Pads</option>
                      <option>Wheel Alignment &amp; Balancing</option>
                      <option>General Repair</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Service Date</label>
                    <input type="date" defaultValue="2026-09-12" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Odometer (km)</label>
                    <input type="number" defaultValue="17000" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cost (₹)</label>
                    <input type="number" defaultValue="5800" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Workshop / Service Center</label>
                  <input type="text" defaultValue="Popular Hyundai, Kazhakkoottam, Thiruvananthapuram" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Next Due Date</label>
                    <input type="date" defaultValue="2027-09-12" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Next Due Odometer (km)</label>
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
              <button type="button" onClick={handleSubmit} className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E] cursor-pointer">Save Service Log (Demo)</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default MaintenancePage
