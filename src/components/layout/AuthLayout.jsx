import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { FiActivity } from 'react-icons/fi'

function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#17252B] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-[#0F9D91]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-[#0F9D91]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="mb-6 text-center z-10">
        <Link to="/dashboard" className="inline-flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#0F9D91] flex items-center justify-center text-white shadow-lg shadow-[#0F9D91]/30">
            <FiActivity className="w-6 h-6" />
          </div>
          <div className="text-left">
            <span className="font-extrabold text-2xl text-white tracking-tight">MotoPulse</span>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">Personal Vehicle Maintenance Tracker</p>
          </div>
        </Link>
      </div>

      {/* Dynamic Auth Card Outlet */}
      <div className="w-full max-w-md z-10">
        <Outlet />
      </div>

      {/* Footer copyright */}
      <div className="mt-8 text-center text-xs text-slate-500 z-10">
        &copy; {new Date().getFullYear()} MotoPulse. Smart Personal Vehicle Maintenance &amp; Fuel Efficiency Tracking.
      </div>
    </div>
  )
}

export default AuthLayout
