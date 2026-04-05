import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Community from './pages/Community';
import AdminDashboard from './pages/AdminDashboard';
import Catalog from './pages/Catalog';
import Services from './pages/Services';
import About from './pages/About';
import InvestGuard from './pages/InvestGuard';
import Privacy from './pages/Privacy';
import Legal from './pages/Legal';
import Career from './pages/Career';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/community" element={<Community />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/investguard" element={<InvestGuard />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/career" element={<Career />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;