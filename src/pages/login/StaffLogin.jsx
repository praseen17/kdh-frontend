import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { simpleHash } from '../../firebase';
import { useAuth } from '../../App';
import { useNavigate } from 'react-router-dom';

const StaffLogin = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginStaff } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const q = query(collection(db, 'users'), where('userId', '==', userId), where('role', '==', 'staff'));
    const querySnapshot = await getDocs(q);
    let found = false;
    querySnapshot.forEach((doc) => {
      if (doc.data().password === simpleHash(password)) {
        found = true;
      }
    });
    if (found) {
      loginStaff(userId);
      navigate('/staff');
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="kdh-dashboard-section" style={{ maxWidth: 400, margin: '3rem auto' }}>
      <h2 className="kdh-dashboard-title">Staff Login</h2>
      <form onSubmit={handleLogin} className="kdh-form">
        <input type="text" placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="kdh-btn">Login</button>
      </form>
      {error && <div className="kdh-error" style={{ marginTop: 8 }}>{error}</div>}
    </div>
  );
};

export default StaffLogin; 