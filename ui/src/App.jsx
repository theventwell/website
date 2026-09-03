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

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/corporate" element={<Corporate />} />
          <Route path="/workshops" element={<WorkshopEvents />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
