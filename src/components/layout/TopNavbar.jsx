import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  FiBell,
  FiPlus,
  FiSettings,
  FiLogOut,
  FiUser
} from 'react-icons/fi'

// Moved outside component — it does not depend on any state or props
function getPageTitle(pathname) {
  if (pathname.startsWith('/dashboard')) return 'Dashboard'
  if (pathname.startsWith('/vehicles/')) return 'Vehicle Details'
  if (pathname.startsWith('/vehicles')) return 'My Vehicles'
  if (pathname.startsWith('/fuel')) return 'Fuel Log'
  if (pathname.startsWith('/maintenance')) return 'Service & Maintenance'
  if (pathname.startsWith('/reminders')) return 'Reminders'
  if (pathname.startsWith('/documents')) return 'Vehicle Documents'
  if (pathname.startsWith('/reports')) return 'Reports & Analytics'
  if (pathname.startsWith('/settings')) return 'Settings'
  return 'MotoPulse'
}

function TopNavbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  let user = {}
  try {
    user = JSON.parse(localStorage.getItem('user') || '{}')
  } catch {
    user = {}
  }
  const displayName = user.username || user.email || 'Account'
  const displayEmail = user.email || ''
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogFuel = () => {
    navigate('/fuel')
  }

  const handleProfileToggle = () => {
    setShowProfileMenu(!showProfileMenu)
  }

  const handleCloseMenu = () => {
    setShowProfileMenu(false)
  }

  const handleLogout = () => {
    handleCloseMenu()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-30 h-18 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {getPageTitle(location.pathname)}
          </h2>
          <p className="hidden sm:block text-xs text-slate-400">
            {new Intl.DateTimeFormat('en-IN', {
              weekday: 'long',
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }).format(new Date())}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-4">
        <div className="hidden sm:block">
          <button
            type="button"
            onClick={handleLogFuel}
            className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-xs px-3 py-1.5 gap-1.5"
          >
            <FiPlus className="w-4 h-4 shrink-0" />
            Log Fuel
          </button>
        </div>

        <Link
          to="/reminders"
          className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Reminders"
        >
          <FiBell className="w-5 h-5" />
        </Link>

        <div className="relative">
          <button
            type="button"
            onClick={handleProfileToggle}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-[#0F9D91] text-white flex items-center justify-center shadow-xs">
              <FiUser className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-tight">
                {displayName}
              </p>
              <p className="text-[10px] text-slate-400 truncate">{displayEmail}</p>
            </div>
          </button>

          {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={handleCloseMenu} />
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs text-slate-700">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="font-semibold text-slate-900">{displayName}</p>
                  <p className="text-[11px] text-slate-400 truncate">{displayEmail}</p>
                </div>

                <Link
                  to="/settings"
                  onClick={handleCloseMenu}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 transition-colors"
                >
                  <FiSettings className="w-4 h-4 text-slate-400" />
                  <span>Settings & Preferences</span>
                </Link>

                <div className="border-t border-slate-100 my-1" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default TopNavbar
