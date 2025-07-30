import React from 'react';
import { motion } from 'framer-motion';
import './Home.css';
import heroBg from '../assets/images/image.png';
import GoogleReviews from '../components/GoogleReviews';

const Home = () => (
  <div className="kdh-home">
    {/* Hero Section */}
    <motion.section className="kdh-hero-diagonal" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
      <div className="kdh-hero-bg-img" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="kdh-hero-overlay" />
      <div className="kdh-hero-content-diagonal">
        <h1 className="kdh-hero-title-diagonal">SMILE WITH A STYLE</h1>
        <div className="kdh-hero-btns-diagonal">
          <a href="/appointment" className="kdh-hero-cta-diagonal">Book Appointment</a>
          <a href="/about#camps" className="kdh-hero-secondary-diagonal">Our Camps</a>
        </div>
      </div>
    </motion.section>

{/* Free Consultation Banner */}
<div style={{
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1.5rem',
}}>
  <div style={{
    background: '#FFD700',
    color: '#B22222',
    fontWeight: 700,
    fontSize: '1.15rem',
    textAlign: 'center',
    padding: '0.8rem 1.2rem',
    borderRadius: 12,
    display: 'inline-block',
    boxShadow: '0 2px 12px rgba(178,34,34,0.2)',
  }}>
    <span style={{ fontWeight: '900' }}>FREE</span> Consultation On <b>3rd</b> Of Every Month
  </div>
</div>



    {/* Welcome Section */}
   <motion.section className="kdh-welcome-section-diagonal" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }}>
  <div className="kdh-welcome-left-diagonal">
    <h2>Welcome to Kokonda Dental Hospital</h2>
    <p>
      At Kokonda Dental Hospital (KDH) we provide comprehensive Dental Care with a focus on Patient Comfort and cure their Dental Problems.
      We have an experienced and dedicated Team of Doctors and Staff to help and treat Patients. We concentrate on treating Patients and give them a Healthy and Beautiful Smile.
      Also we give them Awareness as to how to prevent further Dental Issues and maintain their Oral Health.
      We offer high Quality Health Care Services to Patients of all Ages. The Hospital strives to create a relaxing and welcoming Environment who walks through its Doors.
      The Hospital’s Team of Professionals are highly skilled and well-versed in their respective Domains. Patients can expect to receive top notch Surgeries, Treatments and Procedures.
      We have started this Organisation in the year 2001 and have been successfully treating Patients till date and committed to do the same in Future.
    </p>
    <div className="kdh-button-wrapper">
      <a href="/appointment" className="kdh-hero-cta-diagonal">Book Appointment</a>
    </div>
  </div>

  <div className="kdh-welcome-right-diagonal">
    <img src="Homeintro.png" alt="Hospital" />
  </div>
</motion.section>


    {/* Leadership Section */}
    <motion.section className="kdh-leadership-section-diagonal" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      <h2 className="kdh-leadership-title-diagonal">Our Leaderships</h2>
      <div className="kdh-leadership-cards-diagonal">
        <div className="kdh-leader-card-diagonal">
          <div className="kdh-leader-hexagon">
            <img src={require('../assets/images/dentist-with-female-patient.jpg')} alt="Doctor" />
          </div>
          <div className="kdh-leader-info-diagonal">
            <h3>Mr. Kokonda Lakshman</h3>
            <h2>M.C.A. </h2>
            <h2>A Software Professional in a Reputed MNC.</h2>
            <p>Chief Executive Officer</p>
          </div>
        </div>
        <div className="kdh-leader-card-diagonal">
          <div className="kdh-leader-hexagon">
            <img src={require('../assets/images/dentist-with-child.jpg')} alt="Doctor" />
          </div>
          <div className="kdh-leader-info-diagonal">
            <h3>Dr. Kokonda Madhavi Chandra</h3>
            <h2>BDS., DDM, PGDHA (Apollo Hospital).</h2>
            <h2>Author of A Book CLINICAL PERIODONTICS.</h2>
            <p>Managing Director</p>
          </div>
        </div>
      </div>
    </motion.section>

    {/* Services Section */}
    <motion.section className="kdh-section kdh-services-section-diagonal" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      <h2 className="kdh-services-title-diagonal">Our Services</h2>
      <p className="kdh-services-desc-diagonal">We offer comprehensive dental care services designed to meet all your oral health needs with the highest standards of care and comfort.</p>
      <div className="kdh-services-list-diagonal">
        <div className="kdh-service-card-diagonal">
          <img src={require('../assets/icons/download.png')} alt="General Dentistry" style={{ width: 48, height: 48, objectFit: 'contain' }} />
          <h3>General Dentistry and Preventive Care </h3>
          <p>We offer complete oral health care including Scaling and polishing , fillings, Bleaching, extractions and all preventive treatment like flouride applications, Pit and fissure sealants to maintain oral health. </p>
          <a href="/services/family-dentistry" className="kdh-learn-more-diagonal">Learn More &rarr;</a>
        </div>
        <div className="kdh-service-card-diagonal">
          <img src={require('../assets/icons/download (1).png')} alt="Cosmetic Dentistry" style={{ width: 48, height: 48, objectFit: 'contain' }} />
          <h3>Cosmetic Dentistry and Orthodontics</h3>
          <p>We offer teeth whitening procedures, veneers, ceramic crowns and other aesthetic treatments like full mouth rehabilitation,  smile designing for broken, discoloured , stained teeth  We offer all type of Orthodontics treatments like Braces, Clear aligners for all ages to correct your bite and align your teeth.To give you a confident, Healthy and a beautiful smile. </p>
          <a href="/services/cosmetic-dentistry" className="kdh-learn-more-diagonal">Learn More &rarr;</a>
        </div>
        <div className="kdh-service-card-diagonal">
          <img src={require('../assets/icons/download (2).png')} alt="Orthodontics" style={{ width: 48, height: 48, objectFit: 'contain' }} />
          <h3>Periodontics</h3>
          <p>We perform regular Scaling procedures, Gum Surgeries, Flap Surgeries, Bone loss treatment and take care of your gums. We give awareness about brushing techniques and oral care maintenance regimes. </p>
          <a href="/services/oral-surgery" className="kdh-learn-more-diagonal">Learn More &rarr;</a>
        </div>
        <div className="kdh-service-card-diagonal">
          <img src={require('../assets/icons/download (3).png')} alt="Oral Surgery" style={{ width: 48, height: 48, objectFit: 'contain' }} />
          <h3>Oral Surgery</h3>
          <p>We perform all oral surgical procedures like Extraction of impacted teeth, Wisdom teeth, fractures and corrective Jaw procedures and situations like severe pain, trauma , infections, oral cancers, SMF, dental emergencies are also  taken care.</p>
          <a href="/services/oral-surgery" className="kdh-learn-more-diagonal">Learn More &rarr;</a>
        </div>
        <div className="kdh-service-card-diagonal">
          <img src={require('../assets/icons/4827454.png')} alt="Emergency Care" style={{ width: 48, height: 48, objectFit: 'contain' }} />
          <h3>Pedodontics</h3>
          <p>We offer treatments for children below 12 years of age. We perform procedures like deciduous teeth extraction, filing, cleaning, space maintainers, Habit breaking appliances, orthodontic procedures, pulpotomy procedures and crown placements by Pedodontist.</p>
          <a href="/services/emergency-dental-care" className="kdh-learn-more-diagonal">Learn More &rarr;</a>
        </div>
        <div className="kdh-service-card-diagonal">
          <img src={require('../assets/icons/images (1).png')} alt="Preventive Care" style={{ width: 48, height: 48, objectFit: 'contain' }} />
          <h3>Geatric Care and Prosthodontics </h3>
          <p>We take care of senior citizens. Treatments like extractions, replacement of missing teeth, Complete dentures, Implant dentures are done. We perform treatments like complete dentures, Implant dentures, fixed bridges, Implants for missing teeth, removable partial denture to patients as required.</p>
          <a href="/services/preventive-care" className="kdh-learn-more-diagonal">Learn More &rarr;</a>
        </div>
      </div>
      <a href="/appointment" className="kdh-cta-btn-diagonal">Schedule Your Appointment &rarr;</a>
    </motion.section>

    {/* Testimonials Section */}
    <motion.section className="kdh-section kdh-testimonials-section-diagonal" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      <h2 className="kdh-testimonials-title-diagonal">What Our Patients Say</h2>
      <p className="kdh-testimonials-desc-diagonal">Read authentic reviews from our satisfied patients and see why they choose Kokonda Dental Hospital for their dental care needs.</p>
      
      {/* Google Reviews Widget */}
      <div className="kdh-google-reviews-container">
        <GoogleReviews />
      </div>
      <div className="kdh-google-reviews-cta">
        <a href="https://www.google.com/search?sca_esv=0e7e332804e82cc8&rlz=1C1CHBF_enIN1120IN1120&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E6WFzxz_GA4KpM-ghNJlqAOK8jFsABNpEjuHZJRcJJZEArgxDfi4H1TXXFeki4zYikg738cKIEtmElYLHIup9LATaMa3hPyRIbvSe2ptDlbFRA8C6A%3D%3D&q=Kokonda%27s+Dental+Hospital+Reviews&sa=X&ved=2ahUKEwjKq_PnptaOAxVOw6ACHcm9Gf0Q0bkNegQIMRAD&biw=1440&bih=731&dpr=2" target="_blank" rel="noopener noreferrer" className="kdh-google-reviews-btn">
          Write a Review on Google
        </a>
      </div>
    </motion.section>
  </div>
);

export default Home; 
