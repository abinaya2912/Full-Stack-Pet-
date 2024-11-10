import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // Import Firebase auth
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation // Import the new CSS file for registration page
import { Link } from 'react-router-dom'; 
import './Pet.css';// Import Link for navigation

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false); // State for checkbox
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleRegister = async () => {
    if (!agree) {
      alert('Please agree to the Terms and Conditions');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registered User:', userCredential.user);
      alert('Registration successful!');
      navigate('/home'); // Redirect to homepage after registration
    } catch (error) {
      console.error('Registration Error:', error);
      alert(error.message);
    }
  };

  return (
    <div className="register-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">FourPaws</div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">PetList</Link></li>
          <li><Link to="/login">Recommented-Food</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>

      <div className="register-container">
        <div className="image-section">
          <img
            src="https://images.unsplash.com/photo-1542108226-9130e1e83cc4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV0JTIwYWRvcHRpb258ZW58MHx8MHx8fDA%3D"
            alt="Register"
            className="register-image"
          />
        </div>
        <div className="form-container">
          <h1 className="form-title">Sign Up</h1>
          <p className="form-subtitle">Enter your details to register.</p>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="terms"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label htmlFor="terms">
              I agree to the <span>Terms and Conditions</span>
            </label>
          </div>
          <button className="register-button" onClick={handleRegister}>Register</button>
          <p className="signin-text">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
