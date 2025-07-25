import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "31a3f409-b63c-4bb4-b4fe-b8f7e6dd9d85");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });

    const result = await response.json();

    if (result.success) {
      console.log("Success:", result);
      event.target.reset();
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } else {
      console.error("Error:", result);
      alert("There was an error sending your message.");
    }
  };

  return (
    <motion.div
      className="kdh-contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {showPopup && (
        <div className="kdh-popup-message">
          <p>✅ Your message has been sent!</p>
        </div>
      )}

      <div className="kdh-contact-hero">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Reach out for appointments, questions, or feedback.</p>
      </div>

      <div className="kdh-contact-main">
        <div className="kdh-contact-info-card">
          <h3>Contact Information</h3>
          <ul className="kdh-contact-info-list">
            <li><span className="kdh-contact-icon">📍</span>117-290/1, Sirla hills, Opp. Meerpet Police Station,Meerpet to Almasguda Main Road, Almasguda, Telangana 500097</li>
            <li><span className="kdh-contact-icon">📞</span>+91-9059557555</li>
            <li><span className="kdh-contact-icon">✉️</span>kokondadentalhospital@gmail.com</li>
          </ul>
          <div className="kdh-contact-map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30471.745498924734!2d78.49429417431641!3d17.317084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba26861bb550d%3A0x2cff2c9028691d04!2sKokonda&#39;s%20Dental%20Hospital!5e0!3m2!1sen!2sin!4v1750764941633!5m2!1sen!2sin"
              width="100%"
              height="220"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kokonda Dental Hospital Location"
            ></iframe>
          </div>
        </div>

        <div className="kdh-contact-form-card">
          <h3>Send Us a Message</h3>
          <form className="kdh-contact-form" onSubmit={onSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows={4} required />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
