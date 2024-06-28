import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/Action/Auth';
import Navbar from '../components/NavBar';
import './AuthPage.css';

const RegisterProvider = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    num: '',
    motDePasse: '',
    confirmerMotDePasse: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.motDePasse !== formData.confirmerMotDePasse) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/signup/service-provider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          num: formData.num,
          motDePasse: formData.motDePasse,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setUser({ type: 'service-provider', token: data.token }));
        alert('Inscription réussie!');
      } else {
        alert('Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div>
      <div className="auth-page-container">
        <div className="auth-page">
          <h2>Inscription Fournisseur</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="nom" placeholder="Nom" onChange={handleChange} />
            <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} />
            <input type="tel" name="num" placeholder="Numéro de téléphone" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="motDePasse" placeholder="Mot de passe" onChange={handleChange} />
            <input type="password" name="confirmerMotDePasse" placeholder="Confirmer le mot de passe" onChange={handleChange} />
            <button type="submit">Confirmer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterProvider;
