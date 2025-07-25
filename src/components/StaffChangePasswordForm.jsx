import React, { useState } from 'react';
import { db, simpleHash } from '../firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const StaffChangePasswordForm = () => {
  const [userId, setUserId] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    setLoading(true);
    // Find staff user
    const q = query(collection(db, 'users'), where('userId', '==', userId), where('role', '==', 'staff'));
    const snap = await getDocs(q);
    if (snap.empty) {
      setError('User not found.');
      setLoading(false);
      return;
    }
    const userDoc = snap.docs[0];
    if (userDoc.data().password !== simpleHash(oldPassword)) {
      setError('Old password is incorrect.');
      setLoading(false);
      return;
    }
    // Update password
    await updateDoc(doc(db, 'users', userDoc.id), { password: simpleHash(newPassword) });
    setSuccess('Password changed successfully!');
    setUserId(''); setOldPassword(''); setNewPassword(''); setConfirmPassword('');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <input name="userId" value={userId} onChange={e => setUserId(e.target.value)} placeholder="User ID" required />
      <input name="oldPassword" value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Old Password" type="password" required />
      <input name="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" type="password" required />
      <input name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" type="password" required />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <button type="submit" disabled={loading}>{loading ? 'Changing...' : 'Change Password'}</button>
    </form>
  );
};

export default StaffChangePasswordForm; 