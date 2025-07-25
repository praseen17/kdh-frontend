import React from 'react';
import invoiceBg from '../assets/images/invoice.jpg';
import '../InvoicePrint.css';

const InvoicePrint = ({ bill, patient }) => {
  // bill: { id, treatment, amount, date, notes }
  // patient: { name, age, sex }
  return (
    <div className="invoice-bg-wrapper" style={{
      backgroundImage: `url(${invoiceBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '794px', // A4 width at 96dpi
      height: '1123px', // A4 height at 96dpi
      position: 'relative',
      margin: '0 auto',
      pageBreakAfter: 'always',
    }}>
      {/* Bill No. */}
      <div style={{ position: 'absolute', top: 110, left: 120, fontWeight: 600, fontSize: 18 }}>{bill.id}</div>
      {/* Date */}
      <div style={{ position: 'absolute', top: 130, right: 120, fontWeight: 600, fontSize: 18 }}>{bill.date}</div>
      {/* Patient Name */}
      <div style={{ position: 'absolute', top: 210, left: 160, fontWeight: 600, fontSize: 18 }}>{patient.name}</div>
      {/* Age */}
      <div style={{ position: 'absolute', top: 210, left: 470, fontWeight: 600, fontSize: 18 }}>{patient.age}</div>
      {/* Sex */}
      <div style={{ position: 'absolute', top: 210, left: 600, fontWeight: 600, fontSize: 18 }}>{patient.sex}</div>
      {/* Treatment */}
      <div style={{ position: 'absolute', top: 270, left: 80, fontWeight: 700, fontSize: 18 }}>{bill.treatment}</div>
      {/* Amount */}
      <div style={{ position: 'absolute', top: 270, right: 120, fontWeight: 700, fontSize: 18 }}>{bill.amount}</div>
      {/* Total */}
      <div style={{ position: 'absolute', top: 340, right: 120, fontWeight: 700, fontSize: 22 }}>{bill.amount}</div>
      {/* Total in Words */}
      <div style={{ position: 'absolute', top: 390, left: 180, fontWeight: 600, fontSize: 16 }}>{bill.amountWords || ''}</div>
      {/* Optionally add more fields as needed */}
    </div>
  );
};

export default InvoicePrint; 