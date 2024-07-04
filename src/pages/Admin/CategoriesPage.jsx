import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoriesPage.css';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
      setError('Erreur lors de la récupération des catégories');
    }
  };

  const deleteCategory = async (id) => {
    try {
      const token = localStorage.getItem('jwt'); // Récupérer le token JWT
      await axios.delete(`http://localhost:3000/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter l'en-tête d'autorisation
        },
      });
      setCategories(categories.filter((category) => category.ID !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie :', error);
      setError('Erreur lors de la suppression de la catégorie');
    }
  };

  const addCategory = async () => {
    try {
      const token = localStorage.getItem('jwt'); // Récupérer le token JWT
      const response = await axios.post('http://localhost:3000/categories', {
        Nom: newCategoryName,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter l'en-tête d'autorisation
        },
      });
      setCategories([...categories, response.data]);
      setNewCategoryName('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la catégorie :', error);
      setError('Erreur lors de l\'ajout de la catégorie');
    }
  };

  return (
    <div className="categories-container">
      <h1>Liste des catégories</h1>
      {error && <p>{error}</p>}
      <ul className="categories-list">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.ID}>
              {category.Nom}
              <button onClick={() => deleteCategory(category.ID)}>Supprimer</button>
            </li>
          ))
        ) : (
          <li>Aucune catégorie disponible</li>
        )}
      </ul>
      <div className="new-category-form">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Nouvelle catégorie"
        />
        <button onClick={addCategory}>Ajouter</button>
      </div>
    </div>
  );
};

export default CategoriesPage;
