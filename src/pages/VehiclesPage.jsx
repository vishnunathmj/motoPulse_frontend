import React, { useState } from 'react'
import { FiPlus, FiSearch, FiTruck } from 'react-icons/fi'
import VehicleCard from '../components/vehicles/VehicleCard'

function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [fuelFilter, setFuelFilter] = useState('All')
  const [addModalOpen, setAddModalOpen] = useState(false)

  const matchesSearch =
    'hyundai creta kl 01 ab 1234'.includes(searchTerm.toLowerCase().trim()) &&
    (fuelFilter === 'All' || fuelFilter === 'Petrol')

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setFuelFilter('All')
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    setAddModalOpen(false)
  }

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">My Vehicles</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Your registered personal vehicles, service targets, and odometer tracking</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="inline-flex items-center gap-2 text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm transition-all cursor-pointer"
          >
            <FiPlus className="w-4 h-4" /> Add Vehicle
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <FiSearch className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search make, model, or registration number (e.g. KL 01 AB 1234)..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F9D91] focus:ring-1 focus:ring-[#0F9D91]"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Petrol', 'Diesel', 'Electric'].map((fuel) => (
            <button
              key={fuel}
              type="button"
              onClick={() => setFuelFilter(fuel)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                fuelFilter === fuel
                  ? 'bg-[#0F9D91] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {fuel}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Grid */}
      {matchesSearch ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* FUTURE BACKEND: Load vehicle details from the backend API. */}
          {/* DUPLICATE CARD: Reuse VehicleCard when additional vehicles are loaded from the backend. */}
          <VehicleCard />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs py-12 sm:py-16 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
            <FiTruck className="w-7 h-7" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">No vehicles found</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1 mb-6 leading-relaxed">
            No vehicles matched your search &quot;{searchTerm || fuelFilter}&quot;. Try searching with a different term.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E] cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setAddModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Add New Vehicle</h3>
                <p className="text-xs text-slate-500 mt-0.5">Enter specifications and registration details for your personal vehicle</p>
              </div>
              <button onClick={() => setAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100">
                <span className="text-lg leading-none">&times;</span>
              </button>
            </div>
            <div className="px-6 py-5 max-h-[calc(85vh-130px)] overflow-y-auto">
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Vehicle Make</label>
                    <input type="text" placeholder="e.g. Hyundai, Honda, Tata" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Model &amp; Variant</label>
                    <input type="text" placeholder="e.g. Creta SX (O) 1.5 Petrol" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Model Year</label>
                    <input type="number" placeholder="2024" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fuel Type</label>
                    <select className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20">
                      <option>Petrol</option><option>Diesel</option><option>Electric</option><option>CNG</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Body Type</label>
                    <select className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20">
                      <option>SUV</option><option>Sedan</option><option>Hatchback</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Registration Number</label>
                    <input type="text" placeholder="e.g. KL 01 AB 1234" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Current Odometer (km)</label>
                    <input type="number" placeholder="e.g. 18450" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
                  <strong>Note:</strong> UI Design Review mode. Form submissions are visual demonstrations.
                </div>
              </form>
            </div>
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button type="button" onClick={() => setAddModalOpen(false)} className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer">Cancel</button>
              <button type="button" onClick={handleAddSubmit} className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E] cursor-pointer">Add Vehicle</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default VehiclesPage
