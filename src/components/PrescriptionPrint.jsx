import React from 'react';
import prescriptionBg from '../assets/images/prescription.jpg';
import '../PrescriptionPrint.css';

const PrescriptionPrint = ({ prescription, patient }) => {
  // prescription: { medicine, instructions, date }
  // patient: { name, age, sex }
  return (
    <div className="prescription-bg-wrapper" style={{
      backgroundImage: `url(${prescriptionBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '794px', // A4 width at 96dpi
      height: '1123px', // A4 height at 96dpi
      position: 'relative',
      margin: '0 auto',
      pageBreakAfter: 'always',
    }}>
      {/* Name */}
      <div style={{ position: 'absolute', top: 170, left: 220, fontWeight: 600, fontSize: 18 }}>{patient.name}</div>
      {/* Age */}
      <div style={{ position: 'absolute', top: 170, left: 470, fontWeight: 600, fontSize: 18 }}>{patient.age}</div>
      {/* Sex */}
      <div style={{ position: 'absolute', top: 170, left: 600, fontWeight: 600, fontSize: 18 }}>{patient.sex}</div>
      {/* Date */}
      <div style={{ position: 'absolute', top: 170, left: 700, fontWeight: 600, fontSize: 18 }}>{prescription.date}</div>
      {/* Medicine */}
      <div style={{ position: 'absolute', top: 250, left: 120, fontWeight: 700, fontSize: 18 }}>{prescription.medicine}</div>
      {/* Instructions */}
      <div style={{ position: 'absolute', top: 330, left: 120, fontWeight: 700, fontSize: 18 }}>{prescription.instructions}</div>
      {/* Optionally add more fields as needed */}
    </div>
  );
};

export default PrescriptionPrint; 