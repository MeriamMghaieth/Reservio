import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from '../redux/Action/Auth';
import './NavBar.css';
import Logo from '../assets/logores.png';
import { FaUser } from 'react-icons/fa'; // Assurez-vous que l'import est correctement configuré ici

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector(state => state.auth);
  const { user } = auth;

  console.log(user.role);
  const [activeItem, setActiveItem] = useState('');

  // Fonction pour gérer le clic sur un lien et définir l'élément actif
  const handleClick = (itemName) => {
    setActiveItem(itemName);
  };

  const handleLogout = () => {
    dispatch(Logout());
  };

  // // Vérifie si l'utilisateur est connecté
  // const isLoggedIn = !!user;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
          <span className="navbar-title">Reservio</span>
        </div>
        <div className="center-items">
          <ul className="nav-links">
            {!user.isConnected && (
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
          </ul>
        </div>
        <div className="right-items">
          <ul className="nav-links">
            {!user.isCo && (
              <>
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
              </>
            )}
            {user.role === 'SERVICE_PROVIDER' && (
              <>
                <li className={`nav-item ${activeItem === 'Demandes' ? 'active' : ''}`}>
                  <Link to="/dashboard/demands">Demandes</Link>
                </li>
                <li className={`nav-item ${activeItem === 'Mon profil' ? 'active' : ''}`}>
                  <Link to="/dashboard/profile">
                    <FaUser className="profile-icon" /> Mon Profil
                  </Link>
                </li>
                <li className={`nav-item ${activeItem === 'Support' ? 'active' : ''}`}>
                  <Link to="/dashboard/support">Support</Link>
                </li>
                <li className={`nav-item ${activeItem === 'Services' ? 'active' : ''}`}>
                  <Link to="/dashboard/services">Services</Link>
                </li>
                <li className={`nav-item ${activeItem === 'Accueil' ? 'active' : ''}`}>
                  <Link to="/dashboard/provider">Accueil</Link>
                </li>
                <li className={`nav-item ${activeItem === 'Se Déconnecter' ? 'active' : ''}`}>
                  <Link to="/logout" onClick={handleLogout}>Se Déconnecter</Link>
                </li>
              </>
            )}
            { user.role === 'CLIENT' && (
              <>
                <li className={`nav-item ${activeItem === 'Accueil' ? 'active' : ''}`}>
                  <Link to="/dashboard/client">Accueil</Link>
                </li>
                <li className={`nav-item ${activeItem === 'Services' ? 'active' : ''}`}>
                  <Link to="/dashboard/services">Services</Link>
                </li>
                <li className={`nav-item ${activeItem === 'Mes Demandes' ? 'active' : ''}`}>
                  <Link to="/dashboard/requests">Mes Demandes</Link>
                </li>
                <li className={`nav-item ${activeItem === 'Mon Profil' ? 'active' : ''}`}>
                  <Link to="/dashboard/profile">
                    <FaUser className="profile-icon" /> Mon Profil
                  </Link>
                </li>
                <li className={`nav-item ${activeItem === 'Support' ? 'active' : ''}`}>
                  <Link to="/dashboard/support">Support</Link>
                </li>
                <li className={`nav-item ${activeItem === 'Se Déconnecter' ? 'active' : ''}`}>
                  <Link to="/logout" onClick={handleLogout}>Se Déconnecter</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
