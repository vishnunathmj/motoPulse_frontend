import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  FiGrid,
  FiTruck,
  FiDroplet,
  FiTool,
  FiBell,
  FiFileText,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiActivity,
  FiUser
} from 'react-icons/fi'

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: FiGrid },
  { label: 'My Vehicles', path: '/vehicles', icon: FiTruck },
  { label: 'Fuel Log', path: '/fuel', icon: FiDroplet },
  { label: 'Service & Maintenance', path: '/maintenance', icon: FiTool },
  { label: 'Reminders', path: '/reminders', icon: FiBell },
  { label: 'Documents', path: '/documents', icon: FiFileText },
  { label: 'Reports', path: '/reports', icon: FiBarChart2 },
  { label: 'Settings', path: '/settings', icon: FiSettings }
]

function Sidebar() {
  const navigate = useNavigate()
  let user = {}
  try {
    user = JSON.parse(localStorage.getItem('user') || '{}')
  } catch {
    user = {}
  }
  const displayName = user.username || user.email || 'Account'

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login', { replace: true })
  }

  return (
    <aside className="w-[248px] h-screen bg-[#17252B] text-slate-300 flex flex-col justify-between shrink-0 select-none border-r border-[#243740]">
      <div>
        <div className="h-18 px-5 flex items-center gap-3 border-b border-[#243740]">
          <div className="w-10 h-10 rounded-xl bg-[#0F9D91] flex items-center justify-center text-white shadow-md shadow-[#0F9D91]/20">
            <FiActivity className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-white text-base tracking-tight">MotoPulse</span>
            <p className="text-[11px] text-slate-400">Personal Vehicle Tracker</p>
          </div>
        </div>

        <div className="px-3 py-4">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Navigation
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon

              const getNavClass = ({ isActive }) => {
                if (isActive) {
                  return 'flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors bg-[#0F9D91] text-white shadow-sm font-semibold'
                }

                return 'flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors text-slate-300 hover:text-white hover:bg-[#22353E]'
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={getNavClass}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="p-3 border-t border-[#243740] bg-[#142025]">
        <div className="px-2 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#0F9D91]/20 border border-[#0F9D91]/40 text-[#0F9D91] flex items-center justify-center shrink-0">
              <FiUser className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{displayName}</p>
              <p className="text-[10px] text-slate-400 truncate">{user.email || ''}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
          >
            <FiLogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
