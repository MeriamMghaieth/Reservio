import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ServiceForm.css';
const ServiceForm = () => {
	const navigate = useNavigate();
	const [serviceData, setServiceData] = useState({
		Titre: '',
		Description: '',
		Prix: 0,
		Date: '',
		Place: '',
		categorieId: '', // Utilisé pour stocker l'ID de la catégorie sélectionnée
		image: null,
	});
	const [selectedCategoryName, setSelectedCategoryName] = useState('Categorie');
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		try {
			const response = await axios.get('http://localhost:3000/categories');
			setCategories(response.data);
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setServiceData({ ...serviceData, [name]: value });
	};

	const handleCategoryChange = e => {
		const selectedcategorieId = parseInt(e.target.value); // Convertir en nombre entier
		const categoryName =
			categories.find(category => category.ID === selectedcategorieId)?.Nom ||
			'';
		setServiceData({ ...serviceData, categorieId: selectedcategorieId });
		setSelectedCategoryName(categoryName); // Met à jour le nom de la catégorie sélectionnée
	};

	const handleImageChange = e => {
		const file = e.target.files[0];
		setServiceData({ ...serviceData, image: file });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const token = localStorage.getItem('jwt');
			if (!token) {
				throw new Error('No token found');
			}

			const formData = new FormData();
			formData.append('Titre', serviceData.Titre);
			formData.append('Description', serviceData.Description);
			formData.append('Prix', serviceData.Prix);
			formData.append('Date', serviceData.Date);
			formData.append('Place', serviceData.Place);
			formData.append('categorieId', serviceData.categorieId); // Utilisation de categorieId au lieu de categorieId

			if (serviceData.image instanceof File) {
				formData.append('image', serviceData.image);
			}

			const response = await axios.post(
				'http://localhost:3000/services',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${token}`,
					},
				},
			);

			console.log('Service created successfully:', response.data);
			navigate('/provider/dashboard');
		} catch (error) {
			console.error(
				'Error creating service:',
				error.response ? error.response.data : error.message,
			);
		}
	};

	return (
		<div className="service-form-container">
            <div className="service-form">
			<h2>Create a New Service</h2>
            <div className="service-info">
        <h3>Comment publier un service :</h3>
        <p>
          Remplissez le formulaire à gauche pour publier un service. Assurez-vous de fournir des informations précises et complètes.
        </p>
        <ul>
          <li><strong>Titre :</strong> Donnez un titre clair et descriptif.</li><br/>
          <li><strong>Description :</strong> Fournissez une description détaillée de votre service.</li><br/>
          <li><strong>Localisation :</strong> Indiquez l'endroit où le service est disponible.</li><br/>
          <li><strong>Image :</strong> Ajoutez une image représentative de votre service.</li><br/>
          <li><strong>Date de disponibilité :</strong> Sélectionnez les dates de début et de fin de disponibilité de votre service.</li><br/>
          <li><strong>Prix :</strong> Indiquez le prix de votre service.</li><br/>
          <li><strong>Catégorie :</strong> Choisissez la catégorie qui décrit le mieux votre service.</li> <br/>{/* Explication ajoutée */}
        </ul></div></div>
            <form className="service-form" onSubmit={handleSubmit}>
				<div>
					<label htmlFor='Titre'>Title:</label>
					<input
						type='text'
						id='Titre'
						name='Titre'
						value={serviceData.Titre}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label htmlFor='Description'>Description:</label>
					<textarea
						id='Description'
						name='Description'
						value={serviceData.Description}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label htmlFor='Prix'>Price:</label>
					<input
						type='number'
						id='Prix'
						name='Prix'
						value={serviceData.Prix}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label htmlFor='Date'>Date:</label>
					<input
						type='date'
						id='Date'
						name='Date'
						value={serviceData.Date}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label htmlFor='Place'>Place:</label>
					<input
						type='text'
						id='Place'
						name='Place'
						value={serviceData.Place}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label htmlFor='categorieId'>Category:</label>
					<select
                        itemType='number'
						id='categorieId'
						name='categorieId'
						value={serviceData.categorieId}
						onChange={handleCategoryChange}
						required
					>
						<option value=''>Select a category</option>
						{categories.map(category => (
							<option key={category.ID} value={category.ID}>
								{category.Nom}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor='image'>Image:</label>
					<input
						type='file'
						id='image'
						name='image'
						onChange={handleImageChange}
						accept='image/*' // Optionnel : limiter aux fichiers image
					/>
				</div>
				<button type='submit'>Create Service</button>
			</form>
		</div>
	);
};

export default ServiceForm;
