import React from 'react';
import { motion } from 'framer-motion';
import './ServicePages.css';

const EmergencyDentalCare = () => (
  <motion.div className="kdh-service-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
    {/* Hero Section */}
    <section className="kdh-service-hero">
      <h1 className="kdh-service-title">Pedodontics</h1>
      <p className="kdh-service-intro">Fast, compassionate care for dental emergencies. We're here when you need us most—relief is just a call away, 24/7.</p>
    </section>
    {/* Services Icons */}
    <section className="kdh-service-icons-row">
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Pain" alt="Pain Relief" />
        <h3>Pain Relief</h3>
        <p>Immediate solutions for severe toothaches and oral pain.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Trauma" alt="Dental Trauma" />
        <h3>Dental Trauma</h3>
        <p>Expert care for knocked-out, broken, or injured teeth.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Infection" alt="Infection" />
        <h3>Infection Control</h3>
        <p>Rapid treatment for abscesses, swelling, and oral infections.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Urgent" alt="Urgent Care" />
        <h3>Urgent Appointments</h3>
        <p>Same-day and after-hours appointments for urgent dental needs.</p>
      </div>
    </section>
    {/* Patient in Distress Section */}
    <section className="kdh-service-patient-section">
      <img src="https://via.placeholder.com/400x180?text=Emergency+Patient" alt="Emergency Patient" className="kdh-service-patient-img" />
      <div>
        <h2>We're Here for You</h2>
        <p>Dental emergencies can be stressful and painful. Our caring team is ready to help you feel better fast, with gentle, effective treatment and clear communication every step of the way.</p>
      </div>
    </section>
    {/* Benefits List */}
    <section className="kdh-service-benefits">
      <h2>Why Choose Our Emergency Dental Care?</h2>
      <ul>
        <li>24/7 emergency availability</li>
        <li>Experienced, compassionate team</li>
        <li>State-of-the-art technology for fast diagnosis</li>
        <li>Comfortable, modern environment</li>
        <li>Clear instructions for home care and follow-up</li>
      </ul>
      <a href="/appointment" className="kdh-service-cta">Get Emergency Help Now &rarr;</a>
    </section>
  </motion.div>
);

export default EmergencyDentalCare; 