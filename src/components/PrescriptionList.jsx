import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import PrescriptionPrint from './PrescriptionPrint';
import ReactDOMServer from 'react-dom/server';
import { fetchAllPatients } from './PatientForm';

const PrescriptionList = ({ patientId, isAdmin }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);

  const loadPrescriptions = async () => {
    setLoading(true);
    try {
      // Try to get from the root collection first
      let snap;
      if (patientId) {
        snap = await getDocs(collection(db, 'patients', patientId, 'prescriptions'));
      } else {
        snap = await getDocs(collection(db, 'prescriptions'));
      }
      setPrescriptions(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error('Error loading prescriptions:', err);
    }
    setLoading(false);
  };

  useEffect(() => { loadPrescriptions(); }, [patientId]);
  useEffect(() => { fetchAllPatients().then(setPatients); }, []);

  const handleDelete = async (prescription) => {
    if (!window.confirm('Delete this prescription?')) return;
    try {
      // Delete from both collections
      if (prescription.globalId) {
        await deleteDoc(doc(db, 'prescriptions', prescription.globalId));
      }
      if (patientId) {
        await deleteDoc(doc(db, 'patients', patientId, 'prescriptions', prescription.id));
      } else {
        await deleteDoc(doc(db, 'prescriptions', prescription.id));
      }
      loadPrescriptions();
    } catch (err) {
      console.error('Error deleting prescription:', err);
    }
  };

  const handlePrint = (prescription) => {
    // Find patient info
    let patient = patients.find(p => p.id === patientId);
    if (!patient) patient = { name: '', age: '', sex: '' };
    const html = ReactDOMServer.renderToString(<PrescriptionPrint prescription={prescription} patient={patient} />);
    const printWindow = window.open('', '', 'width=1000,height=1300');
    printWindow.document.write('<html><head><title>Prescription</title>');
    printWindow.document.write('<link rel="stylesheet" href="/PrescriptionPrint.css" />');
    printWindow.document.write('</head><body>' + html + '</body></html>');
    printWindow.document.close();
    printWindow.onload = () => printWindow.print();
  };

  return (
    <div style={{ margin: '24px 0' }}>
      <h3>Prescriptions</h3>
      <button onClick={loadPrescriptions} style={{ marginBottom: 12 }}>Refresh</button>
      {loading ? <div>Loading...</div> : (
        <table className="kdh-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Medicines</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map(p => (
              <tr key={p.id}>
                <td>{p.date || 'N/A'}</td>
                <td>
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {p.medicines && p.medicines.length > 0 ? (
                      p.medicines.map((med, idx) => (
                        <li key={idx}>
                          <strong>{med.medicine}</strong>: {med.instructions}
                        </li>
                      ))
                    ) : (
                      <li>No medicines listed</li>
                    )}
                  </ul>
                </td>
                <td>
                  <button onClick={() => handlePrint(p)}>Print</button>
                  {isAdmin && (
                    <button 
                      onClick={() => handleDelete(p)} 
                      style={{ marginLeft: 8, color: 'red' }}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PrescriptionList; 
