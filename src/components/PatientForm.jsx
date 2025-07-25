import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

const PatientForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    sex: '',
    mobile: '',
    email: '',
    complaint: '',
    medicalHistory: '',
    dentalHistory: '',
    prescriptions: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // Generate unique patient ID
      const year = new Date().getFullYear().toString();
      // Query for latest patient of this year
      const q = query(collection(db, 'patients'), where('patientId', '>=', year + '0000'), where('patientId', '<=', year + '9999'), orderBy('patientId', 'desc'), limit(1));
      const snap = await getDocs(q);
      let nextNum = '0000';
      if (!snap.empty) {
        const lastId = snap.docs[0].data().patientId;
        const lastNum = parseInt(lastId.slice(4), 10);
        nextNum = (lastNum + 1).toString().padStart(4, '0');
      }
      const patientId = year + nextNum;
      await addDoc(collection(db, 'patients'), { ...form, patientId });
      setSuccess('Patient record saved!');
      setForm({
        name: '', age: '', sex: '', mobile: '', email: '', complaint: '', medicalHistory: '', dentalHistory: '', prescriptions: '',
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Failed to save patient.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="kdh-form">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" required />
      <select name="sex" value={form.sex} onChange={handleChange} required>
        <option value="">Sex</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required/>
      <input name="complaint" value={form.complaint} onChange={handleChange} placeholder="Chief Complaint" required />
      <textarea name="medicalHistory" value={form.medicalHistory} onChange={handleChange} placeholder="Medical History" required />
      <textarea name="dentalHistory" value={form.dentalHistory} onChange={handleChange} placeholder="Past Dental History" required />
      <textarea name="prescriptions" value={form.prescriptions} onChange={handleChange} placeholder="Prescriptions Used" />
      {error && <div className="kdh-error">{error}</div>}
      {success && <div className="kdh-success">{success}</div>}
      <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Patient'}</button>
    </form>
  );
};

// Helper to fetch all patients
export async function fetchAllPatients() {
  const snapshot = await getDocs(collection(db, 'patients'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export default PatientForm; 