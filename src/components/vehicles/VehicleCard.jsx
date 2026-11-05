import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiMoreVertical, FiDroplet, FiCalendar,
  FiArrowRight, FiEdit2, FiTrash2, FiX
} from 'react-icons/fi'

function VehicleCard() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  const vehicle = {
    name: 'Hyundai Creta',
    variant: 'SX (O) 1.5 Petrol',
    registration: 'KL 01 AB 1234',
    year: '2024',
    fuelType: 'Petrol',
    odometer: '18,450 km',
    avgMileage: '15.8 km/L',
    lastServiced: '12 Sep 2026',
    transmission: 'Manual 6-Speed',
    type: 'SUV',
    vin: 'MALC1234EPM987654',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
  }

  const handleMenuToggle = (e) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }

  const handleMenuClose = () => {
    setMenuOpen(false)
  }

  const handleEditOpen = () => {
    setMenuOpen(false)
    setEditModalOpen(true)
  }

  const handleEditClose = () => {
    setEditModalOpen(false)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    setEditModalOpen(false)
  }

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between relative group overflow-hidden">

        {/* Image Banner */}
        <div className="h-44 bg-slate-800 overflow-hidden relative">
          <img
            src={vehicle.imageUrl}
            alt={vehicle.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 font-medium rounded-full border text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 border-emerald-200">
              {vehicle.fuelType}
            </span>
            <span className="bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-0.5 rounded-full border border-white/20">
              {vehicle.year}
            </span>
          </div>

          {/* 3-dot Menu */}
          <div className="absolute top-3 right-3">
            <button
              type="button"
              onClick={handleMenuToggle}
              className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm transition-colors"
            >
              <FiMoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={handleMenuClose} />
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 text-xs">
                  <button
                    type="button"
                    onClick={handleEditOpen}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 text-left"
                  >
                    <FiEdit2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Edit Details</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleMenuClose}
                    className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 text-left"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Bottom overlay: Plate + Odometer */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-300 font-mono text-xs font-bold text-slate-900 tracking-wider shadow-sm">
              {vehicle.registration}
            </div>
            <div className="text-right text-white">
              <p className="text-[10px] text-slate-300 uppercase tracking-wider">Odometer</p>
              <p className="text-xs font-bold font-mono">{vehicle.odometer}</p>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-[#0F9D91] transition-colors">
            {vehicle.name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{vehicle.transmission} &bull; {vehicle.type}</p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <FiDroplet className="w-3.5 h-3.5 text-[#0F9D91]" />
                <span className="text-[11px] font-medium text-slate-600">Avg Economy</span>
              </div>
              <p className="text-sm font-bold text-slate-900">{vehicle.avgMileage}</p>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <FiCalendar className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[11px] font-medium text-slate-600">Last Serviced</span>
              </div>
              <p className="text-sm font-bold text-slate-900">{vehicle.lastServiced}</p>
            </div>
          </div>

          {/* View Details Link */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/vehicles/veh-001"
              className="text-xs font-semibold text-[#0F9D91] hover:text-[#0D887E] flex items-center gap-1.5 transition-colors"
            >
              <span>View Complete Details</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Edit Vehicle Modal (inline) */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleEditClose} />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Edit Vehicle Details</h3>
                <p className="text-xs text-slate-500 mt-0.5">Updating {vehicle.name} ({vehicle.registration})</p>
              </div>
              <button onClick={handleEditClose} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5 max-h-[calc(85vh-130px)] overflow-y-auto">
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Vehicle Make</label>
                    <input type="text" defaultValue="Hyundai" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Model &amp; Variant</label>
                    <input type="text" defaultValue={vehicle.variant} className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Model Year</label>
                    <input type="number" defaultValue={vehicle.year} className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fuel Type</label>
                    <select defaultValue={vehicle.fuelType} className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20">
                      <option>Petrol</option><option>Diesel</option><option>Electric</option><option>CNG</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Body Type</label>
                    <select defaultValue={vehicle.type} className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20">
                      <option>SUV</option><option>Sedan</option><option>Hatchback</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Registration Number</label>
                    <input type="text" defaultValue={vehicle.registration} className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">VIN / Chassis Number</label>
                    <input type="text" defaultValue={vehicle.vin} className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
                  <strong>Note:</strong> UI Design Review mode. Form submissions are visual demonstrations.
                </div>
              </form>
            </div>
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button type="button" onClick={handleEditClose} className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer">Cancel</button>
              <button type="button" onClick={handleEditSubmit} className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E] cursor-pointer">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default VehicleCard
