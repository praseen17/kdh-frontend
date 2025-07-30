import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const BillForm = ({ onSuccess, patientId }) => {
  const [treatments, setTreatments] = useState([{ treatment: '', amount: '' }]);
  const [form, setForm] = useState({ date: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTreatmentChange = (idx, e) => {
    const newTreatments = [...treatments];
    newTreatments[idx][e.target.name] = e.target.value;
    setTreatments(newTreatments);
  };

  const addTreatmentRow = () => {
    setTreatments([...treatments, { treatment: '', amount: '' }]);
  };

  const removeTreatmentRow = (idx) => {
    if (treatments.length === 1) return;
    setTreatments(treatments.filter((_, i) => i !== idx));
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = treatments.reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const billData = {
        treatments,
        total,
        date: form.date || new Date().toISOString().split('T')[0],
        notes: form.notes,
        patientId,
        status: 'unpaid',
        createdAt: serverTimestamp()
      };
      
      // First save to the main bills collection
      const docRef = await addDoc(collection(db, 'bills'), billData);
      
      // Then save to the patient's subcollection with the globalId
      await addDoc(collection(db, 'patients', patientId, 'bills'), {
        ...billData,
        globalId: docRef.id,
      });
      setSuccess('Bill saved!');
      setTreatments([{ treatment: '', amount: '' }]);
      setForm({ date: '', notes: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Failed to save bill.');
    }
    setLoading(false);
  };

  if (!patientId) return <div style={{ color: 'red' }}>No patient selected for billing.</div>;

  return (
    <form onSubmit={handleSubmit} className="kdh-form">
      {treatments.map((t, idx) => (
        <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <input name="treatment" value={t.treatment} onChange={e => handleTreatmentChange(idx, e)} placeholder="Treatment" required style={{ flex: 2 }} />
          <input name="amount" value={t.amount} onChange={e => handleTreatmentChange(idx, e)} placeholder="Amount" type="number" required style={{ flex: 1 }} />
          {treatments.length > 1 && <button type="button" onClick={() => removeTreatmentRow(idx)} style={{ color: 'red' }}>✕</button>}
        </div>
      ))}
      <button type="button" onClick={addTreatmentRow} style={{ marginBottom: 12 }}>+ Add Treatment</button>
      <input name="date" value={form.date} onChange={handleFormChange} type="date" required />
      <textarea name="notes" value={form.notes} onChange={handleFormChange} placeholder="Notes (optional)" />
      <div style={{ fontWeight: 700, margin: '8px 0' }}>Total: ₹ {total}</div>
      {error && <div className="kdh-error">{error}</div>}
      {success && <div className="kdh-success">{success}</div>}
      <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Bill'}</button>
    </form>
  );
};

export default BillForm; 
