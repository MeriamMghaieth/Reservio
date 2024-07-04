import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AccueilPage.css';
import { Link } from 'react-router-dom';

const ServiceCard = () => {
  const [services, setServices] = useState([]);
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/services');
        if (Array.isArray(response.data)) {
          const servicesWithUsers = await Promise.all(
            response.data.map(async (service) => {
              const userResponse = await axios.get(
                `http://localhost:3000/users/${service.userId}`
              );
              const user = userResponse.data;
              return {
                ...service,
                user: {
                  Nom: user.Nom,
                  Email: user.Email,
                  Num: user.Num,
                },
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
  }, []);

  const handleReservation = async (serviceId, date) => {
    try {
      const userId = JSON.parse(atob(token.split('.')[1])).id; // Extract userId from JWT token

      const response = await axios.post(
        'http://localhost:3000/reservation',
        {
          serviceId: serviceId,
          Date: date, // Envoyer la date saisie par l'utilisateur telle quelle
          userId: userId, // Ajouter userId au payload de la requête
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Réponse de création de réservation :', response.data);
      // Ajoutez ici la logique pour gérer la réponse de la création de réservation
    } catch (error) {
      console.error('Erreur lors de la création de réservation :', error);
      // Ajoutez ici la logique pour gérer les erreurs de création de réservation
    }
  };

  return (
    <div className='services-container'>
      <h1>Liste des Services</h1>
      {services.length === 0 ? (
        <p>Aucun service trouvé.</p>
      ) : (
        <div className='services-list'>
          {services.map((service) => (
            <div key={service.ID} className='service-item'>
              <img
                src={`http://localhost:3000/uploads/${service.Image}`}
                alt={service.Titre}
                className='service-image'
                style={{ width: '300px', height: 'auto', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
              />
              <div className='service-details'>
                <h2>{service.Titre}</h2>
                <p>Description: {service.Description}</p>
                <p>Prix: {service.Prix} Dt</p>
                <label>Date de réservation:</label>
                <input
                  type='datetime-local'
                  onChange={(e) => {
                    const date = new Date(e.target.value).toISOString();
                    handleReservation(service.ID, date);
                  }}
                />
                <button
                  className='reservation-button'
                  onClick={() => handleReservation(service.ID, service.Date)}>
                  Réserver
                </button>
                {service.user && (
                  <div className='user-info'>
                    <h3>Fournisseur :</h3>
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

export default ServiceCard;
