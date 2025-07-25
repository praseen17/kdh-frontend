import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BillAnalytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 29);
    return d.toISOString().split('T')[0];
  });
  const [toDate, setToDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, 'appointments'));
      const visits = {};
      snap.docs.forEach(doc => {
        const d = doc.data();
        if (d.date) {
          visits[d.date] = (visits[d.date] || 0) + 1;
        }
      });
      // Use selected date range
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const days = [];
      for (let dt = new Date(from); dt <= to; dt.setDate(dt.getDate() + 1)) {
        const key = dt.toISOString().split('T')[0];
        days.push({ date: key, visits: visits[key] || 0 });
      }
      setData(days);
      setLoading(false);
    };
    fetchData();
  }, [fromDate, toDate]);

  return (
    <div style={{ margin: '2rem 0' }}>
      <h2 style={{ color: '#B22222', marginBottom: 16 }}>Patient Visit Analysis</h2>
      <div style={{ marginBottom: 16 }}>
        <label>From: </label>
        <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} style={{ marginRight: 16 }} />
        <label>To: </label>
        <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
      </div>
      {loading ? <div>Loading graph...</div> : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-30} textAnchor="end" height={60} />
            <YAxis allowDecimals={false} tick={{ fontSize: 13 }} interval={0} ticks={Array.from({length: 31}, (_, i) => i)} />
            <Tooltip />
            <Line type="monotone" dataKey="visits" stroke="#B22222" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BillAnalytics; 