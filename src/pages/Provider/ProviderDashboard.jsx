import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Statistics from './Statistics.jsx';
import Reservations from './ServiceForm.jsx';
import Services from './ProviderServices.jsx';
import Demandes from './DemandesPage.jsx';
import AccueilPage from './AccueilPage.jsx';
import './provider-dashboard.css';

const ProviderDashboard = () => {
  return (
    <div className="provider-dashboard bg-gray-100 min-h-screen">
      <nav className="provider-nav bg-blue-600 p-4">
        <ul className="flex justify-between">
          <div className="flex space-x-4">
            <li><Link to="/provider/dashboard/statistics" className="text-white">Tableau de Bord</Link></li>
            <li><Link to="/provider/dashboard/reservations" className="text-white">Publication </Link></li>
            <li><Link to="/provider/dashboard/services" className="text-white">Services</Link></li>
            <li><Link to="/provider/dashboard/demandes" className="text-white">Demandes</Link></li>
            <li><Link to="/provider/dashboard/acceuil" className="text-white">Acceuil</Link></li>
          </div>
        </ul>
      </nav>
      <div className="provider-content p-6">
        <Routes>
          <Route path="dashboard/statistics" element={<Statistics />} />
          <Route path="dashboard/reservations" element={<Reservations />} />
          <Route path="dashboard/services" element={<Services />} />
          <Route path="dashboard/demandes" element={<Demandes />} />
          <Route path="dashboard/acceuil" element={<AccueilPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProviderDashboard;
