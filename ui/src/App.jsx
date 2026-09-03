import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Corporate from './pages/Corporate';
import WorkshopEvents from './pages/WorkshopEvents';
import Dashboard from './pages/Dashboard';
import AdminRoute from './components/AdminRoute';
import MyBookings from './pages/MyBookings';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import LoginModal from './components/LoginModal';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthModalOpen, closeAuthModal } = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Header />

      <main className="flex-1 overflow-x-hidden pt-[76px] sm:pt-[80px] lg:pt-[104px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/corporate" element={<Corporate />} />
          <Route path="/workshops" element={<WorkshopEvents />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/bookings" element={<AuthenticatedRoute><MyBookings /></AuthenticatedRoute>} />
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
      <LoginModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </div>
  );
}

export default App;
