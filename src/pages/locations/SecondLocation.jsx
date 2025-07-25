import React from 'react';
import { motion } from 'framer-motion';

const SecondLocation = () => (
  <motion.div className="kdh-location-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
    <h2 style={{ color: '#B22222' }}>Second Location</h2>
    <p style={{ color: '#333', fontSize: '1.1rem' }}>1055 Summer St #3, Stamford, CT 06905</p>
    <p style={{ color: '#FFD700', fontWeight: 'bold' }}>203-252-2000</p>
    <p style={{ color: '#333' }}>Providing quality dental care to the Stamford community with a focus on comfort and excellence.</p>
  </motion.div>
);

export default SecondLocation; 