import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiDroplet,
  FiTool,
  FiFileText,
  FiEdit2,
  FiPlus,
  FiShield,
  FiAlertCircle,
  FiInfo,
  FiX
} from 'react-icons/fi';
import DocumentCard from '../components/documents/DocumentCard';

export default function VehicleDetailsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFuelModalOpen, setIsFuelModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiInfo },
    { id: 'fuel', label: 'Fuel History', count: 1, icon: FiDroplet },
    { id: 'maintenance', label: 'Maintenance Log', count: 1, icon: FiTool },
    { id: 'documents', label: 'Compliance & Documents', count: 1, icon: FiFileText }
  ];

  function handleEditSubmit(e) {
    e.preventDefault();
    setIsEditModalOpen(false);
  }

  function handleFuelSubmit(e) {
    e.preventDefault();
    setIsFuelModalOpen(false);
  }

  function handleServiceSubmit(e) {
    e.preventDefault();
    setIsServiceModalOpen(false);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsEditModalOpen(false);
        setIsFuelModalOpen(false);
        setIsServiceModalOpen(false);
      }
    }

    if (isEditModalOpen || isFuelModalOpen || isServiceModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditModalOpen, isFuelModalOpen, isServiceModalOpen]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Back button & Breadcrumb */}
      <div>
        <Link
          to="/vehicles"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-3"
        >
          <FiArrowLeft className="w-3.5 h-3.5" />
          <span>Back to My Vehicles</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Hyundai Creta
              </h1>
              <span className="font-mono bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-md border border-slate-300">
                KL 01 AB 1234
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              2024 &bull; SX (O) 1.5 Petrol &bull; Petrol &bull; Manual 6-Speed &bull; Thiruvananthapuram (KL-01)
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button type="button" onClick={() => setIsEditModalOpen(true)} className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300 text-xs px-3 py-1.5 gap-1.5"><FiEdit2 className="w-4 h-4 shrink-0" />
              Edit Specs
            </button>
            <button type="button" onClick={() => setIsFuelModalOpen(true)} className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-xs px-3 py-1.5 gap-1.5"><FiDroplet className="w-4 h-4 shrink-0" />
              Log Fuel
            </button>
          </div>
        </div>
      </div>

      {/* Vehicle Summary Hero Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
        <div className="md:col-span-4 h-48 rounded-xl overflow-hidden bg-slate-900 relative">
          <img
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
            alt="Hyundai Creta"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 text-white text-xs">
            <p className="text-slate-300 text-[11px]">Chassis / VIN</p>
            <p className="font-mono font-semibold">MALC1234EPM987654</p>
          </div>
        </div>

        {/* 4 Static Predefined KPI Summary Blocks */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-auto">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="text-[11px] text-slate-500 uppercase font-medium">Odometer</p>
            <p className="text-xl font-bold text-slate-900 mt-1 font-mono">18,450 km</p>
            <p className="text-[11px] text-slate-400 mt-1">Current reading</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="text-[11px] text-slate-500 uppercase font-medium">Avg Economy</p>
            <p className="text-xl font-bold text-[#0F9D91] mt-1">15.8 km/L</p>
            <p className="text-[11px] text-emerald-600 mt-1 font-medium">Predefined average</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="text-[11px] text-slate-500 uppercase font-medium">Fuel Spend</p>
            <p className="text-xl font-bold text-slate-900 mt-1">₹48,250</p>
            <p className="text-[11px] text-slate-400 mt-1">Predefined total</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="text-[11px] text-slate-500 uppercase font-medium">Service Cost</p>
            <p className="text-xl font-bold text-slate-900 mt-1">₹14,800</p>
            <p className="text-[11px] text-slate-400 mt-1">Predefined total</p>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${isActive ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}>
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${isActive ? 'bg-[#0F9D91]/15 text-[#0A7067]' : 'bg-slate-200 text-slate-600'}`}>{tab.count}</span>}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
            <h3 className="text-base font-bold text-slate-900 mb-4">Vehicle Specifications</h3>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Make & Model</span>
                <span className="font-semibold text-slate-800">Hyundai Creta</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Variant</span>
                <span className="font-medium text-slate-800">SX (O) 1.5 Petrol</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Registration Number</span>
                <span className="font-mono font-bold text-slate-900">KL 01 AB 1234</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Registration RTO</span>
                <span className="font-medium text-slate-800">Thiruvananthapuram (KL-01)</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Fuel Type</span>
                <span className="inline-flex items-center gap-1.5 font-medium rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 text-xs px-2.5 py-1">Petrol</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Fuel Tank Capacity</span>
                <span className="font-medium text-slate-800">50 Litres</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Transmission</span>
                <span className="font-medium text-slate-800">Manual 6-Speed</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Chassis / VIN</span>
                <span className="font-mono text-slate-700">MALC1234EPM987654</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
            <h3 className="text-base font-bold text-slate-900 mb-4">Compliance & Maintenance Status</h3>
            <div className="space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FiShield className="w-4 h-4 text-emerald-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Insurance Policy</p>
                    <p className="text-[11px] text-slate-500">Expires: 15 Feb 2027</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 font-medium rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 text-xs px-2.5 py-1">Valid</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FiAlertCircle className="w-4 h-4 text-[#0F9D91]" />
                  <div>
                    <p className="font-semibold text-slate-900">Kerala PUC Certificate</p>
                    <p className="text-[11px] text-slate-500">Expires: 20 Jan 2027</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 font-medium rounded-full border bg-[#E6F5F4] text-[#0A7067] border-[#BBE3E0] text-xs px-2.5 py-1">Valid</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FiTool className="w-4 h-4 text-amber-500" />
                  <div>
                    <p className="font-semibold text-slate-900">Last Service Recorded</p>
                    <p className="text-[11px] text-slate-500">12 Sep 2026 at 17,000 km</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 font-medium rounded-full border bg-slate-100 text-slate-700 border-slate-200 text-xs px-2.5 py-1">Up to date</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Fuel History */}
      {activeTab === 'fuel' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Fuel History for Hyundai Creta (KL 01 AB 1234)</h3>
            <button type="button" onClick={() => setIsFuelModalOpen(true)} className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-xs px-3 py-1.5 gap-1.5"><FiPlus className="w-4 h-4 shrink-0" />
              Add Fuel Entry
            </button>
          </div>
          <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white"><table className="w-full text-left text-sm text-slate-600"><thead className="bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/80"><tr>{['Date', 'Odometer', 'Volume', 'Rate', 'Total Spend', 'Mileage', 'Fuel Station'].map((header, index) => <th key={index} className="py-3.5 px-4 sm:px-6">{header}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">
            {/* FUTURE BACKEND: Load fuel logs from the backend API. */}
            {/* DUPLICATE CARD: Reuse table row when additional fuel logs are loaded from the backend. */}
            <tr className="hover:bg-slate-50/80 transition-colors">
              <td className="px-5 py-3.5 text-xs text-slate-700 whitespace-nowrap">24 Oct 2026</td>
              <td className="px-5 py-3.5 text-xs font-mono text-slate-700 whitespace-nowrap">18,450 km</td>
              <td className="px-5 py-3.5 text-xs text-slate-700 whitespace-nowrap">42.5 L</td>
              <td className="px-5 py-3.5 text-xs text-slate-700 whitespace-nowrap">₹105.80/L</td>
              <td className="px-5 py-3.5 text-xs font-bold text-slate-900 whitespace-nowrap">₹4,496.50</td>
              <td className="px-5 py-3.5 text-xs font-semibold text-[#0F9D91] whitespace-nowrap">15.8 km/L</td>
              <td className="px-5 py-3.5 text-xs text-slate-600 whitespace-nowrap">Indian Oil Swagath, Kowdiar, Thiruvananthapuram</td>
            </tr>
          </tbody></table></div>
        </div>
      )}

      {/* Tab 3: Maintenance History */}
      {activeTab === 'maintenance' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Maintenance Records for Hyundai Creta</h3>
            <button type="button" onClick={() => setIsServiceModalOpen(true)} className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-xs px-3 py-1.5 gap-1.5"><FiPlus className="w-4 h-4 shrink-0" />
              Log Service
            </button>
          </div>
          <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white"><table className="w-full text-left text-sm text-slate-600"><thead className="bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/80"><tr>{['Service Date', 'Service Type', 'Odometer', 'Workshop / Center', 'Cost', 'Next Due (Target)'].map((header, index) => <th key={index} className="py-3.5 px-4 sm:px-6">{header}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">
            {/* FUTURE BACKEND: Load maintenance logs from the backend API. */}
            {/* DUPLICATE CARD: Reuse table row when additional maintenance records are loaded from the backend. */}
            <tr className="hover:bg-slate-50/80 transition-colors">
              <td className="px-5 py-3.5 text-xs text-slate-700 whitespace-nowrap">12 Sep 2026</td>
              <td className="px-5 py-3.5 text-xs whitespace-nowrap"><span className="inline-flex items-center gap-1.5 font-medium rounded-full border bg-[#E6F5F4] text-[#0A7067] border-[#BBE3E0] text-xs px-2.5 py-1">Periodic Maintenance</span></td>
              <td className="px-5 py-3.5 text-xs font-mono text-slate-700 whitespace-nowrap">17,000 km</td>
              <td className="px-5 py-3.5 text-xs text-slate-600 whitespace-nowrap">Popular Hyundai, Kazhakkoottam, Thiruvananthapuram</td>
              <td className="px-5 py-3.5 text-xs font-bold text-slate-900 whitespace-nowrap">₹5,800.00</td>
              <td className="px-5 py-3.5 text-xs text-slate-700 whitespace-nowrap">12 Sep 2027</td>
            </tr>
          </tbody></table></div>
        </div>
      )}

      {/* Tab 4: Documents - Uses reusable DocumentCard component */}
      {activeTab === 'documents' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* FUTURE BACKEND: Load compliance documents from the backend API. */}
          {/* DUPLICATE CARD: Reuse DocumentCard when additional documents are loaded from the backend. */}
          <DocumentCard />
        </div>
      )}

      {/* Modals */}

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={() => setIsEditModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden transform transition-all my-8" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Edit Vehicle Details</h3>
                <p className="text-xs text-slate-500 mt-0.5">Updating Hyundai Creta (KL 01 AB 1234)</p>
              </div>
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"><FiX className="w-5 h-5" /></button>
            </div>

            <div className="px-6 py-5 max-h-[calc(85vh-130px)] overflow-y-auto">
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Vehicle Make <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="text" placeholder="e.g. Hyundai, Honda, Tata" defaultValue="Hyundai" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Model &amp; Variant <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="text" placeholder="e.g. Creta SX (O) 1.5 Petrol" defaultValue="Creta SX (O) 1.5 Petrol" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Model Year <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="number" placeholder="e.g. 2024" defaultValue={2024} required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Fuel Type <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><select defaultValue="Petrol" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed appearance-none cursor-pointer border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"><option value="">Select an option</option>{['Petrol', 'Diesel', 'Electric', 'CNG', 'Hybrid'].map((fuel) => <option key={fuel}>{fuel}</option>)}</select><div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400"><svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg></div></div></div>
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Body Type <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><select defaultValue="SUV" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed appearance-none cursor-pointer border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"><option value="">Select an option</option>{['SUV', 'Sedan', 'Hatchback', 'Motorcycle', 'Scooter', 'Truck'].map((bodyType) => <option key={bodyType}>{bodyType}</option>)}</select><div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400"><svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg></div></div></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Registration Number <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="text" placeholder="e.g. KL 01 AB 1234" defaultValue="KL 01 AB 1234" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">VIN / Chassis Number</label><div className="relative rounded-xl shadow-xs"><input type="text" placeholder="Optional 17-character VIN" defaultValue="MALC1234EPM987654" className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Current Odometer <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="number" placeholder="e.g. 18450" defaultValue="18450" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 pr-12 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /><div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-slate-400 font-medium">km</div></div></div>
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Tank / Battery Capacity</label><div className="relative rounded-xl shadow-xs"><input type="number" placeholder="e.g. 50" defaultValue="50" className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 pr-12 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /><div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-slate-400 font-medium">L / kWh</div></div></div>
                </div>

                <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Photo URL (Optional)</label><div className="relative rounded-xl shadow-xs"><input type="text" placeholder="https://..." defaultValue="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80" className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800"><strong>Note:</strong> UI Design Review mode active. Form submissions are visual demonstrations.</div>
              </form>
            </div>

            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300 text-xs px-3 py-1.5 gap-1.5">Cancel</button>
              <button type="button" onClick={handleEditSubmit} className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-xs px-3 py-1.5 gap-1.5">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {isFuelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={() => setIsFuelModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden transform transition-all my-8" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Log Fuel Entry</h3>
                <p className="text-xs text-slate-500 mt-0.5">Record odometer reading, fuel quantity, and receipt cost</p>
              </div>
              <button type="button" onClick={() => setIsFuelModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"><FiX className="w-5 h-5" /></button>
            </div>

            <div className="px-6 py-5 max-h-[calc(85vh-130px)] overflow-y-auto">
              <form onSubmit={handleFuelSubmit} className="space-y-4">
                <div className="w-full">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Select Vehicle <span className="text-rose-500">*</span></label>
                  <div className="relative rounded-xl shadow-xs"><select defaultValue="veh-001" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed appearance-none cursor-pointer border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"><option value="">Select an option</option><option value="veh-001">Hyundai Creta (KL 01 AB 1234)</option></select><div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400"><svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg></div></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Log Date <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="date" defaultValue="2026-10-24" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Odometer Reading <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="number" placeholder="e.g. 18450" defaultValue="18450" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 pr-12 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /><div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-slate-400 font-medium">km</div></div></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Fuel Quantity <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="number" step="0.01" placeholder="42.5" defaultValue="42.5" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 pr-12 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /><div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-slate-400 font-medium">L</div></div></div>
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Total Cost <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="number" step="0.01" placeholder="4496.50" defaultValue="4496.50" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 pr-12 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /><div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-slate-400 font-medium">₹</div></div></div>
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Price / Litre</label><div className="relative rounded-xl shadow-xs"><input type="number" step="0.01" placeholder="105.80" defaultValue="105.80" className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 pr-12 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /><div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-slate-400 font-medium">₹/L</div></div></div>
                </div>

                <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Fuel Station &amp; Location</label><div className="relative rounded-xl shadow-xs"><input type="text" placeholder="e.g. Indian Oil, Kowdiar, Thiruvananthapuram" defaultValue="Indian Oil Swagath, Kowdiar, Thiruvananthapuram" className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>

                <div className="flex items-center gap-2 pt-1"><input type="checkbox" id="fullTank" defaultChecked className="w-4 h-4 rounded text-[#0F9D91] focus:ring-[#0F9D91] border-slate-300" /><label htmlFor="fullTank" className="text-xs text-slate-700 font-medium cursor-pointer">Filled to Full Tank</label></div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800"><strong>Note:</strong> UI Design Review mode active. Form submissions are visual demonstrations.</div>
              </form>
            </div>

            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button type="button" onClick={() => setIsFuelModalOpen(false)} className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300 text-xs px-3 py-1.5 gap-1.5">Cancel</button>
              <button type="button" onClick={handleFuelSubmit} className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-xs px-3 py-1.5 gap-1.5">Save Fuel Log (Demo)</button>
            </div>
          </div>
        </div>
      )}

      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={() => setIsServiceModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden transform transition-all my-8" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Log Service &amp; Maintenance</h3>
                <p className="text-xs text-slate-500 mt-0.5">Record parts replaced, workshop invoices, and next service target</p>
              </div>
              <button type="button" onClick={() => setIsServiceModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"><FiX className="w-5 h-5" /></button>
            </div>

            <div className="px-6 py-5 max-h-[calc(85vh-130px)] overflow-y-auto">
              <form onSubmit={handleServiceSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Vehicle <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><select defaultValue="veh-001" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed appearance-none cursor-pointer border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"><option value="">Select an option</option><option value="veh-001">Hyundai Creta (KL 01 AB 1234)</option></select><div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400"><svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg></div></div></div>
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Service Category <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><select defaultValue="Periodic Maintenance" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed appearance-none cursor-pointer border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"><option value="">Select an option</option>{['Periodic Maintenance', 'Oil & Filter Replacement', 'Brake Inspection & Pads', 'Wheel Alignment & Balancing', 'Tire Replacement', 'Battery Service', 'AC Servicing & Cabin Filter', 'General Repair'].map((service) => <option key={service}>{service}</option>)}</select><div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400"><svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg></div></div></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Service Date <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="date" defaultValue="2026-09-12" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Odometer (km) <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="number" placeholder="e.g. 17000" defaultValue="17000" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 pr-12 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /><div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-slate-400 font-medium">km</div></div></div>
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Service Cost <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="number" step="0.01" placeholder="e.g. 5800" defaultValue="5800" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 pr-12 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /><div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-slate-400 font-medium">₹</div></div></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Authorized Service Center / Workshop <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="text" placeholder="e.g. Popular Hyundai, Kazhakkoottam, Thiruvananthapuram" defaultValue="Popular Hyundai, Kazhakkoottam, Thiruvananthapuram" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Invoice / Job Card Number</label><div className="relative rounded-xl shadow-xs"><input type="text" placeholder="e.g. POP-TRV-2026-4412" defaultValue="POP-TRV-2026-4412" className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Next Due Date (Target)</label><div className="relative rounded-xl shadow-xs"><input type="date" defaultValue="2027-09-12" className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Next Due Odometer (Target)</label><div className="relative rounded-xl shadow-xs"><input type="number" placeholder="e.g. 27000" defaultValue="27000" className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 pr-12 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /><div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-slate-400 font-medium">km</div></div></div>
                </div>

                <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Parts Replaced / Work Description</label><div className="relative rounded-xl shadow-xs"><input type="text" placeholder="e.g. Synthetic 5W30 Engine Oil, OEM Oil Filter, Cabin Filter" defaultValue="Engine Oil (Synthetic 5W30), OEM Oil Filter, Cabin Air Filter" className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800"><strong>Note:</strong> UI Design Review mode active. Form submissions are visual demonstrations.</div>
              </form>
            </div>

            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button type="button" onClick={() => setIsServiceModalOpen(false)} className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300 text-xs px-3 py-1.5 gap-1.5">Cancel</button>
              <button type="button" onClick={handleServiceSubmit} className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-xs px-3 py-1.5 gap-1.5">Save Service Log (Demo)</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
