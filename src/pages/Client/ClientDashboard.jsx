import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import UserProfile from './UserProfile';
import Notification from './Notifications';
import Pending from './PendingReservations';
import './dashboard.css';

const ClientDashboard = () => {


  return (
    <div className="provider-dashboard bg-gray-100 min-h-screen">
      <nav className="provider-nav bg-blue-600 p-4">
        <ul className="flex justify-between">
          <div className="flex space-x-4">
            <li><Link to="/client/dashboard/acceuil" className="text-white">Accueil</Link></li>
            <li><Link to="/client/dashboard/profile" className="text-white">Voir Profil</Link></li>
            <li><Link to="/client/dashboard/notification" className="text-white">Notifications</Link></li>
            <li><Link to="/client/dashboard/pending" className="text-white">Liste d'attentes</Link></li>
          </div>
        </ul>
      </nav>
      <div className="provider-content p-6">
        <Routes>
          <Route path="/dashboard/acceuil" element={<ServiceCard />} />
          <Route path="/dashboard/profile" element={<UserProfile  />} />
          <Route path="/dashboard/notification" element={<Notification  />} />
          <Route path="/dashboard/pending" element={<Pending  />} />
        </Routes>
      </div>
    </div>
  );
};

export default ClientDashboard;
