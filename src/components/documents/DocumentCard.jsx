import React from 'react'
import { FiFileText, FiEye, FiTrash2 } from 'react-icons/fi'

const documentLabels = {
  RC: 'Registration (RC)',
  Insurance: 'Insurance Policy',
  PUC: 'PUC Certificate',
  Other: 'Other'
}

const formatDate = (value) => {
  if (!value) return '—'

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value))
}

function DocumentCard({ document, onView, onDelete, actionLoading }) {
  const expiry = document.expiryDate ? new Date(document.expiryDate) : null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiryDay = expiry ? new Date(expiry) : null
  if (expiryDay) expiryDay.setHours(0, 0, 0, 0)
  const daysRemaining = expiryDay ? Math.ceil((expiryDay - today) / 86400000) : null
  let status = 'Valid'
  if (daysRemaining === null) status = 'No expiry date'
  else if (daysRemaining < 0) status = 'Expired'
  else if (daysRemaining <= 30) status = 'Expiring soon'

  let badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200'
  let statusDot = 'bg-emerald-500'
  if (status === 'Expired') {
    badgeClass = 'bg-rose-50 text-rose-700 border-rose-200'
    statusDot = 'bg-rose-500'
  } else if (status === 'Expiring soon') {
    badgeClass = 'bg-amber-50 text-amber-700 border-amber-200'
    statusDot = 'bg-amber-500'
  }
  const vehicle = document.vehicleId || {}

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E6F5F4] text-[#0F9D91] flex items-center justify-center shrink-0">
            <FiFileText className="w-5 h-5" />
          </div>
          <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border text-xs px-2.5 py-1 ${badgeClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
            {status}
          </span>
        </div>
        <div className="mt-3">
          <h4 className="text-sm font-bold text-slate-900">
            {documentLabels[document.documentType] || document.documentType}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            {vehicle.vehicleName || [vehicle.brand, vehicle.model].filter(Boolean).join(' ') || 'Vehicle'}
          </p>
          <p className="font-mono text-xs font-semibold text-slate-700 mt-1">{vehicle.registrationNumber || '—'}</p>
        </div>
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
          <div className="flex justify-between gap-2">
            <span className="text-slate-400">Doc / Policy #</span>
            <span className="font-mono font-medium text-slate-700 truncate max-w-[170px]">
              {document.documentNumber || '—'}
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-slate-400">Issue Date</span>
            <span className="text-slate-700">{formatDate(document.issueDate)}</span>
          </div>
          <div className="flex justify-between gap-2 pt-1 border-t border-slate-200/60">
            <span className="text-slate-400">Expiry Date</span>
            <strong className="text-slate-900">{formatDate(document.expiryDate)}</strong>
          </div>
        </div>
        <div className="mt-3 text-xs">
          <span className={`font-semibold ${status === 'Expired' ? 'text-rose-600' : status === 'Expiring soon' ? 'text-amber-600' : 'text-emerald-600'}`}>
            {daysRemaining === null
              ? 'Expiry date unavailable'
              : daysRemaining < 0
                ? `Expired ${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) === 1 ? '' : 's'} ago`
                : daysRemaining === 0
                  ? 'Expires today'
                  : `${daysRemaining} day${daysRemaining === 1 ? '' : 's'} remaining`}
          </span>
        </div>
      </div>
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-400">{document.notes || 'Document record'}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onView(document)}
            disabled={actionLoading}
            className="text-[#0F9D91] hover:underline font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            <FiEye className="w-3.5 h-3.5" /> View
          </button>
          <button
            type="button"
            onClick={() => onDelete(document)}
            disabled={actionLoading}
            className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer disabled:opacity-50"
            title="Delete Document"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DocumentCard
