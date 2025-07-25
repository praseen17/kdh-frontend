import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to admin dashboard
      navigate('/admin');
    } catch (err) {
      setError('Invalid credentials.');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Enter your email to reset password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset link sent to your email.');
      setError('');
    } catch (err) {
      setError('Failed to send reset email.');
    }
  };

  return (
    <div className="kdh-dashboard-section" style={{ maxWidth: 400, margin: '3rem auto' }}>
      <h2 className="kdh-dashboard-title">Admin Login</h2>
      <form onSubmit={handleLogin} className="kdh-form">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="kdh-btn">Login</button>
      </form>
      <button onClick={handleForgotPassword} className="kdh-btn" style={{ marginTop: 12, background: 'none', color: '#B22222', border: 'none', cursor: 'pointer' }}>Forgot Password?</button>
      {error && <div className="kdh-error" style={{ marginTop: 8 }}>{error}</div>}
      {message && <div className="kdh-success" style={{ marginTop: 8 }}>{message}</div>}
    </div>
  );
};

export default AdminLogin; 