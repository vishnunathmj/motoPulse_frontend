import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { getProfileAPI } from '../services/allApi';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  });
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState('');

  const loadProfile = useCallback(async () => {
    setProfileLoading(true);
    setProfileError('');
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await getProfileAPI();
      const authenticatedUser = response.data.user || {};

      setProfile({
        ...storedUser,
        id: authenticatedUser.userId || storedUser.id,
        email: authenticatedUser.email || storedUser.email || '',
        username: authenticatedUser.username || storedUser.username || ''
      });
    } catch (error) {
      setProfileError(
        error.response?.data?.message || 'Could not verify your profile. Please try again.'
      );
    } finally {
      setProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  const displayName = profile.username || '—';
  const displayEmail = profile.email || '—';

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">View your account information and manage your session</p>
        </div>
      </div>

      {profileError && (
        <div
          role="alert"
          className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between gap-2 text-xs text-rose-700"
        >
          <span>{profileError}</span>
          <button
            type="button"
            onClick={loadProfile}
            className="font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-[#0F9D91] text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-[#0F9D91]/20">
            {profileLoading
              ? '…'
              : (displayName !== '—' ? displayName : displayEmail).slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {profileLoading ? 'Loading profile...' : displayName}
            </h3>
            <p className="text-xs text-slate-500">{displayEmail}</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Username
              </label>
              <div className="relative rounded-xl shadow-xs">
                <input
                  type="text"
                  value={profileLoading ? '' : displayName === '—' ? '' : displayName}
                  placeholder={profileLoading ? 'Loading...' : '—'}
                  readOnly
                  disabled
                  className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-slate-50 text-slate-500 cursor-not-allowed border-slate-200"
                />
              </div>
            </div>
            <div className="w-full">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-xs">
                <input
                  type="email"
                  value={profileLoading ? '' : displayEmail === '—' ? '' : displayEmail}
                  placeholder={profileLoading ? 'Loading...' : '—'}
                  readOnly
                  disabled
                  className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-slate-50 text-slate-500 cursor-not-allowed border-slate-200"
                />
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <FiUser className="w-4 h-4" /> Account details
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 border-rose-200/80 bg-rose-50/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Sign Out of MotoPulse</h4>
            <p className="text-xs text-slate-500 mt-0.5">End your current session and return to the login screen</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-500 text-xs px-3 py-1.5 gap-1.5"
          >
            <FiLogOut className="w-4 h-4 shrink-0" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
