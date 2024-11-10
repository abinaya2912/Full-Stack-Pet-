import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminrequest.css';

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [pets, setPets] = useState({});
  const [successEntries, setSuccessEntries] = useState([]);

  // Fetch requests and success entries for the admin page
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('https://full-stack-pet-backend.onrender.com/getrequests');
        const requestData = response.data;
        setRequests(requestData);

        // Fetch pet details for each request
        const petIds = requestData.map(request => request.petId);
        const petResponse = await axios.get('https://full-stack-pet-backend.onrender.com/getpetlist', {
          params: { ids: petIds.join(',') }
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

    const fetchSuccessEntries = async () => {
      try {
        const response = await axios.get('https://full-stack-pet-backend.onrender.com/getSuccessEntries');
        setSuccessEntries(response.data);
      } catch (error) {
        console.error('Error fetching success entries:', error.message);
      }
    };

    fetchRequests();
    fetchSuccessEntries();
  }, []);

  const handleSendEmail = async (userEmail, petName, petId, requestId) => {
    console.log("user", userEmail);

    try {
      await axios.post('https://full-stack-pet-backend.onrender.com/send-mail', {
        userEmail,
        petName,
      });

      // Move the request and pet to the success collection
      await axios.post('https://full-stack-pet-backend.onrender.com/mark-success', {
        requestId,
        petId,
      });

      alert('Email sent successfully, and request moved to success collection');
      
      // Update the requests and pets state to reflect the removal
      setRequests(requests.filter((req) => req._id !== requestId));
      setPets((prevPets) => {
        const newPets = { ...prevPets };
        delete newPets[petId];
        return newPets;
      });

      // Refresh success entries to include the new success entry
      const updatedSuccessEntries = await axios.get('https://full-stack-pet-backend.onrender.com/getSuccessEntries');
      setSuccessEntries(updatedSuccessEntries.data);
    } catch (error) {
      console.error('Error processing request:', error);
      alert('Error processing request');
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
                      src={`https://full-stack-pet-backend.onrender.com/uploads/${pets[request.petId].image.replace('E:\\project\\pet-platform\\pet\\backend\\pet-platform\\pet\\public\\uploads\\', '')}`} 
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
                <p>Email: {request.email}</p>
                <button
                  onClick={() => handleSendEmail(request.email, pets[request.petId]?.name, request.petId, request._id)}
                >
                  Send Email
                </button>
              </div>
            ))
          )}
        </div>

        {/* Success Entries Section */}
        {/* Success Entries Section */}
<h2>Successful Requests</h2>
<div className="requests-list">
  {successEntries.length === 0 ? (
    <p>No successful requests available</p>
  ) : (
    successEntries.map((entry) => (
      <div key={entry._id} className="request-item">
        <div className="pet-image-container">
          {/* Display the pet image */}
          {entry.pet && entry.pet.image && (
            <img 
              src={`https://full-stack-pet-backend.onrender.com/uploads/${entry.pet.image.replace('E:\\project\\pet-platform\\pet\\backend\\pet-platform\\pet\\public\\uploads\\', '')}`} 
              alt={entry.pet.name} 
              className="pet-image" 
            />
          )}
        </div>
        <h3>
          {entry.request.name} adopted pet: {entry.pet ? entry.pet.name : 'Loading...'}
        </h3>
        <p>Contact: {entry.request.contact}</p>
        <p>Email: {entry.request.email}</p>
        <p>Success Date: {new Date(entry.successDate).toLocaleDateString()}</p>
      </div>
    ))
    )}
   </div>

    </div>
    </div>
  );
};

export default AdminRequests;
