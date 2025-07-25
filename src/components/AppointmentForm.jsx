import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { fetchAllPatients } from './PatientForm';

const getTimeSlots = () => {
  const slots = [];
  for (let h = 9; h < 12; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hour = h.toString().padStart(2, '0');
      const minute = m.toString().padStart(2, '0');
      slots.push(`${hour}:${minute}`);
    }
  }
  slots.push('12:00');
  for (let h = 14; h < 18; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hour = h.toString().padStart(2, '0');
      const minute = m.toString().padStart(2, '0');
      slots.push(`${hour}:${minute}`);
    }
  }
  slots.push('18:00');
  return slots;
};

const AppointmentForm = ({ onSuccess, patientId }) => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    patientId: patientId || '',
    patientName: '',
    email: '',
    date: '',
    time: '',
    services: [],
    pastMedicalHistory: '',
    pastDentalHistory: '',
  });
  
  // Update form when patient is selected
  const handlePatientChange = (e) => {
    const selectedPatientId = e.target.value;
    const selectedPatient = patients.find(p => p.id === selectedPatientId);
    
    setForm(prev => ({
      ...prev,
      patientId: selectedPatientId,
      patientName: selectedPatient?.name || '',
      email: selectedPatient?.email || ''
    }));
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    if (!patientId) fetchAllPatients().then(setPatients);
    else setForm(f => ({ ...f, patientId }));
  }, [patientId]);

  useEffect(() => {
    // Fetch booked slots for the selected date
    const fetchBookedSlots = async () => {
      if (!form.date) { setBookedSlots([]); return; }
      const q = query(collection(db, 'appointments'), where('date', '==', form.date));
      const snap = await getDocs(q);
      setBookedSlots(snap.docs.map(doc => doc.data().time));
    };
    fetchBookedSlots();
  }, [form.date]);

  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value, type, options } = e.target;
    if (name === 'services') {
      // Multi-select
      const selected = Array.from(options).filter(o => o.selected).map(o => o.value);
      setForm({ ...form, services: selected });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.date || !form.time) {
      setError('Please select both date and time');
      return;
    }
    
    if (!form.patientName) {
      setError('Please select a patient');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Prevent double-booking
    const q = query(
      collection(db, 'appointments'),
      where('date', '==', form.date),
      where('time', '==', form.time)
    );
    
    const snap = await getDocs(q);
    if (!snap.empty) {
      setError('This time slot is already booked.');
      setLoading(false);
      return;
    }
    try {
      // Call the backend API to create the appointment and send email
      const response = await fetch('http://localhost:5500/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.patientName || 'Patient', // Make sure to include patient name for the email
          email: form.email || '', // Make sure email is included
          date: form.date,
          time: form.time,
          patientId: form.patientId,
          services: form.services,
          pastMedicalHistory: form.pastMedicalHistory,
          pastDentalHistory: form.pastDentalHistory
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to book appointment');
      }

      // Add to patient subcollection with the ID from the API response
      if (form.patientId) {
        await addDoc(collection(db, 'patients', form.patientId, 'appointments'), {
          ...form,
          globalId: result.appointmentId,
        });
      }
      
      setSuccess('Appointment booked and confirmation email sent!');
      setShowPopup(true);
      setForm({ patientId: '', date: '', time: '', services: [], pastMedicalHistory: '', pastDentalHistory: '' });
      
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Failed to book appointment.');
    }
    setLoading(false);
  };

  const closePopup = () => setShowPopup(false);

  const getAvailableTimeSlots = () => {
    const slots = getTimeSlots();
    if (form.date !== new Date().toISOString().split('T')[0])
      return slots.filter(slot => !bookedSlots.includes(slot));
    // For today, filter out past slots and booked slots
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    return slots.filter(slot => {
      const [h, m] = slot.split(':');
      const slotMinutes = parseInt(h) * 60 + parseInt(m);
      return slotMinutes > currentMinutes && !bookedSlots.includes(slot);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="kdh-form">
        {!patientId && (
          <select name="patientId" value={form.patientId} onChange={handleChange} required>
            <option value="">Select Patient</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.mobile})</option>
            ))}
          </select>
        )}
        <div className="kdh-form-group">
          <label>Patient Name</label>
          <input
            type="text"
            value={form.patientName}
            onChange={(e) => setForm({ ...form, patientName: e.target.value })}
            required
            className="kdh-input"
          />
        </div>
        <div className="kdh-form-group">
          <label>Patient Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="kdh-input"
            placeholder="patient@example.com"
          />
        </div>
        <div className="kdh-form-group">
          <label>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            required
            className="kdh-input"
          />
        </div>
        <select name="time" value={form.time} onChange={handleChange} required>
          <option value="">Select Time Slot</option>
          {getAvailableTimeSlots().map(slot => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
        <select name="services" value={form.service} onChange={handleChange} required>
        <option value="">Select Services</option>
        <option value="Family Dentistry">Family Dentistry</option>
        <option value="Teeth Whitening">Teeth Whitening</option>
        <option value="Invisalign">Invisalign</option>
        <option value="Dental Implants">Dental Implants</option>
        <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
        <option value="Emergency Dental Care">Emergency Dental Care</option>
        <option value="Others">Others</option>
      </select>
      <textarea name="pastMedicalHistory" value={form.pastMedicalHistory} onChange={handleChange} placeholder="Past Medical History/If existing Patient type existing patient" required />
        <textarea name="pastDentalHistory" value={form.pastDentalHistory} onChange={handleChange} placeholder="Past Dental History/If existing Patient type existing patient" required />
        {error && <div className="kdh-error">{error}</div>}
        {success && <div className="kdh-success">{success}</div>}
        <button type="submit" disabled={loading}>{loading ? 'Booking...' : 'Book Appointment'}</button>
      </form>
      {showPopup && (
        <div className="kdh-modal-overlay">
          <div className="kdh-modal">
            <h2>Appointment Booked!</h2>
            <p>Your appointment has been successfully booked.</p>
            <button onClick={closePopup} className="kdh-btn" style={{ marginTop: 16 }}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentForm; 