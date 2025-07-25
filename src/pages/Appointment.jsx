import React, { useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import "./Appointment.css";
import * as API from "../apis/index";

const getTimeSlots = () => {
  const slots = [];
  for (let h = 9; h < 12; h++) {
    for (let m = 0; m < 60; m += 15) {
      slots.push(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
      );
    }
  }
  slots.push("12:00");
  for (let h = 14; h < 18; h++) {
    for (let m = 0; m < 60; m += 15) {
      slots.push(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
      );
    }
  }
  slots.push("18:00");
  return slots;
};

const Appointment = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    services: [], // changed from 'service' to 'services' (array)
    notes: "",
    pastMedicalHistory: "",
    pastDentalHistory: "",
  });

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  const handleDateChange = async (e) => {
    const selected = e.target.value;
    const selectedDate = new Date(selected);
    if (selectedDate.getDay() === 0) {
      setError("Appointments cannot be booked on Sundays.");
      setDate(selected); // Still show selected date
      setForm((f) => ({ ...f, date: selected }));
      setBookedSlots([]);
    } else if (selectedDate < new Date().setHours(0, 0, 0, 0)) {
      setError("Cannot book appointments for past dates.");
      setDate("");
      setForm((f) => ({ ...f, date: "" }));
      setBookedSlots([]);
    } else {
      setError("");
      setDate(selected);
      setForm((f) => ({ ...f, date: selected }));
      const q = query(
        collection(db, "appointments"),
        where("date", "==", selected)
      );
      const snap = await getDocs(q);
      setBookedSlots(snap.docs.map((doc) => doc.data().time));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, options } = e.target;
    if (name === "services") {
      // Multi-select
      const selected = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value);
      setForm({ ...form, services: selected });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (form.services.length === 0) {
      setError("Please select at least one service.");
      return;
    }
    if (!form.date || !form.time) {
      setError("Please select a valid date and time.");
      return;
    }
    if (!form.name || !form.email || !form.phone) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Option 1: Use backend API (recommended)
      const response = await API.bookAppointment(form);
      if (response && response.data) {
        alert(response.data.message || "Appointment booked successfully!");
      } else {
        throw new Error("No response from server");
      }
      
      // Reset form on success
      setShowPopup(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        services: [],
        notes: "",
        pastMedicalHistory: "",
        pastDentalHistory: "",
      });
      setDate("");
      setTime("");
    } catch (err) {
      console.error("Appointment error:", err);
      
      // Check for network errors
      if (err.code === 'ERR_NETWORK') {
        setError("Network error. Please check your internet connection and try again.");
      } else if (err.response) {
        // Server responded with error status
        setError(err.response.data?.message || "Failed to book appointment. Please try again.");
      } else {
        // Other errors
        setError(err.message || "Failed to book appointment. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => setShowPopup(false);

  const getAvailableTimeSlots = () => {
    const slots = getTimeSlots();
    if (date !== new Date().toISOString().split("T")[0])
      return slots.filter((slot) => !bookedSlots.includes(slot));

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    return slots.filter((slot) => {
      const [h, m] = slot.split(":");
      const slotMinutes = parseInt(h) * 60 + parseInt(m);
      return slotMinutes > currentMinutes && !bookedSlots.includes(slot);
    });
  };

  return (
    <motion.div
      className="kdh-appointment-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="kdh-appointment-card">
        <h2 className="kdh-heading">Book an Appointment</h2>
        <div className="kdh-banner">
          <span>
            <strong>FREE</strong> consultation on <b>3rd</b> of every month
          </span>
        </div>

        <form className="kdh-appointment-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Your Phone"
            required
          />

          <input
            type="date"
            name="date"
            min={minDate}
            value={date}
            onChange={handleDateChange}
            required
          />
          {error && error.includes("Sunday") && (
            <div className="kdh-error kdh-error-below-date">{error}</div>
          )}

          <select
            name="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              setForm((f) => ({ ...f, time: e.target.value }));
            }}
            required
          >
            <option value="">Select Time Slot</option>
            {getAvailableTimeSlots().map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>

          <select
            name="services"
            value={form.service}
            onChange={handleChange}
            required
          >
            <option value="">Select Services</option>
            <option value="Family Dentistry">Family Dentistry</option>
            <option value="Teeth Whitening">Teeth Whitening</option>
            <option value="Invisalign">Invisalign</option>
            <option value="Dental Implants">Dental Implants</option>
            <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
            <option value="Emergency Dental Care">Emergency Dental Care</option>
            <option value="Others">Others</option>
          </select>

          <textarea
            name="pastMedicalHistory"
            value={form.pastMedicalHistory}
            onChange={handleChange}
            placeholder="Past Medical History"
            required
          />
          <textarea
            name="pastDentalHistory"
            value={form.pastDentalHistory}
            onChange={handleChange}
            placeholder="Past Dental History"
            required
          />

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes (optional)"
            rows={3}
          />

          {/* Other error (e.g. time already booked) shows here */}
          {error && !error.includes("Sunday") && (
            <div className="kdh-error">{error}</div>
          )}

          <button type="submit" className="kdh-btn" disabled={loading}>
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="kdh-modal-overlay">
          <div className="kdh-modal">
            <h2>Appointment Booked!</h2>
            <p>Your appointment has been successfully booked.</p>
            <button onClick={closePopup} className="kdh-btn">
              OK
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Appointment;
