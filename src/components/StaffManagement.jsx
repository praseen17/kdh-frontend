import React, { useEffect, useState } from 'react';
import { db, simpleHash } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ userId: '', password: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ userId: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadStaff = async () => {
    setLoading(true);
    const q = query(collection(db, 'users'), where('role', '==', 'staff'));
    const snap = await getDocs(q);
    setStaff(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => { loadStaff(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.userId || !form.password) {
      setError('User ID and password required.');
      return;
    }
    if (staff.some(s => s.userId === form.userId)) {
      setError('User ID already exists.');
      return;
    }
    await addDoc(collection(db, 'users'), {
      userId: form.userId,
      password: simpleHash(form.password),
      role: 'staff',
    });
    setSuccess('Staff added!');
    setForm({ userId: '', password: '' });
    loadStaff();
  };

  const handleEdit = (s) => {
    setEditId(s.id);
    setEditForm({ userId: s.userId, password: '' });
    setError('');
    setSuccess('');
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!editForm.userId) {
      setError('User ID required.');
      return;
    }
    if (staff.some(s => s.userId === editForm.userId && s.id !== editId)) {
      setError('User ID already exists.');
      return;
    }
    const updateData = { userId: editForm.userId };
    if (editForm.password) updateData.password = simpleHash(editForm.password);
    await updateDoc(doc(db, 'users', editId), updateData);
    setSuccess('Staff updated!');
    setEditId(null);
    setEditForm({ userId: '', password: '' });
    loadStaff();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this staff account?')) return;
    await deleteDoc(doc(db, 'users', id));
    setSuccess('Staff deleted!');
    loadStaff();
  };

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '40px auto',
      padding: '32px',
      background: '#f8d3d3',
      borderRadius: '20px',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      
      <h1 style={{ color: '#8b0000', fontWeight: 'bold', fontSize: '2.5rem', marginBottom: 24 }}>Staff Management</h1>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
        <input
          name="userId"
          value={form.userId}
          onChange={e => setForm({ ...form, userId: e.target.value })}
          placeholder="User ID"
          required
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', minWidth: '200px' }}
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          required
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', minWidth: '200px' }}
        />
        <button type="submit" style={{
          padding: '10px 16px',
          backgroundColor: '#343a40',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>Add Staff</button>
      </form>

      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
          <thead>
            <tr style={{ background: '#ffcccc' }}>
              <th style={{ padding: '12px', fontSize: '16px' }}>User ID</th>
              <th style={{ padding: '12px', fontSize: '16px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '12px' }}>
                  {editId === s.id ? (
                    <form onSubmit={handleEditSave} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                      <input
                        value={editForm.userId}
                        onChange={e => setEditForm({ ...editForm, userId: e.target.value })}
                        required
                        style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                      />
                      <input
                        type="password"
                        placeholder="New Password (optional)"
                        value={editForm.password}
                        onChange={e => setEditForm({ ...editForm, password: e.target.value })}
                        style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                      />
                      <button type="submit" style={{ background: '#007bff', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px' }}>Save</button>
                      <button type="button" onClick={() => setEditId(null)} style={{ background: '#6c757d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px' }}>Cancel</button>
                    </form>
                  ) : (
                    <strong>{s.userId}</strong>
                  )}
                </td>
                <td style={{ padding: '12px' }}>
                  {editId !== s.id && (
                    <>
                      <button onClick={() => handleEdit(s)} style={{
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        marginRight: '10px'
                      }}>Edit</button>
                      <button onClick={() => handleDelete(s.id)} style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '6px'
                      }}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffManagement;
