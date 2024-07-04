import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './List.css';
const ProviderServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.get('http://localhost:3000/services', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="provider-services">
      <h2>Vos Services</h2>
      <ul>
        {services.map((service) => (
          <li key={service.ID}> {/* Ensure the key is unique */}
            <h3>{service.Titre}</h3>
            <p>{service.Description}</p>
            {service.Image && (
              <img src={`data:image/jpeg;base64,${service.Image}`} alt={service.Titre} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProviderServices;
