import React from 'react';
import BillAnalytics from './BillAnalytics';
import PatientForm from '../../components/PatientForm';
import PatientList from '../../components/PatientList';
import AppointmentForm from '../../components/AppointmentForm';
import AppointmentList from '../../components/AppointmentList';
import StaffManagement from '../../components/StaffManagement';
import AdminChangePasswordForm from '../../components/AdminChangePasswordForm';
import CampsAdmin from '../../components/CampsAdmin';
import { useAuth } from '../../App';
import '../../Dashboard.css';

const AdminDashboard = () => {
  const { logout } = useAuth();
  return (
    <div className="kdh-dashboard">
      <div className="kdh-dashboard-section">
        <h1 className="kdh-dashboard-title">Admin Dashboard</h1>
        <button onClick={() => { logout(); window.location.href = '/login/admin'; }} className="kdh-btn" style={{ float: 'right', margin: 8 }}>Logout</button>
        <div className="kdh-section">
          <h2 className="kdh-dashboard-subtitle">Add New Patient</h2>
          <PatientForm />
        </div>
        <div className="kdh-section">
          <PatientList />
        </div>
        <div className="kdh-section">
          <AppointmentList />
        </div>
        <div className="kdh-section">
          <BillAnalytics />
        </div>
        <div className="kdh-section">
          <AdminChangePasswordForm />
        </div>
        <div className="kdh-section">
          <StaffManagement />
        </div>
        <div className="kdh-section">
          <CampsAdmin />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 