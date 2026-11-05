import React, { useState } from 'react'
import { FiCalendar, FiClock, FiCheck, FiEdit2, FiTrash2 } from 'react-icons/fi'

function ReminderCard() {
  const reminder = {
    title: 'PUC Certificate Renewal',
    category: 'Document Renewal',
    vehicleName: 'Hyundai Creta',
    registration: 'KL 01 AB 1234',
    dueDate: '20 Jan 2027',
    dueOdometer: 'Date Trigger',
    status: 'due-soon',
    notes: 'Mandatory Kerala RTO BS-VI pollution emission test renewal.'
  }

  const isOverdue = reminder.status === 'overdue'
  const isDueSoon = reminder.status === 'due-soon'

  let borderColor = 'border-l-[#0F9D91]'
  if (isOverdue) borderColor = 'border-l-rose-500'
  if (isDueSoon) borderColor = 'border-l-amber-500'

  let badgeClass = 'bg-[#E6F5F4] text-[#0A7067] border-[#BBE3E0]'
  if (isOverdue) badgeClass = 'bg-rose-50 text-rose-700 border-rose-200'
  if (isDueSoon) badgeClass = 'bg-amber-50 text-amber-700 border-amber-200'

  const badgeLabel = isOverdue ? 'Overdue' : isDueSoon ? 'Due Soon' : 'Upcoming'

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 p-5 flex flex-col justify-between border-l-4 ${borderColor}`}>
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {reminder.category}
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                {reminder.registration}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1.5">{reminder.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{reminder.vehicleName}</p>
          </div>

          <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border text-[11px] px-2 py-0.5 ${badgeClass}`}>
            {badgeLabel}
          </span>
        </div>

        {/* Trigger Details */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-400 mb-0.5">
              <FiCalendar className="w-3.5 h-3.5 text-[#0F9D91]" />
              <span className="text-[11px] font-medium text-slate-600">Due Date</span>
            </div>
            <p className={`font-bold ${isOverdue ? 'text-rose-600' : 'text-slate-900'}`}>
              {reminder.dueDate}
            </p>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-400 mb-0.5">
              <FiClock className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] font-medium text-slate-600">Odometer Milestone</span>
            </div>
            <p className="font-bold text-slate-900 font-mono">
              {reminder.dueOdometer}
            </p>
          </div>
        </div>

        {reminder.notes && (
          <p className="text-xs text-slate-500 mt-3 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
            {reminder.notes}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <FiCheck className="w-3.5 h-3.5" />
          <span>Mark Complete</span>
        </button>
        <div className="flex items-center gap-2 text-slate-400">
          <button type="button" className="p-1.5 hover:text-slate-700 transition-colors cursor-pointer" title="Edit Reminder">
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button type="button" className="p-1.5 hover:text-rose-600 transition-colors cursor-pointer" title="Delete Reminder">
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReminderCard
