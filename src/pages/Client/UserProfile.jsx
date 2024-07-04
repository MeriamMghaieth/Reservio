import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userprofile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.get('http://localhost:3000/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data); // Assuming response.data is an object with properties like Nom, Email, Num
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="user-profile">
      <h2>Mon Profile</h2>
      <div className="user-info">
        {user && (
          <>
            <p><FontAwesomeIcon icon={faUser} /> <strong>Nom:</strong> {user.Nom}</p>
            <p><FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong> {user.Email}</p>
            <p><FontAwesomeIcon icon={faPhone} /> <strong>Numéro:</strong> {user.Num}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
