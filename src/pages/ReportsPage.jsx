import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FiTrendingUp, FiDollarSign, FiPieChart } from 'react-icons/fi'
import {
  getMonthlyExpensesAPI,
  getVehicleExpensesAPI,
  getMileageReportAPI
} from '../services/allApi'

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Number(value) || 0)
}

const formatNumber = (value) => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2
  }).format(Number(value) || 0)
}

const errorMessage = (error) => {
  return error.response?.data?.message || 'Could not load report data. Please try again.'
}

export default function ReportsPage() {
  const [monthlyReport, setMonthlyReport] = useState({ fuelReport: [], maintenanceReport: [] })
  const [vehicleExpenses, setVehicleExpenses] = useState([])
  const [mileageReport, setMileageReport] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadReports = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [monthlyResponse, vehicleResponse, mileageResponse] = await Promise.all([
        getMonthlyExpensesAPI(),
        getVehicleExpensesAPI(),
        getMileageReportAPI()
      ])
      setMonthlyReport({
        fuelReport: monthlyResponse.data.fuelReport || [],
        maintenanceReport: monthlyResponse.data.maintenanceReport || []
      })
      setVehicleExpenses(vehicleResponse.data.vehicleExpenses || [])
      setMileageReport(mileageResponse.data.mileageReport || [])
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadReports()
  }, [loadReports])

  const monthlyData = useMemo(() => {
    const byMonth = new Map()

    monthlyReport.fuelReport.forEach((item) => {
      const key = `${item._id.year}-${String(item._id.month).padStart(2, '0')}`
      byMonth.set(key, {
        key,
        year: item._id.year,
        month: item._id.month,
        fuel: Number(item.totalFuelExpense) || 0,
        maintenance: 0
      })
    })

    monthlyReport.maintenanceReport.forEach((item) => {
      const key = `${item._id.year}-${String(item._id.month).padStart(2, '0')}`
      const current = byMonth.get(key) || {
        key,
        year: item._id.year,
        month: item._id.month,
        fuel: 0,
        maintenance: 0
      }
      current.maintenance = Number(item.totalMaintenanceExpense) || 0
      byMonth.set(key, current)
    })

    return [...byMonth.values()]
      .sort((a, b) => a.year - b.year || a.month - b.month)
      .map((item) => ({
        ...item,
        label: new Intl.DateTimeFormat('en', { month: 'short' }).format(
          new Date(item.year, item.month - 1, 1)
        ),
        yearLabel: item.year
      }))
  }, [monthlyReport])

  const totals = useMemo(() => {
    const fuel = monthlyReport.fuelReport.reduce(
      (sum, item) => sum + (Number(item.totalFuelExpense) || 0),
      0
    )
    const maintenance = monthlyReport.maintenanceReport.reduce(
      (sum, item) => sum + (Number(item.totalMaintenanceExpense) || 0),
      0
    )
    return { fuel, maintenance, total: fuel + maintenance }
  }, [monthlyReport])

  const maxMonthlyExpense = Math.max(
    1,
    ...monthlyData.map((item) => item.fuel + item.maintenance)
  )
  const maxCategoryExpense = Math.max(1, totals.fuel, totals.maintenance)
  const maxDistance = Math.max(
    1,
    ...mileageReport.map((item) => Number(item.totalDistance) || 0)
  )

  const stats = [
    {
      title: 'Total Running Expenses',
      value: formatCurrency(totals.total),
      icon: FiDollarSign,
      trend: 'Fuel + maintenance',
      subtitle: 'Across reported months',
      iconBg: 'bg-slate-100 text-slate-800'
    },
    {
      title: 'Total Fuel Expenses',
      value: formatCurrency(totals.fuel),
      icon: FiTrendingUp,
      trend: 'Fuel',
      subtitle: 'From monthly fuel report',
      iconBg: 'bg-[#E6F5F4] text-[#0F9D91]'
    },
    {
      title: 'Total Service Expenses',
      value: formatCurrency(totals.maintenance),
      icon: FiPieChart,
      trend: 'Maintenance',
      subtitle: 'From monthly maintenance report',
      iconBg: 'bg-purple-50 text-purple-700'
    }
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Vehicle Expense &amp; Mileage Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Expense and mileage summaries for your vehicles
          </p>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
          {error}{' '}
          <button
            type="button"
            onClick={loadReports}
            className="font-semibold underline ml-2"
          >
            Retry
          </button>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.title}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                    {loading ? 'Loading...' : error ? '—' : stat.value}
                  </p>
                </div>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${stat.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs">
                <span className="inline-flex items-center font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                  {stat.trend}
                </span>
                <span className="text-slate-500">{stat.subtitle}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 lg:col-span-7 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Fuel vs Maintenance Comparison
              </h3>
              <p className="text-xs text-slate-400">Monthly spending by calendar year</p>
            </div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
              Loading monthly expenses...
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
              Monthly report unavailable.
            </div>
          ) : monthlyData.length ? (
            <div className="min-h-64 overflow-x-auto">
              <div className="min-w-max h-64 flex items-end gap-3 px-2 border-b border-slate-200">
                {monthlyData.map((item) => (
                  <div key={item.key} className="h-full w-12 flex flex-col justify-end items-center gap-1">
                    <div className="w-full flex items-end justify-center gap-1 h-48">
                      <div
                        title={`Fuel: ${formatCurrency(item.fuel)}`}
                        className="w-4 bg-[#0F9D91] rounded-t"
                        style={{
                          height: `${item.fuel ? Math.max(3, (item.fuel / maxMonthlyExpense) * 100) : 0}%`
                        }}
                      />
                      <div
                        title={`Maintenance: ${formatCurrency(item.maintenance)}`}
                        className="w-4 bg-purple-400 rounded-t"
                        style={{
                          height: `${item.maintenance ? Math.max(3, (item.maintenance / maxMonthlyExpense) * 100) : 0}%`
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500">{item.label}</span>
                    <span className="text-[9px] text-slate-400">{item.yearLabel}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <i className="w-2.5 h-2.5 rounded-sm bg-[#0F9D91]" />Fuel
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="w-2.5 h-2.5 rounded-sm bg-purple-400" />Maintenance
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-400 font-semibold text-sm">
              No monthly expense data available.
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 lg:col-span-5 flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="text-base font-bold text-slate-900">Spending by Category</h3>
            <p className="text-xs text-slate-400">
              Fuel and maintenance totals from monthly reports
            </p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
              Loading expense totals...
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
              Expense totals unavailable.
            </div>
          ) : totals.total ? (
            <div className="h-64 flex flex-col justify-center gap-7">
              {[
                { label: 'Fuel', value: totals.fuel, color: 'bg-[#0F9D91]' },
                { label: 'Maintenance', value: totals.maintenance, color: 'bg-purple-400' }
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-700">{item.label}</span>
                    <span className="text-slate-600">{formatCurrency(item.value)}</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${(item.value / maxCategoryExpense) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-400 font-semibold text-sm">
              No expense data available.
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-900">Mileage by Vehicle</h3>
          <p className="text-xs text-slate-400">
            Distance and average mileage reported from fuel records
          </p>
        </div>
        {loading ? (
          <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
            Loading mileage report...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
            Mileage report unavailable.
          </div>
        ) : mileageReport.length ? (
          <div className="space-y-4">
            {mileageReport.map((item) => (
              <div
                key={item.vehicleId}
                className="grid grid-cols-1 sm:grid-cols-[minmax(130px,1fr)_2fr_auto] items-center gap-2 sm:gap-4"
              >
                <span className="text-xs font-semibold text-slate-700">
                  {item.vehicleName || [item.brand, item.model].filter(Boolean).join(' ') || 'Vehicle'}
                </span>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#0F9D91]"
                    style={{
                      width: `${item.totalDistance ? Math.max(2, (item.totalDistance / maxDistance) * 100) : 0}%`
                    }}
                  />
                </div>
                <span className="text-xs text-slate-600 sm:text-right">
                  {formatNumber(item.totalDistance)} km · {formatNumber(item.averageMileage)} km/L
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-400 font-semibold text-sm">
            No mileage data available.
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900">Vehicle Cost Summary</h3>
        <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
              <tr>
                {['Vehicle', 'Total Distance', 'Fuel Spend', 'Service Spend', 'Total Running Cost', 'Cost / km', 'Fuel Economy'].map((header) => (
                  <th key={header} className="py-3.5 px-4 sm:px-6">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-5 py-8 text-center text-sm text-slate-500">
                    Loading vehicle reports...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="px-5 py-8 text-center text-sm text-slate-500">
                    Vehicle report unavailable.{' '}
                    <button
                      type="button"
                      onClick={loadReports}
                      className="underline font-semibold"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              ) : vehicleExpenses.length ? (
                vehicleExpenses.map((item) => {
                  const mileage = mileageReport.find(
                    (record) => record.vehicleId === item.vehicleId
                  )

                  return (
                    <tr key={item.vehicleId} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                        <p className="font-semibold text-slate-900">
                          {item.vehicleName || [item.brand, item.model].filter(Boolean).join(' ')}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 text-xs font-mono font-medium text-slate-700 whitespace-nowrap">
                        {mileage ? `${formatNumber(mileage.totalDistance)} km` : '—'}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-800 whitespace-nowrap">
                        {formatCurrency(item.totalFuelExpense)}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-800 whitespace-nowrap">
                        {formatCurrency(item.totalMaintenanceExpense)}
                      </td>
                      <td className="px-5 py-3.5 text-xs font-bold text-slate-900 whitespace-nowrap">
                        {formatCurrency(item.totalExpenses)}
                      </td>
                      <td className="px-5 py-3.5 text-xs whitespace-nowrap text-slate-400">
                        Not provided
                      </td>
                      <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                        {mileage ? (
                          <span className="inline-flex items-center gap-1.5 font-medium rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 text-xs px-2.5 py-1">
                            {formatNumber(mileage.averageMileage)} km/L
                          </span>
                        ) : '—'}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-5 py-8 text-center text-sm text-slate-500">
                    No vehicle expense data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
