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
  FiActivity
} from 'react-icons/fi'

const navItems = [
  { label: 'Dashboard',            path: '/dashboard',   icon: FiGrid },
  { label: 'My Vehicles',          path: '/vehicles',    icon: FiTruck },
  { label: 'Fuel Log',             path: '/fuel',        icon: FiDroplet },
  { label: 'Service & Maintenance',path: '/maintenance', icon: FiTool },
  { label: 'Reminders',            path: '/reminders',   icon: FiBell, badge: 3 },
  { label: 'Documents',            path: '/documents',   icon: FiFileText },
  { label: 'Reports',              path: '/reports',     icon: FiBarChart2 },
  { label: 'Settings',             path: '/settings',    icon: FiSettings }
]

function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const navigate = useNavigate()

  const handleNavigation = () => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    handleNavigation()
    navigate('/login')
  }

  return (
    <aside className="w-[248px] h-screen bg-[#17252B] text-slate-300 flex flex-col justify-between shrink-0 select-none border-r border-[#243740]">
      {/* Top Branding */}
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

        {/* Navigation list */}
        <div className="px-3 py-4">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Navigation
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon

              const getNavClass = ({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#0F9D91] text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-[#22353E]'
                }`

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleNavigation}
                  className={getNavClass}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Bottom User Area */}
      <div className="p-3 border-t border-[#243740] bg-[#142025]">
        <div className="px-2 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#0F9D91]/20 border border-[#0F9D91]/40 text-[#0F9D91] flex items-center justify-center font-bold text-xs shrink-0">
              VN
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">Vishnunath</p>
              <p className="text-[10px] text-slate-400 truncate">Vehicle Owner</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out (Demo)"
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
