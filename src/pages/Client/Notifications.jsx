import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const userId = JSON.parse(atob(token.split('.')[1])).id;
      const response = await axios.get(
        `http://localhost:3000/reservation/${userId}/accepted-rejected`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <div className='notifications-container'>
      <h1>Notifications</h1>
      {notifications.length === 0 ? (
        <p>Aucune notification trouvée.</p>
      ) : (
        <ul className='notifications-list'>
          {notifications.map(notification => (
            <li key={notification.id} className='notification-item'>
              <p>
                <strong>Statut:</strong> {notification.statut}
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(notification.DATE).toLocaleDateString()}
              </p>
              <p>
                <strong>Titre du service:</strong> {notification.service.Titre}
              </p>
              <p>
                <strong>Description du service:</strong> {notification.service.Description}
              </p>
              <p>
                <strong>Message:</strong> {getMessageForStatus(notification.statut)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const getMessageForStatus = (statut) => {
  if (statut === 'ACCEPTED') {
    return 'Votre réservation a été acceptée.';
  } else if (statut === 'REJECTED') {
    return 'Votre réservation a été rejetée.';
  } else {
    return 'Statut de réservation inconnu.';
  }
};

export default Notifications;
