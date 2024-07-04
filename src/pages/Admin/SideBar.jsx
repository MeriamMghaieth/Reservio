import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Section Admin</h2>
      <ul>
        <li><Link to="/admin">Accueil</Link></li>
        <li><Link to="/admin/categories">Catégories</Link></li> {/* Lien vers la page des catégories */}
        <li><Link to="/admin/stats">Statistiques</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
