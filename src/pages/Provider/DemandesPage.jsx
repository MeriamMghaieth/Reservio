import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DemandesPage.css';

const DemandesPage = () => {
  const [activeTab, setActiveTab] = useState('PENDING');
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations(activeTab);
  }, [activeTab]);

  const fetchReservations = async (status) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.get(`http://localhost:3000/reservation/status/${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReservations(response.data);
    } catch (error) {
      console.error(`Error fetching ${status} reservations:`, error);
    }
  };

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem('jwt');
      await axios.patch(`http://localhost:3000/reservation/${id}/accept`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchReservations(activeTab); // Mettre à jour les réservations après acceptation
    } catch (error) {
      console.error('Error accepting reservation:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('jwt');
      await axios.patch(`http://localhost:3000/reservation/${id}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchReservations(activeTab); // Mettre à jour les réservations après refus
    } catch (error) {
      console.error('Error rejecting reservation:', error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderReservations = () => {
    return reservations.map((reservation) => (
      <li key={reservation.ID} className="demande-item">
        <div className='cent'>
          <h3>Service: {reservation.service ? reservation.service.Titre : 'Service non spécifié'}</h3>
          <p>Date de réservation: {new Date(reservation.DATE).toLocaleDateString()}</p>
          <p>Statut: {reservation.statut}</p>
          <p>Utilisateur: {reservation.user ? `${reservation.user.Nom} ${reservation.user.Prenom}` : 'Utilisateur non spécifié'}</p>
          <p>Email: {reservation.user ? reservation.user.Email : 'Email non spécifié'}</p>
          <p>Numéro: {reservation.user ? reservation.user.Num : 'Numéro non spécifié'}</p>
        </div>
        {activeTab === 'PENDING' && (
          <div className="actions cent">
            <button onClick={() => handleAccept(reservation.ID)}>Accepter</button>
            <button onClick={() => handleReject(reservation.ID)}>Refuser</button>
          </div>
        )}
      </li>
    ));
  };

  return (
    <div className="demandes-page">
      <h2>Demandes</h2>
      <div className='cent'>
      <div className="tabs">
        <button className={activeTab === 'PENDING' ? 'active' : ''} onClick={() => handleTabChange('PENDING')}>En attente</button>
        <button className={activeTab === 'ACCEPTED' ? 'active' : ''} onClick={() => handleTabChange('ACCEPTED')}>Acceptées</button>
        <button className={activeTab === 'REJECTED' ? 'active' : ''} onClick={() => handleTabChange('REJECTED')}>Rejetées</button>
      </div></div>
      <ul>
        {renderReservations()}
      </ul>
    </div>
  );
};

export default DemandesPage;
