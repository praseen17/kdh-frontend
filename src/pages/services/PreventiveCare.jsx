import React from 'react';
import { motion } from 'framer-motion';
import './ServicePages.css';

const PreventiveCare = () => (
  <motion.div className="kdh-service-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
    {/* Hero Section */}
    <section className="kdh-service-hero">
      <img src="https://via.placeholder.com/700x220?text=Preventive+Care" alt="Preventive Care" className="kdh-service-hero-img" />
      <h1 className="kdh-service-title">Geatric Care and Prosthodontics</h1>
      <p className="kdh-service-intro">Protect your smile for life with our comprehensive preventive care services. Early detection and regular maintenance are the keys to lasting oral health.</p>
    </section>
    {/* Services Icons */}
    <section className="kdh-service-icons-row">
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Checkup" alt="Checkups" />
        <h3>Routine Checkups</h3>
        <p>Regular exams to catch problems early and keep your teeth healthy.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Clean" alt="Cleanings" />
        <h3>Professional Cleanings</h3>
        <p>Remove plaque and tartar for a fresh, healthy mouth.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Sealant" alt="Sealants" />
        <h3>Sealants</h3>
        <p>Protective coatings for children and adults to prevent cavities.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Fluoride" alt="Fluoride" />
        <h3>Fluoride Treatments</h3>
        <p>Strengthen enamel and fight tooth decay with safe, effective fluoride.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Cancer" alt="Oral Cancer Screening" />
        <h3>Oral Cancer Screening</h3>
        <p>Early detection saves lives—routine screenings at every visit.</p>
      </div>
    </section>
    {/* Healthy Smile Section */}
    <section className="kdh-service-patient-section">
      <img src="https://via.placeholder.com/400x180?text=Healthy+Smile" alt="Healthy Smile" className="kdh-service-patient-img" />
      <div>
        <h2>Prevention is the Best Medicine</h2>
        <p>Our preventive care team partners with you to keep your smile healthy for life. We educate, motivate, and support you at every stage of your dental journey.</p>
      </div>
    </section>
    {/* Benefits List */}
    <section className="kdh-service-benefits">
      <h2>Why Choose Our Preventive Care?</h2>
      <ul>
        <li>Comprehensive exams and cleanings</li>
        <li>Personalized prevention plans</li>
        <li>Modern technology for early detection</li>
        <li>Gentle, caring team</li>
        <li>Education for lifelong oral health</li>
      </ul>
      <a href="/appointment" className="kdh-service-cta">Book a Preventive Visit &rarr;</a>
    </section>
  </motion.div>
);

export default PreventiveCare; 