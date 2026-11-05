import React, { useState } from 'react'
import { FiPlus, FiDroplet, FiDollarSign, FiZap, FiFilter, FiEdit2, FiTrash2, FiEye, FiX } from 'react-icons/fi'

function FuelLogPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const vehicle = {
    name: 'Hyundai Creta',
    registration: 'KL 01 AB 1234'
  }

  const fuelLog = {
    date: '24 Oct 2026',
    odometer: '18,450 km',
    volume: '42.5 L',
    pricePerLitre: '₹105.80',
    totalCost: '₹4,496.50',
    economy: '15.8 km/L',
    station: 'Indian Oil Swagath, Kowdiar, Thiruvananthapuram'
  }

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
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Fuel Log &amp; Efficiency</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track fuel receipts, consumption rate, and cost per kilometer for {vehicle.name} ({vehicle.registration})
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

      {/* 4 Summary Stat Cards */}
      {/* FUTURE BACKEND: Load fuel summary cards from the backend API. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Total Fuel Expenses</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">₹48,250</p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-slate-100 text-slate-800">
              <FiDollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">All-time fuel expenditure</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Total Fuel Volume</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">465.0 L</p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[#E6F5F4] text-[#0F9D91]">
              <FiDroplet className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">Total petrol filled</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Average Fuel Efficiency</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">15.8 km/L</p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-700">
              <FiZap className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">Static fuel economy</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Average Price per Litre</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">₹105.40/L</p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-amber-50 text-amber-700">
              <FiFilter className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">Kerala petrol average rate</p>
        </div>

      </div>

      {/* Vehicle Info Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-600 whitespace-nowrap">Selected Vehicle:</label>
          <span className="text-xs sm:text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            {vehicle.name} ({vehicle.registration})
          </span>
        </div>
        <div className="text-xs text-slate-500">
          Displaying <span className="font-semibold text-slate-800">1</span> recorded fill-up
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
            <tr>
              <th className="py-3.5 px-4 sm:px-5">Date</th>
              <th className="py-3.5 px-4 sm:px-5">Vehicle &amp; Reg #</th>
              <th className="py-3.5 px-4 sm:px-5">Odometer</th>
              <th className="py-3.5 px-4 sm:px-5">Fuel Volume</th>
              <th className="py-3.5 px-4 sm:px-5">Price / L</th>
              <th className="py-3.5 px-4 sm:px-5">Total Spend</th>
              <th className="py-3.5 px-4 sm:px-5">Fuel Economy</th>
              <th className="py-3.5 px-4 sm:px-5">Fuel Station</th>
              <th className="py-3.5 px-4 sm:px-5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {/* FUTURE BACKEND: Load fuel log records from the backend API. */}
            {/* DUPLICATE CARD: Reuse table row when additional fuel logs are loaded from the backend. */}
            <tr className="hover:bg-slate-50/80 transition-colors">
              <td className="px-5 py-3.5 text-xs font-medium text-slate-800 whitespace-nowrap">{fuelLog.date}</td>
              <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                <div>
                  <p className="font-semibold text-slate-900">{vehicle.name}</p>
                  <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">{vehicle.registration}</span>
                </div>
              </td>
              <td className="px-5 py-3.5 text-xs font-mono text-slate-700 whitespace-nowrap">{fuelLog.odometer}</td>
              <td className="px-5 py-3.5 text-xs font-semibold text-slate-800 whitespace-nowrap">{fuelLog.volume}</td>
              <td className="px-5 py-3.5 text-xs text-slate-600 whitespace-nowrap">{fuelLog.pricePerLitre}</td>
              <td className="px-5 py-3.5 text-xs font-bold text-slate-900 whitespace-nowrap">{fuelLog.totalCost}</td>
              <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                <span className="inline-flex items-center gap-1 font-semibold text-[#0F9D91] bg-[#E6F5F4] px-2 py-0.5 rounded-md text-xs">
                  {fuelLog.economy}
                </span>
              </td>
              <td className="px-5 py-3.5 text-xs text-slate-500 truncate max-w-[200px]">{fuelLog.station}</td>
              <td className="px-5 py-3.5 text-xs text-right whitespace-nowrap">
                <div className="flex items-center justify-end gap-1.5 text-slate-400">
                  <button type="button" className="p-1 hover:text-[#0F9D91] transition-colors cursor-pointer" title="View Details"><FiEye className="w-4 h-4" /></button>
                  <button type="button" className="p-1 hover:text-slate-800 transition-colors cursor-pointer" title="Edit Log"><FiEdit2 className="w-4 h-4" /></button>
                  <button type="button" className="p-1 hover:text-rose-600 transition-colors cursor-pointer" title="Delete Log"><FiTrash2 className="w-4 h-4" /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Fuel Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Log Fuel Entry</h3>
                <p className="text-xs text-slate-500 mt-0.5">Record odometer reading, fuel quantity, and receipt cost</p>
              </div>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Select Vehicle</label>
                  <select className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20">
                    <option>{vehicle.name} ({vehicle.registration})</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Log Date</label>
                    <input type="date" defaultValue="2026-10-24" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Odometer (km)</label>
                    <input type="number" defaultValue="18450" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Quantity (L)</label>
                    <input type="number" defaultValue="42.5" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Total Cost (₹)</label>
                    <input type="number" defaultValue="4496.50" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Price / L (₹)</label>
                    <input type="number" defaultValue="105.80" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fuel Station &amp; Location</label>
                  <input type="text" defaultValue="Indian Oil Swagath, Kowdiar, Thiruvananthapuram" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="fullTankFL" defaultChecked className="w-4 h-4 rounded text-[#0F9D91] border-slate-300" />
                  <label htmlFor="fullTankFL" className="text-xs text-slate-700 font-medium cursor-pointer">Filled to Full Tank</label>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
                  <strong>Note:</strong> UI Design Review mode. Form submissions are visual demonstrations.
                </div>
              </form>
            </div>
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button type="button" onClick={handleCloseModal} className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer">Cancel</button>
              <button type="button" onClick={handleSubmit} className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E] cursor-pointer">Save Fuel Log (Demo)</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default FuelLogPage
