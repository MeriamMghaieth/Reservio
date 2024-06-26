import React from 'react';
import Navbar from './NavBar';
import './AuthPage.css';

const RegisterProvider = () => {
  return (
    <div>
      <Navbar />
      <div className="auth-page-container">
        <div className="auth-page">
          <h2>Inscription Fournisseur</h2>
          <form>
            <input type="text" placeholder="Nom" />
            <input type="text" placeholder="Prénom" />
            <input type="tel" placeholder="Numéro de téléphone" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Mot de passe" />
            <input type="password" placeholder="Confirmer le mot de passe" />
            <button type="submit">Confirmer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterProvider;
