import React, { useEffect, useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import DocumentCard from '../components/documents/DocumentCard';
export default function DocumentsPage() {
  const [selectedType, setSelectedType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const matchesType = selectedType === 'All' || selectedType === 'Insurance Policy';

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleCloseModal();
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') handleCloseModal();
    }

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Vehicle Documents &amp; Compliance</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage motor insurance policies, Kerala PUC certificates, and registration records for Hyundai Creta (KL 01 AB 1234)</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button type="button" onClick={() => setIsModalOpen(true)} className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-xs px-3 py-1.5 gap-1.5">
            <FiPlus className="w-4 h-4 shrink-0" />Add Document Record
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-600">Vehicle:</label>
            <span className="text-xs sm:text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              Hyundai Creta (KL 01 AB 1234)
            </span>
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs sm:text-sm rounded-xl border border-slate-200 px-3 py-1.5 bg-white text-slate-800 focus:outline-none focus:border-[#0F9D91]"
          >
            <option value="All">All Document Types</option>
            <option value="Insurance Policy">Insurance Policy</option>
            <option value="PUC Certificate">PUC Certificate</option>
            <option value="Registration (RC)">Registration (RC)</option>
            <option value="Road Tax Receipt">Road Tax Receipt</option>
          </select>
        </div>

        <div className="text-xs text-slate-500">
          Showing <span className="font-semibold text-slate-800">{matchesType ? 1 : 0}</span> compliance documents
        </div>
      </div>

      {/* Documents Grid - Uses reusable DocumentCard component */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {matchesType && (
          <>
            {/* FUTURE BACKEND: Load compliance documents from the backend API. */}
            {/* DUPLICATE CARD: Reuse DocumentCard when additional documents are loaded from the backend. */}
            <DocumentCard
            />
          </>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={handleCloseModal} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden transform transition-all my-8" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Upload Vehicle Document Record</h3>
                <p className="text-xs text-slate-500 mt-0.5">Track insurance policies, PUC emission certificates, RC, and road tax records</p>
              </div>
              <button type="button" onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-5 max-h-[calc(85vh-130px)] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="w-full">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Target Vehicle <span className="text-rose-500">*</span></label>
                  <div className="relative rounded-xl shadow-xs">
                    <select defaultValue="veh-001" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed appearance-none cursor-pointer border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20">
                      <option value="">Select an option</option><option value="veh-001">Hyundai Creta (KL 01 AB 1234)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400"><svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Document Category <span className="text-rose-500">*</span></label>
                    <div className="relative rounded-xl shadow-xs">
                      <select defaultValue="Insurance Policy" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed appearance-none cursor-pointer border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20">
                        <option value="">Select an option</option><option>Insurance Policy</option><option>PUC Certificate</option><option>Registration (RC)</option><option>Road Tax Receipt</option><option>Fitness Certificate</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400"><svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg></div>
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Document / Policy Number <span className="text-rose-500">*</span></label>
                    <div className="relative rounded-xl shadow-xs"><input type="text" placeholder="e.g. POL-HDFCERGO-2024-KL01" defaultValue="POL-HDFCERGO-2024-KL01" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div>
                  </div>
                </div>

                <div className="w-full">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Issuing Authority / Insurance Company <span className="text-rose-500">*</span></label>
                  <div className="relative rounded-xl shadow-xs"><input type="text" placeholder="e.g. HDFC ERGO General Insurance" defaultValue="HDFC ERGO General Insurance" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Issue Date <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="date" defaultValue="2024-02-16" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
                  <div className="w-full"><label className="block text-xs font-semibold text-slate-700 mb-1.5">Expiry Date <span className="text-rose-500">*</span></label><div className="relative rounded-xl shadow-xs"><input type="date" defaultValue="2027-02-15" required className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
                </div>

                <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50">
                  <p className="text-xs font-semibold text-slate-700">Digital Copy Attachment (Placeholder)</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">PDF, PNG, JPG up to 10MB (Backend storage in Stage 2)</p>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800"><strong>Note:</strong> UI Design Review mode active. Form submissions are visual demonstrations.</div>
              </form>
            </div>

            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button type="button" onClick={handleCloseModal} className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300 text-xs px-3 py-1.5 gap-1.5">Cancel</button>
              <button type="button" onClick={handleSubmit} className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-xs px-3 py-1.5 gap-1.5">Save Document Record (Demo)</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
