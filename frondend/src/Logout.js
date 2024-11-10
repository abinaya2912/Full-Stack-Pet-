import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const Logout = () => {
  const [showConfirmation, setShowConfirmation] = useState(true); // Automatically show the confirmation popup
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Toggle for success message
  const navigate = useNavigate(); // React Router's navigate function

  // Handle logout action if the user clicks "Yes"
  const handleYes = () => {
    // Clear authentication data from localStorage and sessionStorage
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');

    // Show success message
    setShowSuccessMessage(true);

    // Redirect to home page after 2 seconds to give the user time to see the success message
    setTimeout(() => {
      navigate('/'); // Redirect to home
    }, 2000);
  };

  // Handle "No" click to stay on the page
  const handleNo = () => {
    setShowConfirmation(false); // Hide confirmation popup
    navigate('/home'); // Redirect to home page
  };

  return (
    <div className="log-background">
      <div className="logout-container">
        {/* Confirmation message with Yes/No options */}
        {showConfirmation && (
          <div className="confirmation-popup">
            <h2>Do you want to logout from this website?</h2>
            <div className="confirmation-buttons">
              <button onClick={handleYes} className="yes-btn">Yes</button>
              <button onClick={handleNo} className="no-btn">No</button>
            </div>
          </div>
        )}

        {/* Success message displayed after logout */}
        {showSuccessMessage && (
          <div className="success-message">
            <p>You have successfully logged out!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logout;
