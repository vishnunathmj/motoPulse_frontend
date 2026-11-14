import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'

function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F7F8]">
      {/* Desktop Sidebar (hidden on mobile/tablet) */}
      <div className="hidden lg:block shrink-0">
        <Sidebar />
      </div>

      {/* Main Viewport */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopNavbar />

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
