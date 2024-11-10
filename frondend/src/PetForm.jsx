import React, { useState } from 'react';
import axios from 'axios';
import './form.css';  // Importing the CSS file

const PetForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    type: '',
    breed: '',
    mediDescription: '', // New field for medical description
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Use FormData to handle file uploads
    const data = new FormData();
    data.append('name', formData.name);
    data.append('age', formData.age);
    data.append('type', formData.type);
    data.append('breed', formData.breed);
    data.append('mediDescription', formData.mediDescription); // Append medical description
    data.append('image', imageFile);  // Append the image file

    try {
      const response = await axios.post('https://full-stack-pet-backend.onrender.com/pets', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });
      alert(response.data.message);
      setFormData({ name: '', age: '', type: '', breed: '', mediDescription: '' });
      setImageFile(null); // Reset the image file input
    } catch (error) {
      alert('Error submitting form');
    }
  };

  return (
    <div className="pet-form-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">FourPaws</div>
        <ul className="navbar-links">
          <li><a href="/home">Home</a></li>
          <li><a href="/petform">PetForm</a></li>
          <li><a href="/admin/requests">Request-Page</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </nav>

      {/* Pet Form */}
      <div className="pet-form-container">
        <h1>Add a New Pet</h1>
        <form onSubmit={handleSubmit}>
          <div className="pet-form-inputs">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              required
            />
            <input
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Type"
              required
            />
            <input
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Breed"
              required
            />
            <input
              name="mediDescription" // New input for medical description
              value={formData.mediDescription}
              onChange={handleChange}
              placeholder="Medical Description"
              required
            />
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/jpeg, image/png"
              required
            />
          </div>
          <div className="pet-form-submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetForm;
