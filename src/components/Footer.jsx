import React, { useState } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faMapMarkerAlt, faPhoneAlt, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faYoutube, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

const Footer = () => (
  <footer className="kdh-footer">
    <div className="kdh-footer-main">
      <div className="kdh-footer-col">
        <h4>Company</h4>
        <ul>
          <li><FontAwesomeIcon icon={faAngleRight} /> <a href="/about">About Us</a></li>
          <li><FontAwesomeIcon icon={faAngleRight} /> <a href="/contact">Contact Us</a></li>
          <li><FontAwesomeIcon icon={faAngleRight} /> <a href="/appointment">Reservation</a></li>
          <li><FontAwesomeIcon icon={faAngleRight} /> <a href="/">Privacy Policy</a></li>
          <li><FontAwesomeIcon icon={faAngleRight} /> <a href="/">Terms & Condition</a></li>
        </ul>
      </div>

      <div className="kdh-footer-col">
        <h4>Contact</h4>
        <p>117-290/1, Sirla hills, Opp. Meerpet Police Station,Meerpet to Almasguda Main Road, Almasguda, Telangana 500097<br />+91-9059557555<br />kokondadentalhospital@gmail.com</p>
        <div className="kdh-footer-socials">
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="https://youtube.com/@kokondadentalhospital?si=8JXyCrKcSsT8zEhF" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FontAwesomeIcon icon={faYoutube} /></a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedinIn} /></a>
        </div>
      </div>

      <div className="kdh-footer-col">
        <h4>Opening</h4>
        <p>Monday - Saturday<br/>10 AM-2 PM <br />5-PM-9 PM</p>
      </div>

      <div className="kdh-footer-col">
        <h4>Contact us</h4>
        <ContactForm />
      </div>

      <div className="kdh-footer-col kdh-footer-map-col">
        <h4>Our Location</h4>
        <div className="kdh-footer-map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30471.745498924734!2d78.49429417431641!3d17.317084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba26861bb550d%3A0x2cff2c9028691d04!2sKokonda&#39;s%20Dental%20Hospital!5e0!3m2!1sen!2sin!4v1750764941633!5m2!1sen!2sin"
            width="100%"
            height="180"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kokonda Dental Hospital Location"
          ></iframe>
        </div>
      </div>
    </div>

    <div className="kdh-footer-bottom">
      <span>© <span className="kdh-footer-link">Kokonda Dental Hospital</span>, All Right Reserved.</span>
      <div className="kdh-footer-links">
        <a href="/" className="kdh-footer-link-item">Home</a>
        <span className="kdh-footer-link-sep"></span>
        <a href="/" className="kdh-footer-link-item">Cookies</a>
        <span className="kdh-footer-link-sep"></span>
       <a href="/contact" className="kdh-footer-link-item">Help</a>
        <span className="kdh-footer-link-sep"></span>
        <a href="/contact" className="kdh-footer-link-item">FAQs</a>
      </div>
    </div>
  </footer>
);

const ContactForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(event.target);
    formData.append("access_key", "31a3f409-b63c-4bb4-b4fe-b8f7e6dd9d85");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Success:", result);
        event.target.reset();
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      } else {
        console.error("Error:", result);
        alert("There was an error sending your message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error sending your message.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="kdh-footer-newsletter-wrapper">
      <form className="kdh-footer-newsletter" onSubmit={onSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Your name" 
          required 
          className="kdh-newsletter-input"
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Your email" 
          required 
          className="kdh-newsletter-input"
        />
        <textarea 
          name="message" 
          placeholder="Your message" 
          required 
          className="kdh-newsletter-textarea"
          rows="3"
        ></textarea>
        <button 
          type="submit" 
          className="kdh-newsletter-button"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      
      {showPopup && (
        <motion.div
          className="kdh-popup-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <p>✅ Your message has been sent successfully!</p>
        </motion.div>
      )}
    </div>
  );
};

export default Footer;