import React from 'react';
import { motion } from 'framer-motion';
import './ServicePages.css';

const CosmeticDentistry = () => (
  <motion.div className="kdh-service-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
    {/* Hero Section */}
    <section className="kdh-service-hero">  
      <h1 className="kdh-service-title">Cosmetic Dentistry and Orthodontics</h1>
      <p className="kdh-service-intro">Transform your smile with advanced cosmetic dental treatments. We offer personalized solutions to help you achieve the confident, beautiful smile you deserve.</p>
    </section>
    {/* Services Icons */}
    <section className="kdh-service-icons-row">
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Veneer" alt="Veneers" />
        <h3>Porcelain Veneers</h3>
        <p>Custom-crafted veneers to correct chips, gaps, and discoloration for a flawless look.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Whiten" alt="Whitening" />
        <h3>Teeth Whitening</h3>
        <p>Professional whitening for a dramatically brighter, whiter smile in just one visit.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Bond" alt="Bonding" />
        <h3>Dental Bonding</h3>
        <p>Quick, affordable repairs for minor chips, cracks, and gaps using tooth-colored resin.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Smile" alt="Smile Makeover" />
        <h3>Smile Makeovers</h3>
        <p>Comprehensive treatment plans to completely rejuvenate your smile and boost your confidence.</p>
      </div>
    </section>
    {/* Before/After Section */}
    <section className="kdh-service-beforeafter-section">
      <img src="https://via.placeholder.com/320x180?text=Before" alt="Before Smile" className="kdh-service-before-img" />
      <img src="https://via.placeholder.com/320x180?text=After" alt="After Smile" className="kdh-service-after-img" />
      <div>
        <h2>Smile With Confidence</h2>
        <p>Our cosmetic dentistry team uses the latest techniques and materials to deliver natural-looking, long-lasting results. See the difference a beautiful smile can make in your life!</p>
      </div>
    </section>
    {/* Benefits List */}
    <section className="kdh-service-benefits">
      <h2>Why Choose Our Cosmetic Dentistry?</h2>
      <ul>
        <li>Personalized smile design for every patient</li>
        <li>Minimally invasive, comfortable procedures</li>
        <li>State-of-the-art technology and materials</li>
        <li>Experienced cosmetic dental team</li>
        <li>Results that look and feel natural</li>
      </ul>
      <a href="/appointment" className="kdh-service-cta">Start Your Smile Makeover &rarr;</a>
    </section>
  </motion.div>
);

export default CosmeticDentistry; 