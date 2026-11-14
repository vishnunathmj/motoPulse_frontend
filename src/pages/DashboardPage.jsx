import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiTruck, FiDroplet, FiBell, FiPlus,
  FiClock, FiTool, FiActivity
} from 'react-icons/fi'
import { getDashboardStatsAPI, getRecentActivitiesAPI } from '../services/allApi'

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount || 0)
}

const formatDate = (value) => {
  if (!value) return 'Date unavailable'

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value))
}

function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [activities, setActivities] = useState(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [activitiesLoading, setActivitiesLoading] = useState(true)
  const [statsError, setStatsError] = useState('')
  const [activitiesError, setActivitiesError] = useState('')

  const loadDashboard = async () => {
    setStatsLoading(true)
    setActivitiesLoading(true)
    setStatsError('')
    setActivitiesError('')
    const results = await Promise.allSettled([
      getDashboardStatsAPI(),
      getRecentActivitiesAPI()
    ])
    const statsResult = results[0]
    const activitiesResult = results[1]

    if (statsResult.status === 'fulfilled') {
      setStats(statsResult.value.data)
    } else {
      setStatsError(statsResult.reason.response?.data?.message || 'Could not load dashboard statistics.')
    }

    if (activitiesResult.status === 'fulfilled') {
      setActivities(activitiesResult.value.data)
    } else {
      setActivitiesError(activitiesResult.reason.response?.data?.message || 'Could not load recent activity.')
    }

    setStatsLoading(false)
    setActivitiesLoading(false)
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  const upcomingReminders = stats?.upcomingReminders || []
  const expiringDocuments = stats?.expiringDocuments || []
  const recentItems = useMemo(() => {
    const fuelEntries = (activities?.recentFuelEntries || []).map((entry) => ({
      ...entry,
      activityType: 'fuel',
      date: entry.fuelDate
    }))
    const maintenanceRecords = (activities?.recentMaintenanceRecords || []).map((entry) => ({
      ...entry,
      activityType: 'maintenance',
      date: entry.serviceDate
    }))

    return [...fuelEntries, ...maintenanceRecords]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
  }, [activities])
  const primaryVehicle = upcomingReminders[0]?.vehicleId
  const vehicle = {
    name: primaryVehicle?.vehicleName || 'your vehicle',
    registration: primaryVehicle?.registrationNumber || '',
    year: primaryVehicle?.manufacturingYear || '',
    fuelType: primaryVehicle?.fuelType || ''
  }

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Page Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Your Vehicle Overview</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tracking vehicles, expenses, reminders, and recent activity for your account
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <Link
            to="/vehicles"
            className="inline-flex items-center gap-2 text-xs px-3 py-1.5 font-medium rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all duration-150 cursor-pointer"
          >
            <FiPlus className="w-4 h-4" /> Add Vehicle
          </Link>
          <Link
            to="/fuel"
            className="inline-flex items-center gap-2 text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm transition-all duration-150 cursor-pointer"
          >
            <FiDroplet className="w-4 h-4" /> Quick Log Fuel
          </Link>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                Vehicle in Garage
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                {statsLoading
                  ? '…'
                  : statsError
                    ? '—'
                    : `${stats?.totalVehicles ?? 0} ${(stats?.totalVehicles ?? 0) === 1 ? 'Vehicle' : 'Vehicles'}`}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-slate-100 text-slate-800">
              <FiTruck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs">
            <span className="text-slate-500">Registered vehicles in your account</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                Total Fuel Expenses
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                {statsLoading
                  ? '…'
                  : statsError
                    ? '—'
                    : formatCurrency(stats?.totalFuelExpense)}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[#E6F5F4] text-[#0F9D91]">
              <FiDroplet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs">
            <span className="text-slate-500">Lifetime total from recorded fuel entries</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                Total Maintenance Expenses
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                {statsLoading
                  ? '…'
                  : statsError
                    ? '—'
                    : formatCurrency(stats?.totalMaintenanceExpense)}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-purple-50 text-purple-700">
              <FiTool className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs">
            <span className="text-slate-500">Lifetime total from service records</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                Total Expenses
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                {statsLoading
                  ? '…'
                  : statsError
                    ? '—'
                    : formatCurrency(stats?.totalExpenses)}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-amber-50 text-amber-600">
              <FiActivity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs">
            <span className="text-slate-500">Fuel and maintenance combined</span>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Upcoming Maintenance */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Upcoming Reminders</h3>
              <p className="text-xs text-slate-400">
                {statsLoading
                  ? 'Loading upcoming reminders…'
                  : `${upcomingReminders.length} upcoming reminders`}
              </p>
            </div>
            <Link
              to="/reminders"
              className="text-xs font-semibold text-[#0F9D91] hover:underline"
            >
              View All ({upcomingReminders.length})
            </Link>
          </div>
          {statsLoading ? (
            <p className="text-xs text-slate-500 py-4">Loading reminders...</p>
          ) : statsError ? (
            <p className="text-xs text-rose-600 py-4">
              {statsError}{' '}
              <button
                type="button"
                onClick={loadDashboard}
                className="underline font-semibold"
              >
                Retry
              </button>
            </p>
          ) : upcomingReminders.length === 0 ? (
            <p className="text-xs text-slate-500 py-4">No upcoming reminders.</p>
          ) : (
            upcomingReminders.map((reminder) => (
              <div
                key={reminder._id}
                className="p-3.5 mb-2 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-amber-100 text-amber-600">
                    <FiClock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {reminder.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {reminder.vehicleId?.vehicleName || 'Vehicle'} &bull; Due:{' '}
                      <span className="font-medium text-slate-700">
                        {formatDate(reminder.dueDate)}
                      </span>
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 font-medium rounded-full border text-[11px] px-2 py-0.5 bg-amber-50 text-amber-700 border-amber-200">
                  {reminder.priority || reminder.status}
                </span>
              </div>
            ))
          )}
          {!statsLoading && !statsError && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 mb-2">
                Expiring Documents ({expiringDocuments.length})
              </h4>
              {expiringDocuments.length ? (
                expiringDocuments.map((document) => (
                  <p key={document._id} className="text-xs text-slate-600 py-1">
                    {document.documentType} · {document.vehicleId?.vehicleName || 'Vehicle'} ·
                    {' '}Expires {formatDate(document.expiryDate)}
                  </p>
                ))
              ) : (
                <p className="text-xs text-slate-500">
                  No documents expiring in the next 30 days.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Recent Vehicle Activity */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Vehicle Activity</h3>
              <p className="text-xs text-slate-400">Latest fuel and maintenance records</p>
            </div>
            <Link
              to="/maintenance"
              className="inline-flex items-center gap-2 text-xs px-3 py-1.5 font-medium rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <FiTool className="w-4 h-4" /> Log Service
            </Link>
          </div>
          {activitiesLoading ? (
            <p className="text-xs text-slate-500 py-4">Loading recent activity...</p>
          ) : activitiesError ? (
            <p className="text-xs text-rose-600 py-4">
              {activitiesError}{' '}
              <button
                type="button"
                onClick={loadDashboard}
                className="underline font-semibold"
              >
                Retry
              </button>
            </p>
          ) : recentItems.length === 0 ? (
            <p className="text-xs text-slate-500 py-4">
              No recent fuel or maintenance activity.
            </p>
          ) : (
            <div className="space-y-3">
              {recentItems.map((item) => {
                const isFuel = item.activityType === 'fuel'
                const activityName = item.vehicleId?.vehicleName || 'Vehicle'

                return (
                  <div
                    key={`${item.activityType}-${item._id}`}
                    className="flex items-center justify-between text-xs pb-3 border-b border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${isFuel ? 'bg-[#E6F5F4] text-[#0F9D91]' : 'bg-amber-50 text-amber-600'}`}>
                        {isFuel
                          ? <FiDroplet className="w-4 h-4" />
                          : <FiTool className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {isFuel ? 'Fuel Refill' : item.serviceType} &bull; {activityName}
                        </p>
                        <p className="text-slate-400">
                          {isFuel
                            ? `${item.litres} L @ ${formatCurrency(item.pricePerLitre)}/L`
                            : item.serviceCenter || item.description || 'Maintenance record'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-slate-900">
                        {formatCurrency(isFuel ? item.totalAmount : item.totalCost)}
                      </p>
                      <p className="text-slate-400">{formatDate(item.date)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>

    </div>
  )
}

export default DashboardPage
