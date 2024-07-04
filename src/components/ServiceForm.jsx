import React, { useState } from 'react';
import './ServiceForm.css';

const ServiceForm = () => {
  const [Titre, setTitre] = useState('');
  const [Description, setDescription] = useState('');
  const [Place, setPlace] = useState('');
  const [Image, setImage] = useState(null);
  const [Date, setDate] = useState('');
  const [Prix, setPrix] = useState('');
  const [categorie, setCategorie] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Titre', Titre);
    formData.append('Description', Description);
    formData.append('Place', Place);
    formData.append('Image', Image);
    formData.append('Date', Date);
    formData.append('Prix', Prix);
    formData.append('categorie', Categorie);

    try {
      const response = await fetch('http://localhost:5173/post-services', { // Change this to your actual API endpoint
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Service créé avec succès:', data);
    } catch (error) {
      console.error('Erreur lors de la création du service:', error);
    }
  };

  return (
    <div className="service-form-container">
      <form className="service-form" onSubmit={handleSubmit}>
        <h2>Publier un Service</h2>
        <label>Titre</label>
        <input
          type="text"
          value={Titre}
          onChange={(e) => setTitre(e.target.value)}
          required
        />
        <label>Description</label>
        <textarea
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <label>Localisation</label>
        <input
          type="text"
          value={Place}
          onChange={(e) => setPlace(e.target.value)}
          required
        />
        <label>Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <label>Date :</label>
        <input
          type="date"
          value={Date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label>Prix</label>
        <input
          type="number"
          value={Prix}
          onChange={(e) => setPrix(e.target.value)}
          requiredx 
        />
        <label>Catégorie</label>
        <input
          type="text"
          value={Categorie}
          onChange={(e) => setCategorie(e.target.value)}
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
          <li><strong>Date :</strong> Sélectionnez la date de disponibilité de votre service.</li>
          <li><strong>Prix :</strong> Indiquez le prix de votre service.</li>
          <li><strong>Catégorie :</strong> Indiquez la catégorie de votre service.</li>
        </ul>
      </div>
    </div>
  );
};

export default ServiceForm;
