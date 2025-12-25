import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Pricing from './components/Pricing';
import Services from './components/Services';
import Booking from './components/Booking';
import FAQ from './components/FAQ';
import Complaint from './components/Complaint';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import keychainImage from './images/keychain.png';

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null); // ✅ no localStorage

  // ✅ Fetch user from backend on app load
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('https://gmz-motors-backend.vercel.app/api/user/me', {
          method: 'GET',
          credentials: 'include', // if using cookies for auth
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user); // set the user from backend
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setUser(null);
      }
    }

    fetchUser();
  }, []);


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <img src={keychainImage} alt="Car Keychain" className="keychain" />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/services" element={<Services />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/booking"
              element={user ? <Booking /> : <Navigate to="/login" />}
            />
            <Route
              path="/complaint"
              element={user ? <Complaint /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;