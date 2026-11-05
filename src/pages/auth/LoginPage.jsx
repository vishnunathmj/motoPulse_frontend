import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 border-slate-800 shadow-2xl bg-white/98">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
        <p className="text-xs text-slate-500 mt-1">Sign in to your personal vehicle maintenance dashboard</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="w-full">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address <span className="text-rose-500">*</span></label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><FiMail className="w-4 h-4" /></div>
            <input type="email" placeholder="vishnunath@motopulse.com" defaultValue="vishnunath@motopulse.com" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed pl-10 border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-700">Password</label>
            <span className="text-[11px] text-[#0F9D91] hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>
          <div className="w-full">
            <div className="relative rounded-xl shadow-xs">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><FiLock className="w-4 h-4" /></div>
              <input type="password" placeholder="••••••••••••" defaultValue="motopulse123" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed pl-10 border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-slate-600">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded text-[#0F9D91] focus:ring-[#0F9D91] border-slate-300"
            />
            <span>Remember this device</span>
          </label>
        </div>

        <button type="submit" className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-base px-5 py-2.5 gap-2.5 mt-2">
          <FiArrowRight className="w-4 h-4 shrink-0" />
          Sign In to Dashboard
        </button>

        {/* Quick Demo Login Pill */}
        <div className="pt-3 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="text-xs font-semibold text-[#0F9D91] hover:text-[#0D887E] bg-[#E6F5F4] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Instant Demo Access (1-Click)
          </button>
        </div>
      </form>

      <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-[#0F9D91] hover:underline">
          Create account
        </Link>
      </div>
    </div>
  );
}
