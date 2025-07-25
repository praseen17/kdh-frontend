import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Components (to be created)
import Header from './components/Header';
import Footer from './components/Footer';
// Pages (to be created)
import Home from './pages/Home';
import About from './pages/About';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import CosmeticDentistry from './pages/services/CosmeticDentistry';
import Invisalign from './pages/services/Invisalign';
import EmergencyDentalCare from './pages/services/EmergencyDentalCare';
import OralSurgery from './pages/services/OralSurgery';
import PreventiveCare from './pages/services/PreventiveCare';
import MtKisco from './pages/locations/MtKisco';
import SecondLocation from './pages/locations/SecondLocation';
import GeneralDentistry from './pages/services/FamilyDentistry';
import AdminDashboard from './pages/admin/AdminDashboard';
import StaffDashboard from './pages/staff/StaffDashboard';
import AdminLogin from './pages/login/AdminLogin';
import StaffLogin from './pages/login/StaffLogin';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // 'admin' or 'staff'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setRole('admin');
        setLoading(false);
        // Set 3-hour auto-logout
        const timer = setTimeout(() => {
          signOut(auth);
          setUser(null);
          setRole(null);
        }, 3 * 60 * 60 * 1000);
        return () => clearTimeout(timer);
      } else {
        setUser(null);
        setRole(null);
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  // Staff login state (localStorage)
  useEffect(() => {
    const staffUser = localStorage.getItem('staffUser');
    if (staffUser) {
      setUser({ userId: staffUser });
      setRole('staff');
      setLoading(false);
      // Set 3-hour auto-logout
      const timer = setTimeout(() => {
        localStorage.removeItem('staffUser');
        setUser(null);
        setRole(null);
      }, 3 * 60 * 60 * 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const loginStaff = (userId) => {
    localStorage.setItem('staffUser', userId);
    setUser({ userId });
    setRole('staff');
    // Set 3-hour auto-logout
    const timer = setTimeout(() => {
      localStorage.removeItem('staffUser');
      setUser(null);
      setRole(null);
    }, 3 * 60 * 60 * 1000);
    return () => clearTimeout(timer);
  };

  const logout = () => {
    if (role === 'admin') {
      signOut(auth);
    } else {
      localStorage.removeItem('staffUser');
      setUser(null);
      setRole(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loginStaff, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, role, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user || (requiredRole && role !== requiredRole)) {
    window.location.href = requiredRole === 'admin' ? '/login/admin' : '/login/staff';
    return null;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<Appointment />} />
          {/* Services */}
          <Route path="/services/family-dentistry" element={<GeneralDentistry />} />
          <Route path="/services/cosmetic-dentistry" element={<CosmeticDentistry />} />
          <Route path="/services/invisalign" element={<Invisalign />} />
          <Route path="/services/oral-surgery" element={<OralSurgery />} />
          <Route path="/services/emergency-dental-care" element={<EmergencyDentalCare />} />
          <Route path="/services/preventive-care" element={<PreventiveCare />} />
          {/* Locations */}
          <Route path="/locations/mt-kisco" element={<MtKisco />} />
          <Route path="/locations/second-location" element={<SecondLocation />} />
          {/* Doctors */}
            <Route path="/admin" element={<PrivateRoute requiredRole="admin"><AdminDashboard /></PrivateRoute>} />
            <Route path="/staff" element={<PrivateRoute requiredRole="staff"><StaffDashboard /></PrivateRoute>} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/login/staff" element={<StaffLogin />} />
        </Routes>
      </main>
      <Footer />
    </Router>
    </AuthProvider>
  );
}

export default App;
