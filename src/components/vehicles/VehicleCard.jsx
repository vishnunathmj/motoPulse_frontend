import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMoreVertical, FiDroplet, FiCalendar, FiArrowRight, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import { deleteVehicleAPI, updateVehicleAPI } from '../../services/allApi'

function VehicleCard({ vehicle, onChanged, onMessage, onError }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleMenuToggle = (e) => { e.preventDefault(); setMenuOpen(!menuOpen) }
  const handleMenuClose = () => setMenuOpen(false)
  const handleEditOpen = () => { setMenuOpen(false); setError(''); setEditModalOpen(true) }
  const handleEditClose = () => setEditModalOpen(false)

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const form = new FormData(e.currentTarget)
    const brand = form.get('brand').trim()
    const model = form.get('model').trim()
    const payload = {
      brand,
      model,
      vehicleName: `${brand} ${model}`.trim(),
      manufacturingYear: Number(form.get('manufacturingYear')),
      fuelType: form.get('fuelType'),
      registrationNumber: form.get('registrationNumber').trim(),
      odometer: Number(form.get('odometer') || 0),
      averageMileage: Number(form.get('averageMileage') || 0)
    }
    try {
      const response = await updateVehicleAPI(vehicle._id, payload)
      onMessage(response.data.message || 'Vehicle updated successfully.')
      setEditModalOpen(false)
      await onChanged()
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update vehicle. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setMenuOpen(false)
    if (!window.confirm(`Delete ${vehicle.vehicleName}? This cannot be undone.`)) return
    try {
      const response = await deleteVehicleAPI(vehicle._id)
      onMessage(response.data.message || 'Vehicle deleted successfully.')
      await onChanged()
    } catch (err) {
      onError(err.response?.data?.message || 'Could not delete vehicle. Please try again.')
    }
  }

  const name = vehicle.vehicleName || `${vehicle.brand} ${vehicle.model}`

  return <>
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between relative group">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 font-medium rounded-full border text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 border-emerald-200">{vehicle.fuelType}</span>
            <span className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2 py-0.5 rounded-full">{vehicle.manufacturingYear}</span>
          </div>
          <div className="relative shrink-0">
            <button type="button" onClick={handleMenuToggle} className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"><FiMoreVertical className="w-4 h-4" /></button>
            {menuOpen && <><div className="fixed inset-0 z-20" onClick={handleMenuClose} /><div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 text-xs"><button type="button" onClick={handleEditOpen} className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 text-left"><FiEdit2 className="w-3.5 h-3.5 text-slate-400" /><span>Edit Details</span></button><button type="button" onClick={handleDelete} className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 text-left"><FiTrash2 className="w-3.5 h-3.5" /><span>Delete</span></button></div></>}
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-[#0F9D91] transition-colors">{name}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{vehicle.brand} &bull; {vehicle.model}</p>
        <div className="flex items-center justify-between gap-3 mt-3 text-xs">
          <span className="bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 font-mono font-bold text-slate-700 tracking-wider truncate">{vehicle.registrationNumber}</span>
          <span className="text-right shrink-0"><span className="text-[10px] text-slate-400 uppercase tracking-wider">Odometer </span><span className="font-bold font-mono text-slate-700">{Number(vehicle.odometer || 0).toLocaleString()} km</span></span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 text-xs"><div className="bg-slate-50 p-2.5 rounded-xl"><div className="flex items-center gap-1.5 text-slate-400 mb-1"><FiDroplet className="w-3.5 h-3.5 text-[#0F9D91]" /><span className="text-[11px] font-medium text-slate-600">Avg Economy</span></div><p className="text-sm font-bold text-slate-900">{vehicle.averageMileage ? `${vehicle.averageMileage} km/L` : '—'}</p></div><div className="bg-slate-50 p-2.5 rounded-xl"><div className="flex items-center gap-1.5 text-slate-400 mb-1"><FiCalendar className="w-3.5 h-3.5 text-amber-500" /><span className="text-[11px] font-medium text-slate-600">Manufactured</span></div><p className="text-sm font-bold text-slate-900">{vehicle.manufacturingYear}</p></div></div>
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between"><Link to={`/vehicles/${vehicle._id}`} className="text-xs font-semibold text-[#0F9D91] hover:text-[#0D887E] flex items-center gap-1.5 transition-colors"><span>View Complete Details</span><FiArrowRight className="w-3.5 h-3.5" /></Link></div>
      </div>
    </div>

    {editModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"><div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleEditClose} /><div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden my-8"><div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between"><div><h3 className="text-lg font-semibold text-slate-900">Edit Vehicle Details</h3><p className="text-xs text-slate-500 mt-0.5">Updating {name} ({vehicle.registrationNumber})</p></div><button type="button" onClick={handleEditClose} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"><FiX className="w-5 h-5" /></button></div><form onSubmit={handleEditSubmit} className="px-6 py-5 space-y-4">
      <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-semibold text-slate-700 mb-1.5">Vehicle Make</label><input name="brand" defaultValue={vehicle.brand} placeholder="Maruti Suzuki" required className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div><div><label className="block text-xs font-semibold text-slate-700 mb-1.5">Model &amp; Variant</label><input name="model" defaultValue={vehicle.model} placeholder="VDI" required className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
      <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-semibold text-slate-700 mb-1.5">Model Year</label><input name="manufacturingYear" type="number" defaultValue={vehicle.manufacturingYear} placeholder="2015" required className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div><div><label className="block text-xs font-semibold text-slate-700 mb-1.5">Fuel Type</label><select name="fuelType" defaultValue={vehicle.fuelType} className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"><option>Petrol</option><option>Diesel</option><option>Electric</option><option>CNG</option></select></div></div>
      <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-semibold text-slate-700 mb-1.5">Registration Number</label><input name="registrationNumber" defaultValue={vehicle.registrationNumber} placeholder="KL 01 AB 1234" required className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div><div><label className="block text-xs font-semibold text-slate-700 mb-1.5">Current Odometer (km)</label><input name="odometer" type="number" min="0" defaultValue={vehicle.odometer || 0} placeholder="18450" className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div></div>
      <div><label className="block text-xs font-semibold text-slate-700 mb-1.5">Average Mileage (km/L)</label><input name="averageMileage" type="number" min="0" step="0.01" defaultValue={vehicle.averageMileage || 0} className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20" /></div>
      {error && <p role="alert" className="text-sm text-rose-600">{error}</p>}
      <div className="px-6 py-3.5 -mx-6 -mb-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3"><button type="button" disabled={saving} onClick={handleEditClose} className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer">Cancel</button><button type="submit" disabled={saving} className="inline-flex items-center text-xs px-3 py-1.5 font-medium rounded-xl bg-[#0F9D91] text-white hover:bg-[#0D887E] disabled:opacity-50 cursor-pointer">{saving ? 'Saving...' : 'Save Changes'}</button></div>
    </form></div></div>}
  </>
}

export default VehicleCard
