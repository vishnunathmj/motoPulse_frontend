import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertOctagon, FiArrowLeft, FiGrid } from 'react-icons/fi';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#F5F7F8] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-200">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center mb-6">
          <FiAlertOctagon className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-[#0F9D91] bg-[#E6F5F4] px-3 py-1 rounded-full">
          Error 404
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4 tracking-tight">
          Route Not Found
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
          The vehicle or screen you are looking for has been moved or doesn&apos;t exist in the current MotoPulse navigation.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/dashboard" className="w-full sm:w-auto">
            <button type="button" className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-sm px-4 py-2 gap-2 w-full">
              <FiGrid className="w-4 h-4 shrink-0" />
              Back to Dashboard
            </button>
          </Link>
          <Link to="/vehicles" className="w-full sm:w-auto">
            <button type="button" className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300 text-sm px-4 py-2 gap-2 w-full">
              <FiArrowLeft className="w-4 h-4 shrink-0" />
              My Vehicles
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
