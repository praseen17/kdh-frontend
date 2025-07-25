import React from 'react';
import { motion } from 'framer-motion';
import './ServicePages.css';

const GeneralDentistry = () => (
  <motion.div className="kdh-service-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
    {/* Hero Section */}
    <section className="kdh-service-hero">
    
      <h1 className="kdh-service-title">General Dentistry and Preventive Care</h1>
      <p className="kdh-service-intro">Comprehensive dental care for your entire family, from children to seniors. Our team ensures a comfortable and caring experience for all ages, focusing on prevention, education, and long-term oral health.</p>
    </section>
    {/* Services Icons */}
    <section className="kdh-service-icons-row">
      <div className="kdh-service-icon-card">
        <img src="https://cdn.vectorstock.com/i/1000v/11/27/dental-tooth-icon-bright-clean-vector-20841127.jpg" alt="Checkups" />
        <h3>Routine Checkups</h3>
        <p>Thorough exams to detect issues early and keep your smile healthy.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://cdn.vectorstock.com/i/1000v/27/77/teeth-cleaning-thin-line-icon-vector-21242777.jpg" alt="Cleanings" />
        <h3>Professional Cleanings</h3>
        <p>Gentle, effective cleanings to remove plaque and prevent gum disease.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Fill" alt="Fillings" />
        <h3>Tooth-Colored Fillings</h3>
        <p>Natural-looking restorations for cavities and minor tooth damage.</p>
      </div>
      <div className="kdh-service-icon-card">
        <img src="https://via.placeholder.com/64x64?text=Sealant" alt="Sealants" />
        <h3>Sealants & Fluoride</h3>
        <p>Extra protection for kids and adults to prevent tooth decay.</p>
      </div>
    </section>
    {/* Family Care Section */}
    <section className="kdh-service-family-section">
      <img src="https://via.placeholder.com/400x180?text=Family+Smiling" alt="Family Dentistry" className="kdh-service-family-img" />
      <div>
        <h2>Care for All Ages</h2>
        <p>We welcome patients of every age and stage of life. Our gentle approach, modern technology, and friendly team make every visit stress-free. From a child's first dental visit to senior care, we're here for your family's smiles.</p>
      </div>
    </section>
    {/* Benefits List */}
    <section className="kdh-service-benefits">
      <h2>Why Choose Our General Dentistry?</h2>
      <ul>
        <li>Personalized treatment plans for every patient</li>
        <li>State-of-the-art diagnostic and treatment technology</li>
        <li>Flexible scheduling and family block appointments</li>
        <li>Patient education and prevention focus</li>
        <li>Comfortable, modern environment</li>
      </ul>
      <a href="/appointment" className="kdh-service-cta">Book Your Family's Visit &rarr;</a>
    </section>
  </motion.div>
);

export default GeneralDentistry; 