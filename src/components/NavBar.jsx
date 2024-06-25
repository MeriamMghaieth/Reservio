import React, { useState } from 'react';
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
        </div>
        <div className="center-items">
          <ul className="nav-links">
            <li className={`nav-item ${activeItem === 'Accueil' ? 'active' : ''}`} onClick={() => handleClick('Accueil')}>
              <a href="/">Accueil</a>
            </li>
            <li className={`nav-item ${activeItem === 'Communauté' ? 'active' : ''}`} onClick={() => handleClick('Communauté')}>
              <a href="/#">Communauté</a>
            </li>
            <li className={`nav-item ${activeItem === 'À propos' ? 'active' : ''}`} onClick={() => handleClick('À propos')}>
              <a href="/#">À propos</a>
            </li>
            <li className={`nav-item dropdown ${activeItem === 'Catégories' ? 'active' : ''}`} onClick={() => handleClick('Catégories')}>
              <a href="#">Catégories</a>
              <ul className="dropdown-content">
                <li><a href="/services">Hébergement</a></li>
                <li><a href="/services">Restauration</a></li>
                <li><a href="/services">Transport</a></li>
                <li><a href="/services">Activités</a></li>
                <li><a href="/services">Soins et bien-être</a></li>
                <li><a href="/services">Événements spéciaux</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="right-items">
          <ul className="nav-links">
            <li className="nav-item dropdown">
              <a href="#">S'inscrire</a>
              <ul className="dropdown-content">
                <li><a href="/register/client">Client</a></li>
                <li><a href="/register/provider">Fournisseur</a></li>
              </ul>
            </li>
            <li className={`nav-item ${activeItem === 'Se connecter' ? 'active' : ''}`} onClick={() => handleClick('Se connecter')}>
              <a href="/login">Se connecter</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
