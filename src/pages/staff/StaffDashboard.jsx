import React from 'react';
import PatientForm from '../../components/PatientForm';
import PatientList from '../../components/PatientList';
import AppointmentList from '../../components/AppointmentList';
import { useAuth } from '../../App';
import '../../Dashboard.css';

const StaffDashboard = () => {
  const { logout } = useAuth();
  return (
    <div className="kdh-dashboard">
      <div className="kdh-dashboard-section">
        <h1 className="kdh-dashboard-title">Staff Dashboard</h1>
        <button onClick={() => { logout(); window.location.href = '/login/staff'; }} className="kdh-btn" style={{ float: 'right', margin: 8 }}>Logout</button>
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
      </div>
    </div>
  );
};

export default StaffDashboard; 