import React from 'react'
import { FiFileText, FiEye, FiTrash2 } from 'react-icons/fi'

function DocumentCard() {
  const doc = {
    title: 'Comprehensive Motor Insurance',
    vehicleName: 'Hyundai Creta',
    registration: 'KL 01 AB 1234',
    policyNumber: 'POL-HDFCERGO-2024-KL01',
    issuer: 'HDFC ERGO General Insurance',
    expiryDate: '15 Feb 2027',
    daysRemaining: '108 days remaining',
    status: 'Valid',
    fileSize: '1.4 MB'
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 p-5 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E6F5F4] text-[#0F9D91] flex items-center justify-center shrink-0">
            <FiFileText className="w-5 h-5" />
          </div>
          <span className="inline-flex items-center gap-1.5 font-medium rounded-full border text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {doc.status}
          </span>
        </div>

        {/* Title & Vehicle */}
        <div className="mt-3">
          <h4 className="text-sm font-bold text-slate-900">{doc.title}</h4>
          <p className="text-xs text-slate-500 mt-0.5">{doc.vehicleName}</p>
          <p className="font-mono text-xs font-semibold text-slate-700 mt-1">{doc.registration}</p>
        </div>

        {/* Details box */}
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-400">Doc / Policy #</span>
            <span className="font-mono font-medium text-slate-700 truncate max-w-[170px]">{doc.policyNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Issuing Authority</span>
            <span className="text-slate-700 truncate max-w-[170px]">{doc.issuer}</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-slate-200/60">
            <span className="text-slate-400">Expiry Date</span>
            <strong className="text-slate-900">{doc.expiryDate}</strong>
          </div>
        </div>

        {/* Validity */}
        <div className="mt-3 text-xs">
          <span className="font-semibold text-emerald-600">{doc.daysRemaining}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-400">{doc.fileSize}</span>
        <div className="flex items-center gap-2">
          <button type="button" className="text-[#0F9D91] hover:underline font-semibold flex items-center gap-1 cursor-pointer">
            <FiEye className="w-3.5 h-3.5" /> View
          </button>
          <button type="button" className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer" title="Delete Document">
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DocumentCard
