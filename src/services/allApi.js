
import {
    get,
    post,
    put,
    deleteData
} from '../api/axiosServices'


// ================= AUTH APIs =================

export const registerAPI = (data) => post('/register', data)

export const loginAPI = (data) => post('/login', data)

export const getProfileAPI = () => get('/profile')


// ================= VEHICLE APIs =================

export const addVehicleAPI = (data) => post('/vehicles', data)

export const getVehiclesAPI = () => get('/vehicles')

export const getVehicleByIdAPI = (id) => get(`/vehicles/${id}`)

export const updateVehicleAPI = (id, data) => put(`/vehicles/${id}`, data)

export const deleteVehicleAPI = (id) => deleteData(`/vehicles/${id}`)


// ================= FUEL APIs =================

export const addFuelAPI = (data) => post('/fuel', data)

export const getFuelEntriesAPI = () => get('/fuel')

export const getFuelByIdAPI = (id) => get(`/fuel/${id}`)

export const updateFuelAPI = (id, data) => put(`/fuel/${id}`, data)

export const deleteFuelAPI = (id) => deleteData(`/fuel/${id}`)


// ================= MAINTENANCE APIs =================

export const addMaintenanceAPI = (data) => post('/maintenance', data)

export const getMaintenanceAPI = () => get('/maintenance')

export const getMaintenanceByIdAPI = (id) => get(`/maintenance/${id}`)

export const updateMaintenanceAPI = (id, data) => put(`/maintenance/${id}`, data)

export const deleteMaintenanceAPI = (id) => deleteData(`/maintenance/${id}`)


// ================= REMINDER APIs =================

export const addReminderAPI = (data) => post('/reminder', data)

export const getRemindersAPI = () => get('/reminder')

export const getOverdueRemindersAPI = () => get('/reminder/overdue')

export const getUpcomingRemindersAPI = () => get('/reminder/upcoming')

export const getReminderByIdAPI = (id) => get(`/reminder/${id}`)

export const updateReminderAPI = (id, data) => put(`/reminder/${id}`, data)

export const deleteReminderAPI = (id) => deleteData(`/reminder/${id}`)


// ================= DOCUMENT APIs =================

export const addDocumentAPI = (data) => post('/document', data)

export const getDocumentsAPI = () => get('/document')

export const getExpiredDocumentsAPI = () => get('/document/expired')

export const getExpiringSoonDocumentsAPI = () => get('/document/expiring-soon')

export const getDocumentByIdAPI = (id) => get(`/document/${id}`)

export const updateDocumentAPI = (id, data) => put(`/document/${id}`, data)

export const deleteDocumentAPI = (id) => deleteData(`/document/${id}`)


// ================= DASHBOARD APIs =================

export const getDashboardStatsAPI = () => get('/dashboard')

export const getRecentActivitiesAPI = () => get('/dashboard/recent-activities')


// ================= REPORT APIs =================

export const getMonthlyExpensesAPI = () => get('/reports/monthly-expenses')

export const getVehicleExpensesAPI = () => get('/reports/vehicle-expenses')

export const getMileageReportAPI = () => get('/reports/mileage')
