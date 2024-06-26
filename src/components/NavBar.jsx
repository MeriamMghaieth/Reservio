import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 
import Logo from '../assets/logores.png';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('Accueil');

  const handleClick = (itemName) => {
    setActiveItem(itemName);
    if (itemName === 'Communauté') {
      document.getElementById('our-users').scrollIntoView({ behavior: 'smooth' });
    }
    if (itemName === 'À propos') {
      document.getElementById('why-choose-us').scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
          <span className="navbar-title">Reservio</span>
        </div>
        <div className="center-items">
          <ul className="nav-links">
            <li className={`nav-item ${activeItem === 'Accueil' ? 'active' : ''}`}>
              <Link to="/">Accueil</Link>
            </li>
            <li className={`nav-item ${activeItem === 'Communauté' ? 'active' : ''}`}>
              <Link to="/#" onClick={() => handleClick('Communauté')}>Communauté</Link>
            </li>
            <li className={`nav-item ${activeItem === 'À propos' ? 'active' : ''}`}>
              <Link to="/#" onClick={() => handleClick('À propos')}>À propos</Link>
            </li>
            <li className={`nav-item dropdown ${activeItem === 'Catégories' ? 'active' : ''}`}>
              <Link to="#">Catégories</Link>
              <ul className="dropdown-content">
                <li><Link to="/services">Hébergement</Link></li>
                <li><Link to="/services">Restauration</Link></li>
                <li><Link to="/services">Transport</Link></li>
                <li><Link to="/services">Activités</Link></li>
                <li><Link to="/services">Soins et bien-être</Link></li>
                <li><Link to="/services">Événements spéciaux</Link></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="right-items">
          <ul className="nav-links">
            <li className="nav-item dropdown">
              <Link to="#">S'inscrire</Link>
              <ul className="dropdown-content">
                <li><Link to="/register/client">Client</Link></li>
                <li><Link to="/register/provider">Fournisseur</Link></li>
              </ul>
            </li>
            <li className={`nav-item ${activeItem === 'Se connecter' ? 'active' : ''}`}>
              <Link to="/login">Se connecter</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
