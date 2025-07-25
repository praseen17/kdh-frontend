import React from 'react';
import { motion } from 'framer-motion';
import './ServicePages.css';

const Invisalign = () => (
  <motion.div className="kdh-service-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
    {/* Hero Section */}
    <section className="kdh-service-hero">
      <h1 className="kdh-service-title">Periodontics</h1>
      <p className="kdh-service-intro">Straighten your teeth discreetly and comfortably with Invisalign clear aligners. Enjoy a nearly invisible orthodontic solution tailored to your lifestyle.</p>
    </section>
    {/* Services Icons */}
    <section className="kdh-service-icons-row">
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Aligner" alt="Clear Aligners" />
        <h3>Clear Aligners</h3>
        <p>Custom-made trays that gently move your teeth into perfect alignment.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Scan" alt="Digital Scans" />
        <h3>Digital Scans</h3>
        <p>Comfortable, precise 3D scans—no messy impressions needed.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Comfort" alt="Comfort" />
        <h3>Comfort & Convenience</h3>
        <p>Removable trays for easy eating, brushing, and flossing—no food restrictions.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Teen" alt="For All Ages" />
        <h3>For Teens & Adults</h3>
        <p>Invisalign is a great choice for both teens and adults seeking a discreet solution.</p>
      </div>
    </section>
    {/* Patient Section */}
    <section className="kdh-service-patient-section">
      <img src="https://via.placeholder.com/400x180?text=Patient+Smiling" alt="Invisalign Patient" className="kdh-service-patient-img" />
      <div>
        <h2>Discreet Orthodontics</h2>
        <p>Our orthodontic team will guide you through every step, from your first scan to your final smile. Invisalign is comfortable, effective, and fits seamlessly into your daily life.</p>
      </div>
    </section>
    {/* Benefits List */}
    <section className="kdh-service-benefits">
      <h2>Why Choose Invisalign?</h2>
      <ul>
        <li>Virtually invisible treatment</li>
        <li>Removable for meals and cleaning</li>
        <li>Fewer office visits needed</li>
        <li>Comfortable, custom fit</li>
        <li>Great for busy lifestyles</li>
      </ul>
      <a href="/appointment" className="kdh-service-cta">Start Your Invisalign Journey &rarr;</a>
    </section>
  </motion.div>
);

export default Invisalign; 