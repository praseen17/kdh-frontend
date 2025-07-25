import React from 'react';
import { motion } from 'framer-motion';

const Reviews = () => (
  <motion.div className="kdh-reviews-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
    <h2 style={{ color: '#B22222', marginBottom: '1.5rem' }}>Patient Reviews</h2>
    <div className="kdh-reviews-list">
      <div className="kdh-review-card">"The staff at KDH are so friendly and professional! Highly recommend."</div>
      <div className="kdh-review-card">"Best dental experience I've ever had. The doctors truly care."</div>
      <div className="kdh-review-card">"Clean, modern, and welcoming. My family loves KDH!"</div>
    </div>
  </motion.div>
);

export default Reviews; 