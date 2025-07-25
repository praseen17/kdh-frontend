import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Header.css';
import chatgptLogo from '../assets/images/chatgpt.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef();

  // Close dropdown when clicking outside (pointerdown for better timing)
  useEffect(() => {
    const handlePointerDown = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    if (servicesOpen) document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [servicesOpen]);

  return (
    <header className="kdh-header">
      <div className="kdh-header-top">
        <Link to="/" className="kdh-header-left" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="kdh-logo-area">
            <img src={chatgptLogo} alt="Logo" className="kdh-logo-img" />
          </div>
          <div className="kdh-title-group">
            <h1 className="kdh-title">Kokonda Dental Hospital</h1>
            <span className="kdh-tagline">Smile With A Style <span style={{ color: '#FFD700', fontWeight: 600, marginLeft: 12, fontSize: '1.05rem' }}>| Since 2001</span></span>
          </div>
        </Link>
        <div className="kdh-header-right">
          <button className="kdh-hamburger" onClick={() => setMenuOpen(m => !m)} aria-label="Toggle menu">
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
          </button>
          <nav className={`kdh-navbar${menuOpen ? ' open' : ''}`}>
            <NavLink to="/" className="kdh-nav-link" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/about" className="kdh-nav-link" onClick={() => setMenuOpen(false)}>About Us</NavLink>
            <div className="kdh-dropdown" ref={servicesRef} style={{ position: 'relative' }}>
              <span
                className="kdh-nav-link"
                onClick={() => setServicesOpen(o => !o)}
                style={{ cursor: 'pointer', userSelect: 'none' }}
                tabIndex={0}
                onBlur={() => setTimeout(() => setServicesOpen(false), 150)}
              >
                Services ▼
              </span>
              {servicesOpen && (
                <motion.div className="kdh-dropdown-content" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ zIndex: 100 }}>
                  <Link to="/services/family-dentistry" onClick={() => { setMenuOpen(false); setTimeout(() => setServicesOpen(false), 100); }}>General Dentistry and Preventive Care </Link>
                  <Link to="/services/cosmetic-dentistry" onClick={() => { setMenuOpen(false); setTimeout(() => setServicesOpen(false), 100); }}>Cosmetic Dentistry and Orthodontics</Link>
                  <Link to="/services/invisalign" onClick={() => { setMenuOpen(false); setTimeout(() => setServicesOpen(false), 100); }}>Periodontics</Link>
                  <Link to="/services/oral-surgery" onClick={() => { setMenuOpen(false); setTimeout(() => setServicesOpen(false), 100); }}>Oral Surgery</Link>
                  <Link to="/services/emergency-dental-care" onClick={() => { setMenuOpen(false); setTimeout(() => setServicesOpen(false), 100); }}>Pedodontics</Link>
                  <Link to="/services/preventive-care" onClick={() => { setMenuOpen(false); setTimeout(() => setServicesOpen(false), 100); }}>Geatric Care and Prosthodontics</Link>
                </motion.div>
              )}
            </div>
            <NavLink to="/contact" className="kdh-nav-link" onClick={() => setMenuOpen(false)}>Contact</NavLink>
            <NavLink to="/appointment" className="kdh-nav-link kdh-cta" onClick={() => setMenuOpen(false)}>Book Appointment</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 