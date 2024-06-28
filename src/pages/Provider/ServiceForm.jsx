import React, { useState } from 'react';
import axios from 'axios';

const ServiceForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Titre', title);
    formData.append('Description', description);
    formData.append('Prix', price);
    formData.append('Date', date);
    formData.append('Place', place);
    formData.append('categorieId', categoryId);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('jwt');
      await axios.post('http://localhost:3000/services', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      alert('Service created successfully');
    } catch (error) {
      console.error('Error creating service:', error);
      alert('Error creating service');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label>Place:</label>
        <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
      </div>
      <div>
        <label>Category ID:</label>
        <input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <button type="submit">Create Service</button>
    </form>
  );
};

export default ServiceForm;
