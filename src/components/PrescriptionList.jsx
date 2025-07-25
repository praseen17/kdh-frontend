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
    const snap = await getDocs(collection(db, 'patients', patientId, 'prescriptions'));
    setPrescriptions(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => { loadPrescriptions(); }, [patientId]);
  useEffect(() => { fetchAllPatients().then(setPatients); }, []);

  const handleDelete = async (prescriptionId) => {
    if (!window.confirm('Delete this prescription?')) return;
    await deleteDoc(doc(db, 'patients', patientId, 'prescriptions', prescriptionId));
    loadPrescriptions();
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
              <th>Medicine</th>
              <th>Instructions</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map(p => (
              <tr key={p.id}>
                <td>{p.medicine}</td>
                <td>{p.instructions}</td>
                <td>{p.date}</td>
                <td>
                  <button onClick={() => handlePrint(p)}>Print</button>
                  {isAdmin && <button onClick={() => handleDelete(p.id)} style={{ marginLeft: 8, color: 'red' }}>Delete</button>}
                  {/* TODO: Add edit button for admin */}
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