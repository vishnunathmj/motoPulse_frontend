import React, { useState } from 'react';
import {
  FiDownload,
  FiTrendingUp,
  FiDollarSign,
  FiPieChart,
  FiInfo
} from 'react-icons/fi';

export default function ReportsPage() {
  const [exportNotice, setExportNotice] = useState(false);

  const handleExport = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 4000);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Vehicle Expense &amp; Mileage Reports</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Static sample reports and cost comparison breakdown for Hyundai Creta (KL 01 AB 1234)</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <div className="relative">
            <button type="button" onClick={handleExport} className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300 text-xs px-3 py-1.5 gap-1.5"><FiDownload className="w-4 h-4 shrink-0" />Export Report (PDF / CSV)</button>
          {exportNotice && (
            <div className="absolute right-0 top-12 z-20 w-72 bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs flex items-start gap-2 border border-slate-700">
              <FiInfo className="w-4 h-4 text-[#0F9D91] shrink-0 mt-0.5" />
              <span>
                <strong>Future Enhancement:</strong> Automated PDF/CSV export engine will be connected during the backend integration phase.
              </span>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* 3 Analytics KPI Cards - Static values directly in props */}
      {/* FUTURE BACKEND: Replace this static value with the API response. */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {[
          { title: 'Total Running Expenses', value: '₹63,050', icon: FiDollarSign, trend: 'Fixed sample total', subtitle: 'Fuel + Periodic Service', iconBg: 'bg-slate-100 text-slate-800' },
          { title: 'Total Fuel Expenses', value: '₹48,250', icon: FiTrendingUp, trend: '76.5% of total', subtitle: 'Hyundai Creta', iconBg: 'bg-[#E6F5F4] text-[#0F9D91]' },
          { title: 'Total Service Expenses', value: '₹14,800', icon: FiPieChart, trend: '23.5% of total', subtitle: 'Maintenance & inspection', iconBg: 'bg-purple-50 text-purple-700' }
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div><p className="text-xs sm:text-sm font-medium text-slate-500">{stat.title}</p><p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">{stat.value}</p></div>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${stat.iconBg}`}><Icon className="w-5 h-5" /></div>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs"><span className="inline-flex items-center font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">{stat.trend}</span><span className="text-slate-500">{stat.subtitle}</span></div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid: Replaced with simple styled placeholder <div> */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Bar Comparison Placeholder (7 cols) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 lg:col-span-7 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Fuel vs Maintenance Comparison (May – Oct 2026)</h3>
              <p className="text-xs text-slate-400">Monthly breakdown of personal vehicle spending</p>
            </div>
          </div>

          <div className="flex items-center justify-center h-64 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-400 font-semibold text-sm">
            Bar Graph
          </div>
        </div>

        {/* Expense Category Placeholder (5 cols) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 lg:col-span-5 flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="text-base font-bold text-slate-900">Spending by Category</h3>
            <p className="text-xs text-slate-400">Sample distribution of expenses for Hyundai Creta</p>
          </div>

          <div className="flex items-center justify-center h-64 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-400 font-semibold text-sm">
            Bar Graph
          </div>
        </div>
      </div>

      {/* Row 2: Mileage Trend Placeholder */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-900">Fuel Efficiency Progression (Hyundai Creta 1.5 Petrol)</h3>
          <p className="text-xs text-slate-400">Monthly average mileage curve (km/L)</p>
        </div>

        <div className="flex items-center justify-center h-64 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-400 font-semibold text-sm">
          Line Graph
        </div>
      </div>

      {/* Vehicle Cost Summary Table */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900">Vehicle Cost Summary</h3>
        <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/80"><tr>{['Vehicle & Variant', 'Total Distance', 'Fuel Spend', 'Service Spend', 'Total Running Cost', 'Cost / km', 'Fuel Economy'].map((header) => <th key={header} className="py-3.5 px-4 sm:px-6">{header}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">
          {/* FUTURE BACKEND: Load vehicle cost reports from the backend API. */}
          {/* DUPLICATE CARD: Reuse table row when additional vehicles are loaded from the backend. */}
          <tr className="hover:bg-slate-50/80 transition-colors">
            <td className="px-5 py-3.5 text-xs whitespace-nowrap">
              <div>
                <p className="font-semibold text-slate-900">Hyundai Creta SX (O) 1.5 Petrol</p>
                <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                  KL 01 AB 1234
                </span>
              </div>
            </td>
            <td className="px-5 py-3.5 text-xs font-mono font-medium text-slate-700 whitespace-nowrap">18,450 km</td>
            <td className="px-5 py-3.5 text-xs text-slate-800 whitespace-nowrap">₹48,250</td>
            <td className="px-5 py-3.5 text-xs text-slate-800 whitespace-nowrap">₹14,800</td>
            <td className="px-5 py-3.5 text-xs font-bold text-slate-900 whitespace-nowrap">₹63,050</td>
            <td className="px-5 py-3.5 text-xs whitespace-nowrap">
              <span className="font-semibold text-[#0F9D91] bg-[#E6F5F4] px-2 py-0.5 rounded text-xs">
                ₹3.41 / km
              </span>
            </td>
            <td className="px-5 py-3.5 text-xs whitespace-nowrap">
              <span className="inline-flex items-center gap-1.5 font-medium rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 text-xs px-2.5 py-1">15.8 km/L</span>
            </td>
          </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
