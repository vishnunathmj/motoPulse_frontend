import React from 'react'
import Sidebar from './Sidebar'
import { FiX } from 'react-icons/fi'

function MobileDrawer({ isMobileMenuOpen, setIsMobileMenuOpen }) {

  if (!isMobileMenuOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <div className="relative z-10 w-[248px] max-w-[80vw] h-full bg-[#17252B] shadow-2xl flex flex-col">
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-3 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
        >
          <FiX className="w-5 h-5" />
        </button>
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </div>
    </div>
  )
}

export default MobileDrawer
