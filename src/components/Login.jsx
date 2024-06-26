import React from 'react';
import Navbar from './NavBar';
import './AuthPage.css';

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className="auth-page-container">
        <div className="auth-page">
          <h2>Se connecter</h2>
          <form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Mot de passe" />
            <button type="submit">Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
