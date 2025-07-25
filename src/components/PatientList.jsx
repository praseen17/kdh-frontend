import React, { useEffect, useState } from 'react';
import { fetchAllPatients } from './PatientForm';
import PrescriptionForm from './PrescriptionForm';
import PrescriptionList from './PrescriptionList';
import BillForm from './BillForm';
import BillList from './BillList';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';

const PatientList = ({ isAdmin = false }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedBillPatient, setSelectedBillPatient] = useState(null);
  const [selectedAppointmentPatient, setSelectedAppointmentPatient] = useState(null);
  const [search, setSearch] = useState('');

  const loadPatients = async () => {
    setLoading(true);
    const data = await fetchAllPatients();
    setPatients(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const filteredPatients = patients.filter(p =>
    p.mobile?.toLowerCase().includes(search.toLowerCase()) ||
    p.patientId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ margin: '32px 0', maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto' }}>
      <h2 style={{ color: '#B22222', fontWeight: 700, fontSize: '1.4rem', marginBottom: 18 }}>All Patients</h2>
      <button onClick={loadPatients} className="kdh-btn" style={{ marginBottom: 16 }}>Refresh</button>
      <input
        type="text"
        placeholder="Search by Mobile or Patient ID"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 16, padding: 8, width: 260, borderRadius: 6, border: '1px solid #ccc' }}
      />
      <div style={{ overflowX: 'auto', borderRadius: 12, boxShadow: '0 2px 12px #B2222233', background: '#fff', maxHeight: 400, overflowY: 'auto' }}>
        {loading ? <div style={{ padding: 24 }}>Loading...</div> : (
          <table className="kdh-table" style={{ minWidth: 1000 }}>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Chief Complaint</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(p => (
                <tr key={p.id}>
                  <td>{p.patientId || ''}</td>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.sex}</td>
                  <td>{p.mobile}</td>
                  <td>{p.email}</td>
                  <td>{p.complaint}</td>
                  <td style={{ minWidth: 220 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <button className="kdh-btn" style={{ padding: '0.4rem 1rem', fontSize: '0.98rem' }} onClick={() => setSelectedPatient(p)}>Prescriptions</button>
                      <button className="kdh-btn" style={{ padding: '0.4rem 1rem', fontSize: '0.98rem' }} onClick={() => setSelectedBillPatient(p)}>Bills</button>
                      <button className="kdh-btn" style={{ padding: '0.4rem 1rem', fontSize: '0.98rem' }} onClick={() => setSelectedAppointmentPatient(p)}>Appointments</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {selectedPatient && (
        <div style={{ marginTop: 24, border: '1px solid #FFD700', borderRadius: 8, padding: 16, background: '#fff', boxShadow: '0 2px 12px #B2222233' }}>
          <h3 style={{ color: '#B22222', fontWeight: 600 }}>Prescriptions for {selectedPatient.name}</h3>
          <PrescriptionForm patientId={selectedPatient.id} onSuccess={() => {}} />
          <PrescriptionList patientId={selectedPatient.id} isAdmin={isAdmin} />
          <button onClick={() => setSelectedPatient(null)} className="kdh-btn" style={{ marginTop: 8 }}>Close</button>
        </div>
      )}
      {selectedBillPatient && (
        <div style={{ marginTop: 24, border: '1px solid #FFD700', borderRadius: 8, padding: 16, background: '#fff', boxShadow: '0 2px 12px #B2222233' }}>
          <h3 style={{ color: '#B22222', fontWeight: 600 }}>Bills for {selectedBillPatient.name}</h3>
          <BillForm patientId={selectedBillPatient.id} onSuccess={() => {}} />
          <BillList patientId={selectedBillPatient.id} isAdmin={isAdmin} />
          <button onClick={() => setSelectedBillPatient(null)} className="kdh-btn" style={{ marginTop: 8 }}>Close</button>
        </div>
      )}
      {selectedAppointmentPatient && (
        <div style={{ marginTop: 24, border: '1px solid #FFD700', borderRadius: 8, padding: 16, background: '#fff', boxShadow: '0 2px 12px #B2222233' }}>
          <h3 style={{ color: '#B22222', fontWeight: 600 }}>Appointments for {selectedAppointmentPatient.name}</h3>
          <AppointmentForm onSuccess={() => {}} patientId={selectedAppointmentPatient.id} />
          <AppointmentList patientId={selectedAppointmentPatient.id} />
          <button onClick={() => setSelectedAppointmentPatient(null)} className="kdh-btn" style={{ marginTop: 8 }}>Close</button>
        </div>
      )}
    </div>
  );
};

export default PatientList; 