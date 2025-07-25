import React from 'react';
import { motion } from 'framer-motion';

const MtKisco = () => (
  <motion.div className="kdh-location-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
    <h2 style={{ color: '#B22222' }}>Mt Kisco Location</h2>
    <p style={{ color: '#333', fontSize: '1.1rem' }}>495 East Main St, Mt Kisco, NY 10549</p>
    <p style={{ color: '#FFD700', fontWeight: 'bold' }}>914-244-3900</p>
    <p style={{ color: '#333' }}>Serving the Mt Kisco community with modern, compassionate dental care for all ages.</p>
  </motion.div>
);

export default MtKisco; 