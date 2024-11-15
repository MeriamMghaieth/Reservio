import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from '../redux/Action/Auth';
import './NavBar.css';
import Logo from '../assets/logores.png';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector(state => state.auth);
  const { user } = auth;

  const [activeItem, setActiveItem] = useState('');

  const handleClick = (itemName) => {
    setActiveItem(itemName);
  };

  const handleLogout = () => {
    dispatch(Logout());
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
            {!(user.role === 'ADMIN' || user.role === 'CLIENT' || user.role === 'SERVICE_PROVIDER') && (
              <>
                <li className={`nav-item ${activeItem === 'Accueil' ? 'active' : ''}`}>
                  <Link to="/" onClick={() => handleClick('Accueil')}>Accueil</Link>
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
              </>
            )}
            {user && user.role === 'SERVICE_PROVIDER' && (
              <>
                <li className={`nav-item ${activeItem === 'Accueil' ? 'active' : ''}`}>
                  <Link to="/provider/dashboard/acceuil" onClick={() => handleClick('Accueil')}>Accueil</Link>
                </li>
                
                <li className={`nav-item ${activeItem === 'Tableau de Bord' ? 'active' : ''}`}>
                  <Link to="/provider/dashboard/statistics" onClick={() => handleClick('Tableau de Bord')}>Tableau de Bord</Link>
                </li>
                <li className={`nav-item ${activeItem === 'Publication' ? 'active' : ''}`}>
                  <Link to="/provider/dashboard/reservations" onClick={() => handleClick('Publication')}>Publication</Link>
                </li>
                <li className={`nav-item ${activeItem === 'Services' ? 'active' : ''}`}>
                  <Link to="/provider/dashboard/services" onClick={() => handleClick('Services')}>Services</Link>
                </li>
                <li className={`nav-item ${activeItem === 'Demandes' ? 'active' : ''}`}>
                  <Link to="/provider/dashboard/demandes" onClick={() => handleClick('Demandes')}>Demandes</Link>
                </li>
              </>
            )}
            {user && user.role === 'CLIENT' && (
              <>
                <li className={`nav-item ${activeItem === 'Accueil' ? 'active' : ''}`}>
                  <Link to="/dashboard/client" onClick={() => handleClick('Accueil')}>Accueil</Link>
                </li>
                <li className={`nav-item ${activeItem === 'Services' ? 'active' : ''}`}>
                  <Link to="/dashboard/services" onClick={() => handleClick('Services')}>Services</Link>
                </li>
                <li className={`nav-item ${activeItem === 'Mes Demandes' ? 'active' : ''}`}>
                  <Link to="/dashboard/requests" onClick={() => handleClick('Mes Demandes')}>Mes Demandes</Link>
                </li>
            
                <li className={`nav-item ${activeItem === 'Support' ? 'active' : ''}`}>
                  <Link to="/dashboard/support" onClick={() => handleClick('Support')}>Support</Link>
                </li>
              </>
            )}
            {user && user.role === 'ADMIN' && (
              <>
                <li className={`nav-item ${activeItem === 'Accueil' ? 'active' : ''}`}>
                  <Link to="/admin" onClick={() => handleClick('Accueil')}>Accueil</Link>
                </li>
                
                <li className={`nav-item ${activeItem === 'Catégories' ? 'active' : ''}`}>
                  <Link to="/admin/categories" onClick={() => handleClick('Catégories')}>Catégories</Link>
                </li>
                <li className={`nav-item ${activeItem === 'Statistiques' ? 'active' : ''}`}>
                  <Link to="/admin/stats" onClick={() => handleClick('Statistiques')}>Statistiques</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {(user.role === 'ADMIN' || user.role === 'CLIENT' || user.role === 'SERVICE_PROVIDER') && (
          <div className="right-items">
            <ul className="nav-links">
            <li className={`nav-item ${activeItem === 'Mon Profil' ? 'active' : ''}`}>
                  <Link to="/dashboard/profile" onClick={() => handleClick('Mon Profil')}>
                    <FaUser className="profile-icon" /> Mon Profil
                  </Link>
                </li>
              <li className={`nav-item ${activeItem === 'Se Déconnecter' ? 'active' : ''}`}>
                <Link to="/logout" onClick={handleLogout}>Se Déconnecter</Link>
              </li>
            </ul>
          </div>
        )}
        {!(user.role === 'ADMIN' || user.role === 'CLIENT' || user.role === 'SERVICE_PROVIDER') && (
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
