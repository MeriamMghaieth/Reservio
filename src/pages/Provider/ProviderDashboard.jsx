import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Statistics from '../../components/Statistics';
import Reservations from './ServiceForm.jsx';
import Services from './ProviderServices.jsx';
import './provider-dashboard.css';

const ProviderDashboard = () => {
  return (
    <div className="provider-dashboard bg-gray-100 min-h-screen">
      <nav className="provider-nav bg-blue-600 p-4">
        <ul className="flex justify-between">
          <li className="text-white font-bold text-xl">Mon Plateforme</li>
          <div className="flex space-x-4">
            <li><Link to="/provider/dashboard/statistics" className="text-white">Tableau de Bord</Link></li>
            <li><Link to="/provider/dashboard/reservations" className="text-white">Demandes</Link></li>
            <li><Link to="/provider/dashboard/services" className="text-white">Services</Link></li>
          </div>
        </ul>
      </nav>
      <div className="provider-content p-6">
        <Routes>
          <Route path="dashboard/statistics" element={<Statistics />} />
          <Route path="dashboard/reservations" element={<Reservations />} />
          <Route path="dashboard/services" element={<Services />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProviderDashboard;
