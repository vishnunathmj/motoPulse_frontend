import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'
import MobileDrawer from './MobileDrawer'

function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F7F8]">
      {/* Desktop Sidebar (hidden on mobile/tablet) */}
      <div className="hidden lg:block shrink-0">
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </div>

      {/* Mobile Drawer (visible when open on mobile/tablet) */}
      <MobileDrawer isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      {/* Main Viewport */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopNavbar setIsMobileMenuOpen={setIsMobileMenuOpen} />

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
