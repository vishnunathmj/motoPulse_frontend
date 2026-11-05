import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 border-slate-800 shadow-2xl bg-white/98">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Create Account</h2>
        <p className="text-xs text-slate-500 mt-1">Start tracking vehicle maintenance & fuel efficiency</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="w-full">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name <span className="text-rose-500">*</span></label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><FiUser className="w-4 h-4" /></div>
            <input type="text" placeholder="e.g. Vishnunath" defaultValue="Vishnunath" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed pl-10 border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
          </div>
        </div>

        <div className="w-full">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address <span className="text-rose-500">*</span></label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><FiMail className="w-4 h-4" /></div>
            <input type="email" placeholder="vishnunath@motopulse.com" defaultValue="vishnunath@motopulse.com" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed pl-10 border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
          </div>
        </div>

        <div className="w-full">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password <span className="text-rose-500">*</span></label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><FiLock className="w-4 h-4" /></div>
            <input type="password" placeholder="Minimum 8 characters" defaultValue="motopulse123" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed pl-10 border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
          </div>
        </div>

        <div className="w-full">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Confirm Password <span className="text-rose-500">*</span></label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><FiLock className="w-4 h-4" /></div>
            <input type="password" placeholder="Re-enter password" defaultValue="motopulse123" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed pl-10 border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" />
          </div>
        </div>

        <div className="text-[11px] text-slate-500 leading-normal">
          By signing up, you agree to our{' '}
          <span className="text-[#0F9D91] underline cursor-pointer">Terms of Service</span> and{' '}
          <span className="text-[#0F9D91] underline cursor-pointer">Privacy Policy</span>.
        </div>

        <button type="submit" className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-base px-5 py-2.5 gap-2.5 mt-2">
          <FiArrowRight className="w-4 h-4 shrink-0" />
          Create MotoPulse Account
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
        Already registered?{' '}
        <Link to="/login" className="font-semibold text-[#0F9D91] hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
