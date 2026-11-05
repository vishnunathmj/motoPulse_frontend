import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiTruck, FiDroplet, FiZap, FiBell, FiPlus,
  FiArrowUpRight, FiClock, FiTool, FiX, FiActivity
} from 'react-icons/fi'

function DashboardPage() {
  const [fuelModalOpen, setFuelModalOpen] = useState(false)
  const [serviceModalOpen, setServiceModalOpen] = useState(false)
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false)

  const vehicle = {
    name: 'Hyundai Creta',
    registration: 'KL 01 AB 1234',
    year: '2024',
    fuelType: 'Petrol'
  }

  const handleOpenFuelModal = () => setFuelModalOpen(true)
  const handleCloseFuelModal = () => setFuelModalOpen(false)
  const handleOpenServiceModal = () => setServiceModalOpen(true)
  const handleCloseServiceModal = () => setServiceModalOpen(false)
  const handleOpenVehicleModal = () => setVehicleModalOpen(true)
  const handleCloseVehicleModal = () => setVehicleModalOpen(false)

  const handleFuelSubmit = (e) => {
    e.preventDefault()
    setFuelModalOpen(false)
  }

  const handleServiceSubmit = (e) => {
    e.preventDefault()
    setServiceModalOpen(false)
  }

  const handleVehicleSubmit = (e) => {
    e.preventDefault()
    setVehicleModalOpen(false)
  }

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Page Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Your Vehicle Overview</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tracking maintenance, fuel efficiency, and compliance for your {vehicle.name} ({vehicle.registration})
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={handleOpenVehicleModal}
            className="inline-flex items-center gap-2 text-xs px-3 py-1.5 font-medium rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all duration-150 cursor-pointer"
          >
            <FiPlus className="w-4 h-4" /> Add Vehicle
          </button>
          <button
            type="button"
            onClick={handleOpenFuelModal}
            className="inline-flex items-center gap-2 text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm transition-all duration-150 cursor-pointer"
          >
            <FiDroplet className="w-4 h-4" /> Quick Log Fuel
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      {/* FUTURE BACKEND: Replace these static values with API responses. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Vehicle in Garage</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">1 Vehicle</p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-slate-100 text-slate-800">
              <FiTruck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs">
            <span className="inline-flex items-center font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">
              {vehicle.registration}
            </span>
            <span className="text-slate-500">{vehicle.name} ({vehicle.year})</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Fuel Expenses This Month</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">₹4,496</p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[#E6F5F4] text-[#0F9D91]">
              <FiDroplet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs">
            <span className="inline-flex items-center font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">42.5 Litres</span>
            <span className="text-slate-500">October 2026</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Average Fuel Efficiency</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">15.8 km/L</p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-purple-50 text-purple-700">
              <FiZap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs">
            <span className="inline-flex items-center font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">Petrol 1.5L Engine</span>
            <span className="text-slate-500">Optimal city &amp; highway mix</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Upcoming Service Reminders</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">1 Due Soon</p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-amber-50 text-amber-600">
              <FiBell className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs">
            <span className="inline-flex items-center font-medium px-1.5 py-0.5 rounded bg-rose-50 text-rose-700">PUC Renewal</span>
            <span className="text-slate-500">Action required in Jan 2027</span>
          </div>
        </div>

      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Monthly Expenses (May – Oct 2026)</h3>
              <p className="text-xs text-slate-400">Fixed sample spending data for {vehicle.name}</p>
            </div>
          </div>
          <div className="flex items-center justify-center h-64 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-400 font-semibold text-sm">
            Bar Graph
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Fuel Economy Trend (km/L)</h3>
              <p className="text-xs text-slate-400">{vehicle.name} 1.5 Petrol</p>
            </div>
            <Link to="/reports" className="text-xs font-semibold text-[#0F9D91] hover:underline flex items-center gap-1">
              Reports <FiArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex items-center justify-center h-64 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-400 font-semibold text-sm">
            Line Graph
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Upcoming Maintenance */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Upcoming Maintenance</h3>
              <p className="text-xs text-slate-400">Scheduled reminders for {vehicle.registration}</p>
            </div>
            <Link to="/reminders" className="text-xs font-semibold text-[#0F9D91] hover:underline">View All (1)</Link>
          </div>
          {/* FUTURE BACKEND: Load upcoming reminders from the backend API. */}
          {/* DUPLICATE CARD: Reuse reminder item when additional reminders are loaded from the backend. */}
          <div className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-amber-100 text-amber-600">
                <FiClock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">PUC Certificate Renewal</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {vehicle.name} ({vehicle.registration}) &bull; Due: <span className="font-medium text-slate-700">20 Jan 2027</span>
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 font-medium rounded-full border text-[11px] px-2 py-0.5 bg-amber-50 text-amber-700 border-amber-200">
              Due Soon
            </span>
          </div>
        </div>

        {/* Recent Vehicle Activity */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Vehicle Activity</h3>
              <p className="text-xs text-slate-400">Latest records for {vehicle.registration}</p>
            </div>
            <button
              type="button"
              onClick={handleOpenServiceModal}
              className="inline-flex items-center gap-2 text-xs px-3 py-1.5 font-medium rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <FiTool className="w-4 h-4" /> Log Service
            </button>
          </div>
          {/* FUTURE BACKEND: Load recent activity from the backend API. */}
          {/* DUPLICATE CARD: Reuse activity item when additional activity logs are loaded from the backend. */}
          <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold bg-[#E6F5F4] text-[#0F9D91]">
                <FiDroplet className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Fuel Refill &bull; {vehicle.name} ({vehicle.registration})</p>
                <p className="text-slate-400">42.5 L @ ₹105.80/L • Kowdiar, Thiruvananthapuram</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold text-slate-900">₹4,496.50</p>
              <p className="text-slate-400">24 Oct 2026</p>
            </div>
          </div>
        </div>

      </div>

      {/* Fuel Entry Modal */}
      {fuelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleCloseFuelModal} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Log Fuel Entry</h3>
                <p className="text-xs text-slate-500 mt-0.5">Record odometer reading, fuel quantity, and receipt cost</p>
              </div>
              <button onClick={handleCloseFuelModal} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5">
              <form onSubmit={handleFuelSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Select Vehicle</label>
                  <select className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20">
                    <option>{vehicle.name} ({vehicle.registration})</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Log Date</label>
                    <input type="date" defaultValue="2026-10-24" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Odometer (km)</label>
                    <input type="number" defaultValue="18450" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Quantity (L)</label>
                    <input type="number" defaultValue="42.5" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Total Cost (₹)</label>
                    <input type="number" defaultValue="4496.50" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Price/L (₹)</label>
                    <input type="number" defaultValue="105.80" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fuel Station &amp; Location</label>
                  <input type="text" defaultValue="Indian Oil Swagath, Kowdiar, Thiruvananthapuram" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <input type="checkbox" id="fullTankDash" defaultChecked className="w-4 h-4 rounded text-[#0F9D91] border-slate-300" />
                  <label htmlFor="fullTankDash" className="text-xs text-slate-700 font-medium cursor-pointer">Filled to Full Tank</label>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
                  <strong>Note:</strong> UI Design Review mode. Form submissions are visual demonstrations.
                </div>
              </form>
            </div>
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button type="button" onClick={handleCloseFuelModal} className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer">Cancel</button>
              <button type="button" onClick={handleFuelSubmit} className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E] cursor-pointer">Save Fuel Log (Demo)</button>
            </div>
          </div>
        </div>
      )}

      {/* Service Entry Modal */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleCloseServiceModal} />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Log Service &amp; Maintenance</h3>
                <p className="text-xs text-slate-500 mt-0.5">Record parts replaced, workshop invoices, and next service target</p>
              </div>
              <button onClick={handleCloseServiceModal} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5">
              <form onSubmit={handleServiceSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Vehicle</label>
                    <select className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20">
                      <option>{vehicle.name} ({vehicle.registration})</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Service Category</label>
                    <select className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20">
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
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
                  <strong>Note:</strong> UI Design Review mode. Form submissions are visual demonstrations.
                </div>
              </form>
            </div>
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button type="button" onClick={handleCloseServiceModal} className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer">Cancel</button>
              <button type="button" onClick={handleServiceSubmit} className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E] cursor-pointer">Save Service Log (Demo)</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {vehicleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleCloseVehicleModal} />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Add New Vehicle</h3>
                <p className="text-xs text-slate-500 mt-0.5">Enter specifications and registration details for your personal vehicle</p>
              </div>
              <button onClick={handleCloseVehicleModal} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5">
              <form onSubmit={handleVehicleSubmit} className="space-y-4">
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
                      <option>SUV</option><option>Sedan</option><option>Hatchback</option><option>Motorcycle</option>
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
              <button type="button" onClick={handleCloseVehicleModal} className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer">Cancel</button>
              <button type="button" onClick={handleVehicleSubmit} className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E] cursor-pointer">Add Vehicle</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default DashboardPage
