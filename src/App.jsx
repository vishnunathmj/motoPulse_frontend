import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import AuthLayout from './components/layout/AuthLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Main Application Pages
import DashboardPage from './pages/DashboardPage';
import VehiclesPage from './pages/VehiclesPage';
import VehicleDetailsPage from './pages/VehicleDetailsPage';
import FuelLogPage from './pages/FuelLogPage';
import MaintenancePage from './pages/MaintenancePage';
import RemindersPage from './pages/RemindersPage';
import DocumentsPage from './pages/DocumentsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Group */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Dashboard Group */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/:id" element={<VehicleDetailsPage />} />
          <Route path="/fuel" element={<FuelLogPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/reminders" element={<RemindersPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
