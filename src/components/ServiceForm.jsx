import React, { useState } from 'react';
import './ServiceForm.css';

const ServiceForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log({
      title,
      description,
      location,
      image,
      startDate,
      endDate,
      price,
    });
  };

  return (
    <div className="service-form-container">
      <form className="service-form" onSubmit={handleSubmit}>
        <h2>Publier un Service</h2>
        <label>Titre</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <label>Localisation</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <label>Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label>Disponible de :</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <label>Fin d'offre :</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <label>Prix</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Publier</button>
      </form>
      <div className="service-info">
        <h3>Comment publier un service :</h3>
        <p>
          Remplissez le formulaire à gauche pour publier un service. Assurez-vous de fournir des informations précises et complètes.
        </p>
        <ul>
          <li><strong>Titre :</strong> Donnez un titre clair et descriptif.</li>
          <li><strong>Description :</strong> Fournissez une description détaillée de votre service.</li>
          <li><strong>Localisation :</strong> Indiquez l'endroit où le service est disponible.</li>
          <li><strong>Image :</strong> Ajoutez une image représentative de votre service.</li>
          <li><strong>Date de disponibilité :</strong> Sélectionnez les dates de début et de fin de disponibilité de votre service.</li>
          <li><strong>Prix :</strong> Indiquez le prix de votre service.</li>
        </ul>
      </div>
    </div>
  );
};

export default ServiceForm;
