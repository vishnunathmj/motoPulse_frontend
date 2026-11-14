import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FiPlus, FiSearch, FiTruck } from 'react-icons/fi'
import VehicleCard from '../components/vehicles/VehicleCard'
import { addVehicleAPI, getVehiclesAPI } from '../services/allApi'

const emptyVehicle = {
  brand: '',
  model: '',
  manufacturingYear: '',
  fuelType: 'Petrol',
  registrationNumber: '',
  odometer: ''
}

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [fuelFilter, setFuelFilter] = useState('All')
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [formValues, setFormValues] = useState(emptyVehicle)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const loadVehicles = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await getVehiclesAPI()
      setVehicles(response.data.vehicles || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load vehicles. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadVehicles()
  }, [loadVehicles])

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const query = searchTerm.trim().toLowerCase()
      const searchableValues = [
        vehicle.vehicleName,
        vehicle.brand,
        vehicle.model,
        vehicle.registrationNumber
      ]
      const matchesQuery = !query || searchableValues.some(
        (value) => value?.toLowerCase().includes(query)
      )
      const matchesFuel = fuelFilter === 'All' || vehicle.fuelType === fuelFilter

      return matchesQuery && matchesFuel
    })
  }, [vehicles, searchTerm, fuelFilter])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setFuelFilter('All')
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)
    const payload = {
      ...formValues,
      vehicleName: `${formValues.brand.trim()} ${formValues.model.trim()}`.trim(),
      manufacturingYear: Number(formValues.manufacturingYear),
      odometer: Number(formValues.odometer || 0)
    }
    try {
      const response = await addVehicleAPI(payload)
      setSuccess(response.data.message || 'Vehicle added successfully.')
      setAddModalOpen(false)
      setFormValues(emptyVehicle)
      await loadVehicles()
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add vehicle. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const updateFormValue = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            My Vehicles
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Your registered personal vehicles, service targets, and odometer tracking
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setError('')
            setAddModalOpen(true)
          }}
          className="inline-flex items-center gap-2 text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm transition-all cursor-pointer"
        >
          <FiPlus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>

      {success && (
        <p role="status" className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          {success}
        </p>
      )}
      {error && !addModalOpen && (
        <p role="alert" className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
          {error}{' '}
          <button
            type="button"
            onClick={loadVehicles}
            className="font-semibold underline ml-2"
          >
            Retry
          </button>
        </p>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <FiSearch className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search make, model, or registration number (e.g. KL 01 AB 1234)..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F9D91] focus:ring-1 focus:ring-[#0F9D91]"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Petrol', 'Diesel', 'Electric'].map((fuel) => (
            <button
              key={fuel}
              type="button"
              onClick={() => setFuelFilter(fuel)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${fuelFilter === fuel ? 'bg-[#0F9D91] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {fuel}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500 py-8 text-center">Loading vehicles...</p>
      ) : filteredVehicles.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle._id}
              vehicle={vehicle}
              onChanged={loadVehicles}
              onMessage={setSuccess}
              onError={setError}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs py-12 sm:py-16 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
            <FiTruck className="w-7 h-7" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            {vehicles.length ? 'No vehicles found' : 'No vehicles yet'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1 mb-6 leading-relaxed">
            {vehicles.length
              ? `No vehicles matched your search "${searchTerm || fuelFilter}". Try different filters.`
              : 'Add your first vehicle to begin tracking it.'}
          </p>
          {vehicles.length > 0 ? (
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E] cursor-pointer"
            >
              Clear Filters
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setAddModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E] cursor-pointer"
            >
              <FiPlus /> Add Vehicle
            </button>
          )}
        </div>
      )}

      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => !saving && setAddModalOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Add New Vehicle</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter specifications and registration details for your personal vehicle
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
              >
                <span className="text-lg leading-none">&times;</span>
              </button>
            </div>

            <form
              id="addVehicleForm"
              onSubmit={handleAddSubmit}
              className="px-6 py-5 max-h-[calc(85vh-130px)] overflow-y-auto space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Vehicle Make
                  </label>
                  <input
                    name="brand"
                    value={formValues.brand}
                    onChange={updateFormValue}
                    required
                    type="text"
                    placeholder="Maruti Suzuki"
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Model &amp; Variant
                  </label>
                  <input
                    name="model"
                    value={formValues.model}
                    onChange={updateFormValue}
                    required
                    type="text"
                    placeholder="VDI"
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Model Year
                  </label>
                  <input
                    name="manufacturingYear"
                    value={formValues.manufacturingYear}
                    onChange={updateFormValue}
                    required
                    type="number"
                    placeholder="2015"
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Fuel Type
                  </label>
                  <select
                    name="fuelType"
                    value={formValues.fuelType}
                    onChange={updateFormValue}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  >
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Electric</option>
                    <option>CNG</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Body Type
                  </label>
                  <select
                    defaultValue="SUV"
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  >
                    <option>SUV</option>
                    <option>Sedan</option>
                    <option>Hatchback</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Registration Number
                  </label>
                  <input
                    name="registrationNumber"
                    value={formValues.registrationNumber}
                    onChange={updateFormValue}
                    required
                    type="text"
                    placeholder="e.g. KL 01 AB 1234"
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Current Odometer (km)
                  </label>
                  <input
                    name="odometer"
                    value={formValues.odometer}
                    onChange={updateFormValue}
                    type="number"
                    min="0"
                    placeholder="e.g. 18450"
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                  />
                </div>
              </div>

              {error && (
                <p role="alert" className="text-sm text-rose-600">
                  {error}
                </p>
              )}

              <div className="px-6 py-3.5 -mx-6 -mb-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setAddModalOpen(false)}
                  className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E] disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Adding...' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default VehiclesPage
