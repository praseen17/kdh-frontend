import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { fetchAllPatients } from './PatientForm';

const AppointmentList = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');

  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  const loadData = async () => {
    setLoading(true);
    try {
      let apps;
      if (patientId) {
        apps = await getDocs(collection(db, 'patients', patientId, 'appointments'));
      } else {
        apps = await getDocs(collection(db, 'appointments'));
      }
      const pats = await fetchAllPatients();
      const patientMap = {};
      pats.forEach(p => { patientMap[p.id] = p; });
      setAppointments(apps.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setPatients(patientMap);
    } catch (err) {
      console.error('Error loading appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [patientId]);

  // Filter and sort appointments
  const handleDeleteAppointment = async (appointment) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    
    try {
      setLoading(true);
      // Delete from both collections if it's a patient's appointment
      if (appointment.patientId) {
        await deleteDoc(doc(db, 'patients', appointment.patientId, 'appointments', appointment.id));
      }
      // Always delete from the main appointments collection
      await deleteDoc(doc(db, 'appointments', appointment.id));
      
      // Refresh the list
      await loadData();
    } catch (err) {
      console.error('Error deleting appointment:', err);
      alert('Failed to delete appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = appointments
    .filter(a => selectedDate ? a.date === selectedDate : true)
    .sort((a, b) => {
      // First sort by date in descending order (newest first)
      const dateComparison = new Date(b.date) - new Date(a.date);
      // If dates are the same, sort by time
      return dateComparison !== 0 ? dateComparison : (a.time || '').localeCompare(b.time || '');
    });

  return (
    <div style={{ margin: '32px 0', maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto' }}>
      <h2>All Appointments</h2>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="appt-date">Select Date: </label>
        <input
          id="appt-date"
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={loadData} style={{ marginLeft: 8 }}>Refresh</button>
      </div>
      <div style={{ overflowX: 'auto', borderRadius: 12, boxShadow: '0 2px 12px #B2222233', background: '#fff', maxHeight: 400, overflowY: 'auto' }}>
      {loading ? <div>Loading...</div> : (
        <table className="kdh-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Services</th>
              <th>Past Medical History</th>
              <th>Past Dental History</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id}>
                <td>{a.patientId ? (patients[a.patientId]?.name || 'Unknown') : (a.name || 'Unknown')}</td>
                <td>{a.patientId ? (patients[a.patientId]?.mobile || '') : (a.phone || '')}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{Array.isArray(a.services) ? a.services.join(', ') : (a.services || a.service || '')}</td>
                <td>{a.pastMedicalHistory || ''}</td>
                <td>{a.pastDentalHistory || ''}</td>
                <td>
                  <button 
                    onClick={() => handleDeleteAppointment(a)}
                    style={{
                      backgroundColor: '#ff4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                    disabled={loading}
                  >
                    {loading ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
  );
};

export default AppointmentList; 
