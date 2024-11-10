import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Request.css';

const Request = () => {
  const { id } = useParams(); // Get pet ID from URL
  const [pet, setPet] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', contact: '' });
  const [isRequestSent, setIsRequestSent] = useState(false);

  // Fetch pet data based on ID
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`https://full-stack-pet-backend.onrender.com/petlist/${id}`);
        setPet(response.data);
      } catch (error) {
        console.error('Error fetching pet details:', error.message);
      }
    };
    fetchPet();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://full-stack-pet-backend.onrender.com/request', { ...formData, petId: id });
      setIsRequestSent(true); // Show confirmation message
    } catch (error) {
      console.error('Error sending request:', error.message);
    }
  };

  return (
    <div className="page-background">
      <nav className="navbar">
        <div className="navbar-logo">FourPaws</div>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/petlist">Pet-List</a></li>
          <li><a href="/recommend">Recommend-Food</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </nav>

      <div className="request-page-container">
        {pet ? (
          <>
            <h2>Request for {pet.name}</h2>
            {pet.image && (
              <img
                className="pet-image"
                src={`https://full-stack-pet-adoption.onrender.com/uploads/${pet.image.replace('E:\\project\\pet-platform\\pet\\backend\\pet-platform\\pet\\public\\uploads\\', '')}`}
                alt={pet.name}
              />
            )}
            {!isRequestSent ? (
              <div className="request-form-container">
                <form onSubmit={handleSubmit} className="request-form">
                  <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                  </label>
                  <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </label>
                  <label>
                    Contact Number:
                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
                  </label>
                  <button type="submit">Submit Request</button>
                </form>
              </div>
            ) : (
              <div className="success-message">
                <p>🎉 Congratulations! Your request for {pet.name} has been sent successfully! 🎉</p>
              </div>
            )}
          </>
        ) : (
          <p>Loading pet details...</p>
        )}
      </div>
    </div>
  );
};

export default Request;
