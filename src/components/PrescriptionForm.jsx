import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const PrescriptionForm = ({ patientId, onSuccess }) => {
  const [medicines, setMedicines] = useState([{ medicine: '', instructions: '' }]);
  const [form, setForm] = useState({ date: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleMedicineChange = (idx, e) => {
    const newMeds = [...medicines];
    newMeds[idx][e.target.name] = e.target.value;
    setMedicines(newMeds);
  };

  const addMedicineRow = () => {
    setMedicines([...medicines, { medicine: '', instructions: '' }]);
  };

  const removeMedicineRow = (idx) => {
    if (medicines.length === 1) return;
    setMedicines(medicines.filter((_, i) => i !== idx));
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // First save to the main prescriptions collection
      const docRef = await addDoc(collection(db, 'prescriptions'), {
        medicines,
        date: form.date || new Date().toISOString().split('T')[0],
        patientId,
        createdAt: serverTimestamp()
      });

      // Then save to the patient's subcollection with the globalId
      await addDoc(collection(db, 'patients', patientId, 'prescriptions'), {
        medicines,
        date: form.date || new Date().toISOString().split('T')[0],
        globalId: docRef.id, // Add the globalId
        patientId,
        createdAt: serverTimestamp()
      });
      
      setSuccess('Prescription saved!');
      setMedicines([{ medicine: '', instructions: '' }]);
      setForm({ date: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Error saving prescription:', err);
      setError('Failed to save prescription. ' + (err.message || ''));
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="kdh-form kdh-prescription-form">
      <div className="kdh-prescription-meds-container">
        {medicines.map((m, idx) => (
          <div key={idx} className="kdh-prescription-meds-row">
            <input name="medicine" value={m.medicine} onChange={e => handleMedicineChange(idx, e)} placeholder="Medicine/dosage" required />
            <input name="instructions" value={m.instructions} onChange={e => handleMedicineChange(idx, e)} placeholder="Instructions" required />
            {medicines.length > 1 && <button type="button" onClick={() => removeMedicineRow(idx)} className="kdh-remove-btn">✕</button>}
          </div>
        ))}
      </div>
      <button type="button" onClick={addMedicineRow} className="kdh-add-btn">+ Add Medicine</button>
      <input name="date" value={form.date} onChange={handleFormChange} type="date" required />
      {error && <div className="kdh-error">{error}</div>}
      {success && <div className="kdh-success">{success}</div>}
      <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Prescription'}</button>
    </form>
  );
};

export default PrescriptionForm; 
