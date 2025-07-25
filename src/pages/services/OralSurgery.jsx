import React from 'react';
import { motion } from 'framer-motion';
import './ServicePages.css';

const OralSurgery = () => (
  <motion.div className="kdh-service-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
    {/* Hero Section */}
    <section className="kdh-service-hero">
      <img src="https://via.placeholder.com/700x220?text=Oral+Surgery" alt="Oral Surgery" className="kdh-service-hero-img" />
      <h1 className="kdh-service-title">Oral Surgery</h1>
      <p className="kdh-service-intro">Expert surgical care for complex dental needs, including wisdom teeth removal, dental implants, and corrective jaw surgery—all in a safe, comfortable environment.</p>
    </section>
    {/* Services Icons */}
    <section className="kdh-service-icons-row">
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Wisdom" alt="Wisdom Teeth" />
        <h3>Wisdom Teeth Removal</h3>
        <p>Gentle, precise extraction of impacted or problematic wisdom teeth.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Implant" alt="Dental Implants" />
        <h3>Dental Implants</h3>
        <p>Permanent tooth replacement with natural look, feel, and function.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Jaw" alt="Jaw Surgery" />
        <h3>Corrective Jaw Surgery</h3>
        <p>Surgical solutions for bite alignment, facial balance, and TMJ disorders.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Sedation" alt="Sedation" />
        <h3>Sedation Options</h3>
        <p>Relax with safe, effective sedation for a stress-free surgical experience.</p>
      </div>
    </section>
    {/* Patient Recovery Section */}
    <section className="kdh-service-patient-section">
      <img src="https://via.placeholder.com/400x180?text=Recovery" alt="Patient Recovery" className="kdh-service-patient-img" />
      <div>
        <h2>Advanced Surgical Care</h2>
        <p>Our oral surgery team uses the latest technology and techniques to ensure the best outcomes and a smooth recovery. We're here to answer your questions and support you every step of the way.</p>
      </div>
    </section>
    {/* Benefits List */}
    <section className="kdh-service-benefits">
      <h2>Why Choose Our Oral Surgery?</h2>
      <ul>
        <li>Board-certified oral surgeons</li>
        <li>State-of-the-art surgical suites</li>
        <li>Comprehensive pre- and post-op care</li>
        <li>Comfortable, modern environment</li>
        <li>Personalized treatment plans</li>
      </ul>
      <a href="/appointment" className="kdh-service-cta">Schedule a Consultation &rarr;</a>
    </section>
  </motion.div>
);

export default OralSurgery; 