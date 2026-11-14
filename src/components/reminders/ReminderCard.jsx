import React from 'react'
import { FiCalendar, FiClock, FiCheck, FiEdit2, FiTrash2 } from 'react-icons/fi'

const formatDate = (value) => value
  ? new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))
  : 'No due date'

function ReminderCard({ reminder, onEdit, onDelete, onStatusUpdate, actionLoading }) {
  const isCompleted = reminder.status === 'Completed'
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const dueDate = reminder.dueDate ? new Date(reminder.dueDate) : null
  if (dueDate) dueDate.setHours(0, 0, 0, 0)
  const isOverdue = !isCompleted && dueDate && dueDate < startOfToday
  const isDueSoon = !isCompleted && dueDate && !isOverdue && dueDate <= new Date(startOfToday.getTime() + 7 * 24 * 60 * 60 * 1000)

  let borderColor = 'border-l-[#0F9D91]'
  if (isCompleted) borderColor = 'border-l-emerald-500'
  else if (isOverdue) borderColor = 'border-l-rose-500'
  else if (isDueSoon) borderColor = 'border-l-amber-500'

  let badgeClass = 'bg-[#E6F5F4] text-[#0A7067] border-[#BBE3E0]'
  let badgeLabel = 'Upcoming'

  if (isCompleted) {
    badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200'
    badgeLabel = 'Completed'
  } else if (isOverdue) {
    badgeClass = 'bg-rose-50 text-rose-700 border-rose-200'
    badgeLabel = 'Overdue'
  } else if (isDueSoon) {
    badgeClass = 'bg-amber-50 text-amber-700 border-amber-200'
    badgeLabel = 'Due Soon'
  }
  const vehicleName = reminder.vehicleId?.vehicleName || 'Vehicle'
  const registration = reminder.vehicleId?.registrationNumber

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 p-5 flex flex-col justify-between border-l-4 ${borderColor}`}>
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {reminder.reminderType}
              </span>
              {registration && (
                <>
                  <span className="text-slate-300">&bull;</span>
                  <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {registration}
                  </span>
                </>
              )}
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1.5">{reminder.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{vehicleName}</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border text-[11px] px-2 py-0.5 ${badgeClass}`}>
            {badgeLabel}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-400 mb-0.5">
              <FiCalendar className="w-3.5 h-3.5 text-[#0F9D91]" />
              <span className="text-[11px] font-medium text-slate-600">Due Date</span>
            </div>
            <p className={`font-bold ${isOverdue ? 'text-rose-600' : 'text-slate-900'}`}>
              {formatDate(reminder.dueDate)}
            </p>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-400 mb-0.5">
              <FiClock className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] font-medium text-slate-600">Odometer Milestone</span>
            </div>
            <p className="font-bold text-slate-900 font-mono">
              {reminder.dueOdometer != null
                ? `${Number(reminder.dueOdometer).toLocaleString()} km`
                : 'Not set'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 text-xs">
          <span className="text-slate-500">Priority:</span>
          <span className={`font-semibold ${reminder.priority === 'High' ? 'text-rose-600' : reminder.priority === 'Medium' ? 'text-amber-600' : 'text-slate-600'}`}>
            {reminder.priority || 'Medium'}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">Status:</span>
          <span className="font-semibold text-slate-700">{reminder.status || 'Pending'}</span>
        </div>

        {reminder.description && (
          <p className="text-xs text-slate-500 mt-3 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
            {reminder.description}
          </p>
        )}
      </div>

      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          disabled={actionLoading}
          onClick={() => onStatusUpdate(reminder)}
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50 ${isCompleted ? 'text-slate-700 bg-slate-100 hover:bg-slate-200' : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'}`}
        >
          <FiCheck className="w-3.5 h-3.5" />
          <span>{actionLoading ? 'Updating...' : isCompleted ? 'Mark Pending' : 'Mark Complete'}</span>
        </button>
        <div className="flex items-center gap-2 text-slate-400">
          <button
            type="button"
            disabled={actionLoading}
            onClick={() => onEdit(reminder)}
            className="p-1.5 hover:text-slate-700 transition-colors cursor-pointer disabled:opacity-50"
            title="Edit Reminder"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            disabled={actionLoading}
            onClick={() => onDelete(reminder)}
            className="p-1.5 hover:text-rose-600 transition-colors cursor-pointer disabled:opacity-50"
            title="Delete Reminder"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReminderCard
