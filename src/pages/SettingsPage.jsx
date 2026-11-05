import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUser,
  FiLock,
  FiSliders,
  FiSave,
  FiLogOut,
  FiCheck,
  FiShield,
  FiMoon
} from 'react-icons/fi';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [savedNotice, setSavedNotice] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: FiUser },
    { id: 'security', label: 'Security & Password', icon: FiLock },
    { id: 'preferences', label: 'General Preferences', icon: FiSliders },
    { id: 'appearance', label: 'Appearance', icon: FiMoon }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Settings &amp; Preferences</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage your personal profile, authentication credentials, and tracking preferences</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${isActive ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Save Notification */}
      {savedNotice && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-semibold animate-fade-in">
          <FiCheck className="w-4 h-4 text-emerald-600" />
          <span>Settings updated successfully!</span>
        </div>
      )}

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
          {/* FUTURE BACKEND: Load user profile from the backend API. */}
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-[#0F9D91] text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-[#0F9D91]/20">
              VN
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Vishnunath</h3>
              <p className="text-xs text-slate-500">Vehicle Owner &bull; Thiruvananthapuram, Kerala</p>
              <p className="text-[11px] text-slate-400 mt-1">Member since February 2024</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="w-full">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name <span className="text-rose-500">*</span></label>
                <div className="relative rounded-xl shadow-xs"><input type="text" defaultValue="Vishnunath" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div>
              </div>
              <div className="w-full">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address <span className="text-rose-500">*</span></label>
                <div className="relative rounded-xl shadow-xs"><input type="email" defaultValue="vishnunath@motopulse.com" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone Number</label><div className="relative rounded-xl shadow-xs"><input type="text" defaultValue="+91 98470 12345" className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
              <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Location</label><div className="relative rounded-xl shadow-xs"><input type="text" defaultValue="Thiruvananthapuram, Kerala" className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-400">Settings demonstrate UI layout</p>
              <button type="submit" className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-xs px-3 py-1.5 gap-1.5"><FiSave className="w-4 h-4 shrink-0" />
                Save Profile
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Security & Password */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
          <div className="mb-6">
            <h3 className="text-base font-bold text-slate-900">Change Password</h3>
            <p className="text-xs text-slate-500 mt-0.5">Keep your account safe with a strong password</p>
          </div>

          <form onSubmit={handleSave} className="space-y-4 max-w-lg">
            <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Current Password <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="password" placeholder="••••••••••••" defaultValue="currentpass" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
            <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">New Password <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="password" placeholder="Minimum 8 characters" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
            <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Confirm New Password <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="password" placeholder="Re-enter new password" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button type="submit" className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-xs px-3 py-1.5 gap-1.5"><FiShield className="w-4 h-4 shrink-0" />
                Update Password
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: General Preferences */}
      {activeTab === 'preferences' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
          <div className="mb-6">
            <h3 className="text-base font-bold text-slate-900">Units & Tracking Standards</h3>
            <p className="text-xs text-slate-500 mt-0.5">Customize your preferred currency and measurement units</p>
          </div>

          <form onSubmit={handleSave} className="space-y-4 max-w-lg">
            <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Preferred Currency</label><div className="relative rounded-xl shadow-xs"><select defaultValue="INR (₹) - Indian Rupee" className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed appearance-none cursor-pointer border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"><option value="">Select an option</option><option>INR (₹) - Indian Rupee</option><option>USD ($) - US Dollar</option><option>EUR (€) - Euro</option></select><div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400"><svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg></div></div></div>

            <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Distance Unit</label><div className="relative rounded-xl shadow-xs"><select defaultValue="Kilometers (km)" className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed appearance-none cursor-pointer border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"><option value="">Select an option</option><option>Kilometers (km)</option><option>Miles (mi)</option></select><div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400"><svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg></div></div></div>

            <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Fuel Volume Unit</label><div className="relative rounded-xl shadow-xs"><select defaultValue="Litres (L)" className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed appearance-none cursor-pointer border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"><option value="">Select an option</option><option>Litres (L)</option><option>US Gallons (gal)</option></select><div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400"><svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg></div></div></div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button type="submit" className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-xs px-3 py-1.5 gap-1.5"><FiSave className="w-4 h-4 shrink-0" />
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 4: Appearance */}
      {activeTab === 'appearance' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
          <div className="mb-6">
            <h3 className="text-base font-bold text-slate-900">Appearance Settings</h3>
            <p className="text-xs text-slate-500 mt-0.5">Personalize the visual look and theme</p>
          </div>

          <div className="space-y-4 max-w-lg">
            <div className="p-4 rounded-xl border-2 border-[#0F9D91] bg-[#E6F5F4]/30 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">Light Modern Theme (Active)</p>
                <p className="text-xs text-slate-500">Dark charcoal navigation with soft light canvas</p>
              </div>
              <span className="w-3 h-3 rounded-full bg-[#0F9D91]" />
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 opacity-60 flex items-center justify-between cursor-not-allowed">
              <div>
                <p className="text-sm font-semibold text-slate-700">Dark High-Contrast Theme</p>
                <p className="text-xs text-slate-400">Night mode optimization (Coming soon)</p>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Preview</span>
            </div>
          </div>
        </div>
      )}

      {/* Logout Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 border-rose-200/80 bg-rose-50/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Sign Out of MotoPulse</h4>
            <p className="text-xs text-slate-500 mt-0.5">End your current session and return to the login screen</p>
          </div>
          <button type="button" onClick={handleLogout} className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-500 text-xs px-3 py-1.5 gap-1.5"><FiLogOut className="w-4 h-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
