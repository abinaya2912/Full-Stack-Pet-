import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminrequest.css';

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [pets, setPets] = useState({}); // To store pet details by ID

  // Fetch requests for the admin page
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getrequests');
        const requestData = response.data;
        setRequests(requestData);

        // Fetch pet details for each request
        const petIds = requestData.map(request => request.petId);
        const petResponse = await axios.get('http://localhost:5000/getpetlist', {
          params: { ids: petIds.join(',') } // Send petIds as a comma-separated list
        });

        // Map pet details by ID
        const petDetails = petResponse.data.reduce((acc, pet) => {
          acc[pet._id] = pet;
          return acc;
        }, {});

        setPets(petDetails);
      } catch (error) {
        console.error('Error fetching requests:', error.message);
      }
    };

    fetchRequests();
  }, []);
  const handleSendEmail = async (userEmail, petName,petId) => {
    const subject = `Request for Pet: ${petName}`;
    const text = `Hello, we have received a request for the pet named ${petName}.`;
    console.log("user",userEmail);

    try {
      await axios.post('http://localhost:5000/send-mail', {
        userEmail,
        petName,
        petId,
      });
      alert('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email');
    }
  };


  return (
    <div className="App">
      {/* Transparent Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">FourPaws</div>
        <ul className="navbar-links">
        <li><a href="/homee">Home</a></li>
          <li><a href="/petform">Pet-Form</a></li>
          <li><a href="admin/requests">Admin-Request</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </nav>
    <div className="admin-requests-page">
      <h2>All Requests</h2>
      <div className="requests-list">
        {requests.length === 0 ? (
          <p>No requests available</p>
        ) : (
          requests.map((request) => (
            <div key={request._id} className="request-item">
              <div className="pet-image-container">
                {/* Display the pet image */}
                {pets[request.petId] && pets[request.petId].image && (
                  <img 
                    src={`http://localhost:5000/uploads/${pets[request.petId].image.replace('E:\\project\\pet-platform\\pet\\backend\\pet-platform\\pet\\public\\uploads\\', '')}`} 
                    alt={pets[request.petId].name} 
                    className="pet-image" 
                  />
                )}
              </div>
              <h3>
                {request.name} requested for pet: 
                {pets[request.petId] ? pets[request.petId].name : 'Loading...'}
              </h3>
              <p>Contact: {request.contact}</p>
              <p>Email: {request.email}</p> {/* Display email */}
              <button
                onClick={() => handleSendEmail(request.email, pets[request.petId]?.name,pets[request.petId])}
              >
                Send Email
              </button>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default AdminRequests;
