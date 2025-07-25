import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import InvoicePrint from './InvoicePrint';
import ReactDOMServer from 'react-dom/server';
import { fetchAllPatients } from './PatientForm';

const BillList = ({ patientId, isAdmin }) => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);

  const loadBills = async () => {
    setLoading(true);
    let snap;
    if (patientId) {
      snap = await getDocs(collection(db, 'patients', patientId, 'bills'));
    } else {
      snap = await getDocs(collection(db, 'bills'));
    }
    setBills(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => { loadBills(); }, [patientId]);
  useEffect(() => { fetchAllPatients().then(setPatients); }, []);

  const handleDelete = async (billId) => {
    if (!window.confirm('Delete this bill?')) return;
    await deleteDoc(doc(db, 'bills', billId));
    if (patientId) await deleteDoc(doc(db, 'patients', patientId, 'bills', billId));
    loadBills();
  };

  const handlePrint = (bill) => {
    // Find patient info
    let patient = patients.find(p => p.id === (bill.patientId || patientId));
    if (!patient) patient = { name: '', age: '', sex: '' };
    const html = ReactDOMServer.renderToString(<InvoicePrint bill={bill} patient={patient} />);
    const printWindow = window.open('', '', 'width=900,height=1200');
    printWindow.document.write('<html><head><title>Invoice</title>');
    printWindow.document.write('<link rel="stylesheet" href="/InvoicePrint.css" />');
    printWindow.document.write('</head><body>' + html + '</body></html>');
    printWindow.document.close();
    printWindow.onload = () => printWindow.print();
  };

  return (
    <div style={{ margin: '24px 0' }}>
      <h3>Bills</h3>
      <button onClick={loadBills} style={{ marginBottom: 12 }}>Refresh</button>
      {loading ? <div>Loading...</div> : (
        <table className="kdh-table">
          <thead>
            <tr>
              <th>Treatment</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map(b => (
              <tr key={b.id}>
                <td>{b.treatment}</td>
                <td>{b.amount}</td>
                <td>{b.date}</td>
                <td>{b.notes}</td>
                <td>
                  <button onClick={() => handlePrint(b)}>Print</button>
                  {isAdmin && <button onClick={() => handleDelete(b.id)} style={{ marginLeft: 8, color: 'red' }}>Delete</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BillList; 