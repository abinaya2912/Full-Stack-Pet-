import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Pet.css';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState(''); // For filtering by type (Dogs, Cats, Birds)
  const navigate = useNavigate(); // Use navigate hook for programmatic navigation

  // Fetch pets from the server based on filters (search query and type)
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('https://full-stack-pet-adoption.onrender.com/petlist', {
          params: {
            search: searchQuery,
            type: selectedType, // Send selected type for filtering
          },
        });
        setPets(response.data); // Store the fetched pets in state
      } catch (error) {
        console.error('Error fetching pets:', error.message);
      }
    };

    fetchPets();
  }, [searchQuery, selectedType]); // Re-fetch data when filters change

  // Handle the "Request" button click
  const handleRequestClick = (petId) => {
    // Redirect to the Request page with the pet's id as a query parameter
    navigate(`/request/${petId}`);
  };

  return (
    <div>
      {/* Transparent Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">FourPaws</div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/petlist">Pet-List</Link></li>
          <li><Link to="/recommend">Recommend-Food</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>

      <div className="pet-list-container">
        <h2>Pet List</h2>

        {/* Search and Type Selector */}
        <div className="search-category-container">
          <input
            type="text"
            placeholder="Search pets by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="type-selector">
            <label>Type: </label>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="">All</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
            </select>
          </div>
        </div>

        {/* Display filtered pets */}
        <div className="pet-container">
          {pets.length > 0 ? (
            pets.map((pet) => (
              <div className="pet-item" key={pet._id}>
                <h3>{pet.name}</h3>
                <p>Age: {pet.age}</p>
                <p>Type: {pet.type}</p>
                <p>Breed: {pet.breed}</p>
                {pet.image && (
                  <img
                    className="pet-item-image"
                    src={`https://full-stack-pet-adoption.onrender.com/uploads/${pet.image.replace('E:\\project\\pet-platform\\pet\\backend\\pet-platform\\pet\\public\\uploads\\', '')}`}  // Strip the absolute path and leave the relative part
                    alt={pet.name}
                  />
                )}
                <button onClick={() => handleRequestClick(pet._id)}>Request</button> {/* Request button */}
              </div>
            ))
          ) : (
            <p>No pets found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetList;
