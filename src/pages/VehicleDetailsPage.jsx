import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FiArrowLeft,
  FiDroplet,
  FiTool,
  FiFileText,
  FiEdit2,
  FiInfo,
  FiX
} from 'react-icons/fi';
import {
  getVehicleByIdAPI,
  getFuelEntriesAPI,
  getMaintenanceAPI,
  getDocumentsAPI,
  updateVehicleAPI
} from '../services/allApi';

const formatDate = (value) => {
  if (!value) return '—';

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value));
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(value) || 0);
};

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vehicleError, setVehicleError] = useState('');
  const [savingVehicle, setSavingVehicle] = useState(false);
  const [vehicleSuccess, setVehicleSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [fuelEntries, setFuelEntries] = useState([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [recordsError, setRecordsError] = useState('');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiInfo },
    { id: 'fuel', label: 'Fuel History', count: fuelEntries.length, icon: FiDroplet },
    { id: 'maintenance', label: 'Maintenance Log', count: maintenanceRecords.length, icon: FiTool },
    { id: 'documents', label: 'Compliance & Documents', count: documents.length, icon: FiFileText }
  ];

  async function handleEditSubmit(e) {
    e.preventDefault();
    setVehicleError('');
    setSavingVehicle(true);
    const form = new FormData(e.currentTarget);
    const brand = form.get('brand').trim();
    const model = form.get('model').trim();
    const payload = {
      brand,
      model,
      vehicleName: `${brand} ${model}`.trim(),
      manufacturingYear: Number(form.get('manufacturingYear')),
      fuelType: form.get('fuelType'),
      registrationNumber: form.get('registrationNumber').trim(),
      odometer: Number(form.get('odometer') || 0),
      averageMileage: Number(form.get('averageMileage') ?? vehicle.averageMileage ?? 0)
    };
    try {
      const response = await updateVehicleAPI(id, payload);
      setVehicle(response.data.vehicle);
      setVehicleSuccess(response.data.message || 'Vehicle updated successfully.');
      setIsEditModalOpen(false);
    } catch (err) {
      setVehicleError(err.response?.data?.message || 'Could not update vehicle. Please try again.');
    } finally {
      setSavingVehicle(false);
    }
  }

  const loadVehicleRecords = useCallback(async () => {
    setRecordsLoading(true);
    setRecordsError('');
    const results = await Promise.allSettled([
      getFuelEntriesAPI(),
      getMaintenanceAPI(),
      getDocumentsAPI()
    ]);
    const failed = results.find((result) => result.status === 'rejected');
    if (results[0].status === 'fulfilled') {
      setFuelEntries(
        (results[0].value.data.fuelEntries || []).filter(
          (entry) => String(entry.vehicleId?._id || entry.vehicleId) === String(id)
        )
      );
    }
    if (results[1].status === 'fulfilled') {
      setMaintenanceRecords(
        (results[1].value.data.maintenanceRecords || []).filter(
          (record) => String(record.vehicleId?._id || record.vehicleId) === String(id)
        )
      );
    }
    if (results[2].status === 'fulfilled') {
      setDocuments(
        (Array.isArray(results[2].value.data) ? results[2].value.data : []).filter(
          (item) => String(item.vehicleId?._id || item.vehicleId) === String(id)
        )
      );
    }
    if (failed) {
      setRecordsError(failed.reason.response?.data?.message || 'Could not load vehicle activity.');
    }
    setRecordsLoading(false);
  }, [id]);

  useEffect(() => {
    let active = true;
    const loadVehicle = async () => {
      setLoading(true);
      setVehicleError('');
      try {
        const response = await getVehicleByIdAPI(id);
        if (active) {
          setVehicle(response.data.vehicle);
        }
      } catch (err) {
        if (active) {
          setVehicleError(err.response?.data?.message || 'Could not load this vehicle.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    loadVehicle();
    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    loadVehicleRecords();
  }, [loadVehicleRecords]);

  const fuelSpend = fuelEntries.reduce(
    (sum, entry) => sum + (Number(entry.totalAmount) || 0),
    0
  );
  const serviceSpend = maintenanceRecords.reduce(
    (sum, record) => sum + (Number(record.totalCost) || 0),
    0
  );
  const latestService = [...maintenanceRecords].sort(
    (a, b) => new Date(b.serviceDate) - new Date(a.serviceDate)
  )[0];

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsEditModalOpen(false);
      }
    }

    if (isEditModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditModalOpen]);

  if (loading) {
    return <p className="text-sm text-slate-500 py-8 text-center">Loading vehicle...</p>;
  }

  if (vehicleError && !vehicle) {
    return (
      <div role="alert" className="text-center py-12">
        <p className="text-sm text-rose-600">{vehicleError}</p>
        <Link
          to="/vehicles"
          className="text-sm text-[#0F9D91] underline mt-3 inline-block"
        >
          Back to My Vehicles
        </Link>
      </div>
    );
  }

  if (!vehicle) return null;

  return (
    <div className="space-y-6 sm:space-y-8">
      {vehicleSuccess && (
        <p role="status" className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          {vehicleSuccess}
        </p>
      )}
      {vehicleError && (
        <p role="alert" className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
          {vehicleError}
        </p>
      )}

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
                {vehicle.vehicleName}
              </h1>
              <span className="font-mono bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-md border border-slate-300">
                {vehicle.registrationNumber}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {vehicle.manufacturingYear} &bull; {vehicle.brand} {vehicle.model} &bull; {vehicle.fuelType}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300 text-xs px-3 py-1.5 gap-1.5"
            >
              <FiEdit2 className="w-4 h-4 shrink-0" />
              Edit Specs
            </button>
            <Link
              to="/fuel"
              className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-xs px-3 py-1.5 gap-1.5"
            >
              <FiDroplet className="w-4 h-4 shrink-0" />
              Log Fuel
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-auto">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="text-[11px] text-slate-500 uppercase font-medium">Odometer</p>
            <p className="text-xl font-bold text-slate-900 mt-1 font-mono">
              {Number(vehicle.odometer || 0).toLocaleString()} km
            </p>
            <p className="text-[11px] text-slate-400 mt-1">Current reading</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="text-[11px] text-slate-500 uppercase font-medium">Avg Economy</p>
            <p className="text-xl font-bold text-[#0F9D91] mt-1">
              {vehicle.averageMileage || 0} km/L
            </p>
            <p className="text-[11px] text-emerald-600 mt-1 font-medium">Recorded average</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="text-[11px] text-slate-500 uppercase font-medium">Fuel Spend</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {recordsLoading ? '…' : formatCurrency(fuelSpend)}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">Recorded fuel expenses</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="text-[11px] text-slate-500 uppercase font-medium">Service Cost</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {recordsLoading ? '…' : formatCurrency(serviceSpend)}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">Recorded maintenance expenses</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${isActive ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${isActive ? 'bg-[#0F9D91]/15 text-[#0A7067]' : 'bg-slate-200 text-slate-600'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Vehicle Specifications
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Make & Model</span>
                <span className="font-semibold text-slate-800">{vehicle.vehicleName}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Variant</span>
                <span className="font-medium text-slate-800">{vehicle.model}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Registration Number</span>
                <span className="font-mono font-bold text-slate-900">{vehicle.registrationNumber}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Fuel Type</span>
                <span className="inline-flex items-center gap-1.5 font-medium rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 text-xs px-2.5 py-1">
                  {vehicle.fuelType}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Compliance & Maintenance Status
            </h3>
            {recordsLoading ? (
              <p className="text-xs text-slate-500">Loading vehicle records...</p>
            ) : recordsError ? (
              <p role="alert" className="text-xs text-rose-600">
                {recordsError}{' '}
                <button
                  type="button"
                  onClick={loadVehicleRecords}
                  className="underline font-semibold"
                >
                  Retry
                </button>
              </p>
            ) : (
              <div className="space-y-3.5 text-xs">
                {documents.map((item) => (
                  <div
                    key={item._id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">
                        {item.documentType} document
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Expires: {formatDate(item.expiryDate)}
                      </p>
                    </div>
                    <span className="font-medium text-slate-700">
                      {item.documentNumber || '—'}
                    </span>
                  </div>
                ))}

                {latestService && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">
                        Latest service: {latestService.serviceType}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {formatDate(latestService.serviceDate)} ·{' '}
                        {Number(latestService.odometer || 0).toLocaleString()} km
                      </p>
                    </div>
                    <span className="font-medium text-slate-700">
                      {formatCurrency(latestService.totalCost)}
                    </span>
                  </div>
                )}

                {!documents.length && !latestService && (
                  <p className="text-xs text-slate-500">
                    No compliance documents or maintenance records for this vehicle.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'fuel' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Fuel History for {vehicle.vehicleName}
            </h3>
            <Link
              to="/fuel"
              className="inline-flex items-center justify-center font-medium rounded-xl bg-[#0F9D91] hover:bg-[#0D887E] text-white text-xs px-3 py-1.5"
            >
              Add Fuel Entry
            </Link>
          </div>
          {recordsError && (
            <p role="alert" className="text-xs text-rose-600">
              {recordsError}{' '}
              <button
                type="button"
                onClick={loadVehicleRecords}
                className="underline font-semibold"
              >
                Retry
              </button>
            </p>
          )}
          <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                <tr>
                  {['Date', 'Odometer', 'Volume', 'Rate', 'Total Spend'].map((header) => (
                    <th key={header} className="py-3.5 px-4 sm:px-6">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recordsLoading ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-xs text-slate-500">
                      Loading fuel history...
                    </td>
                  </tr>
                ) : fuelEntries.length ? (
                  fuelEntries.map((entry) => (
                    <tr key={entry._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5 text-xs text-slate-700 whitespace-nowrap">
                        {formatDate(entry.fuelDate)}
                      </td>
                      <td className="px-5 py-3.5 text-xs font-mono text-slate-700 whitespace-nowrap">
                        {Number(entry.odometer || 0).toLocaleString()} km
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-700 whitespace-nowrap">
                        {entry.litres} L
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-700 whitespace-nowrap">
                        {formatCurrency(entry.pricePerLitre)}/L
                      </td>
                      <td className="px-5 py-3.5 text-xs font-bold text-slate-900 whitespace-nowrap">
                        {formatCurrency(entry.totalAmount)}
                      </td>
                    </tr>
                  ))
                ) : !recordsError ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-xs text-slate-500">
                      No fuel records for this vehicle.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'maintenance' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Maintenance Records for {vehicle.vehicleName}
            </h3>
            <Link
              to="/maintenance"
              className="inline-flex items-center justify-center font-medium rounded-xl bg-[#0F9D91] hover:bg-[#0D887E] text-white text-xs px-3 py-1.5"
            >
              Log Service
            </Link>
          </div>
          {recordsError && (
            <p role="alert" className="text-xs text-rose-600">
              {recordsError}{' '}
              <button
                type="button"
                onClick={loadVehicleRecords}
                className="underline font-semibold"
              >
                Retry
              </button>
            </p>
          )}
          <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                <tr>
                  {['Service Date', 'Service Type', 'Odometer', 'Workshop / Center', 'Cost', 'Next Due'].map((header) => (
                    <th key={header} className="py-3.5 px-4 sm:px-6">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recordsLoading ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-xs text-slate-500">
                      Loading maintenance history...
                    </td>
                  </tr>
                ) : maintenanceRecords.length ? (
                  maintenanceRecords.map((record) => (
                    <tr key={record._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5 text-xs text-slate-700 whitespace-nowrap">
                        {formatDate(record.serviceDate)}
                      </td>
                      <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                        {record.serviceType}
                      </td>
                      <td className="px-5 py-3.5 text-xs font-mono text-slate-700 whitespace-nowrap">
                        {Number(record.odometer || 0).toLocaleString()} km
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-600 whitespace-nowrap">
                        {record.serviceCenter || '—'}
                      </td>
                      <td className="px-5 py-3.5 text-xs font-bold text-slate-900 whitespace-nowrap">
                        {formatCurrency(record.totalCost)}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-700 whitespace-nowrap">
                        {formatDate(record.nextServiceDate)}
                      </td>
                    </tr>
                  ))
                ) : !recordsError ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-xs text-slate-500">
                      No maintenance records for this vehicle.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Documents for {vehicle.vehicleName}
            </h3>
            <Link to="/documents" className="text-xs font-semibold text-[#0F9D91] hover:underline">
              Manage Documents
            </Link>
          </div>
          {recordsError && (
            <p role="alert" className="text-xs text-rose-600">
              {recordsError}{' '}
              <button
                type="button"
                onClick={loadVehicleRecords}
                className="underline font-semibold"
              >
                Retry
              </button>
            </p>
          )}
          {recordsLoading ? (
            <p className="text-xs text-slate-500 py-6 text-center">
              Loading documents...
            </p>
          ) : documents.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((item) => (
                <div key={item._id} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
                  <h4 className="text-sm font-bold text-slate-900">{item.documentType}</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Document number: {item.documentNumber || '—'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Issue date: {formatDate(item.issueDate)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Expiry date: {formatDate(item.expiryDate)}
                  </p>
                </div>
              ))}
            </div>
          ) : !recordsError ? (
            <p className="text-xs text-slate-500 py-6 text-center">
              No documents for this vehicle.
            </p>
          ) : null}
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsEditModalOpen(false)}
          />
          <div
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 z-10 overflow-hidden transform transition-all my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Edit Vehicle Details</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Updating {vehicle.vehicleName} ({vehicle.registrationNumber})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-5 max-h-[calc(85vh-130px)] overflow-y-auto">
              <form id="editVehicleForm" onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Vehicle Make <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative rounded-xl shadow-xs">
                      <input
                        name="brand"
                        type="text"
                        placeholder="Maruti Suzuki"
                        defaultValue={vehicle.brand}
                        required
                        className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Model &amp; Variant <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative rounded-xl shadow-xs">
                      <input
                        name="model"
                        type="text"
                        placeholder="VDI"
                        defaultValue={vehicle.model}
                        required
                        className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Model Year <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative rounded-xl shadow-xs">
                      <input
                        name="manufacturingYear"
                        type="number"
                        placeholder="2015"
                        defaultValue={vehicle.manufacturingYear}
                        required
                        className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Fuel Type <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative rounded-xl shadow-xs">
                      <select
                        name="fuelType"
                        defaultValue={vehicle.fuelType}
                        required
                        className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed appearance-none cursor-pointer border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                      >
                        <option value="">Select an option</option>
                        {['Petrol', 'Diesel', 'Electric', 'CNG'].map((fuel) => (
                          <option key={fuel}>{fuel}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Registration Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative rounded-xl shadow-xs">
                      <input
                        name="registrationNumber"
                        type="text"
                        placeholder="e.g. KL 01 AB 1234"
                        defaultValue={vehicle.registrationNumber}
                        required
                        className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Current Odometer <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative rounded-xl shadow-xs">
                      <input
                        name="odometer"
                        type="number"
                        placeholder="e.g. 18450"
                        defaultValue={vehicle.odometer || 0}
                        required
                        className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 pr-12 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-slate-400 font-medium">
                        km
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300 text-xs px-3 py-1.5 gap-1.5"
              >
                Cancel
              </button>
              <button
                form="editVehicleForm"
                type="submit"
                disabled={savingVehicle}
                className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-xs px-3 py-1.5 gap-1.5"
              >
                {savingVehicle ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
