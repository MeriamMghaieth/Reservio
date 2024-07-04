import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AccueilPage.css';

const AccueilPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/services');
        if (Array.isArray(response.data)) {
          const servicesWithUsers = await Promise.all(
            response.data.map(async (service) => {
              // Récupérer les informations sur l'utilisateur pour chaque service
              const userResponse = await axios.get(`http://localhost:3000/users/${service.userId}`);
              const user = userResponse.data;
              return {
                ...service,
                user: {
                  Nom: user.Nom,
                  Email: user.Email,
                  Num: user.Num
                }
              };
            })
          );
          setServices(servicesWithUsers);
        } else {
          console.error('Réponse API non valide : le tableau de services est introuvable.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des services :', error);
      }
    };

    fetchServices();
  }, []); // Le tableau vide en second argument assure que useEffect s'exécute une seule fois après le montage initial

  return (
    <div className="services-container">
      <h1>
        Liste des Services{' '}
        <Link to="/provider/dashboard/reservations" className="publish-link">
          Publier ici
        </Link>
      </h1>
      {services.length === 0 ? (
        <p>Aucun service trouvé.</p>
      ) : (
        <div className="services-list">
          {services.map((service) => (
            <div key={service.ID} className="service-item">
              <img src={`http://localhost:3000/services/${service.Image}`} alt={service.Titre} className="service-image" />
              <div className="service-details">
                <h2>{service.Titre}</h2>
                <p>Description: {service.Description}</p>
                <p>Prix: {service.Prix} Dt</p>
                <p>Date: {new Date(service.Date).toLocaleDateString()}</p>
                {service.user && (
                  <div className="user-info">
                    <h3>Fournisseur : </h3>
                    <p>Nom: {service.user.Nom}</p>
                    <p>Email: {service.user.Email}</p>
                    <p>Numéro: {service.user.Num}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccueilPage;
