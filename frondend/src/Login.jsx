import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// Google Authentication provider
const provider = new GoogleAuthProvider();


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle email login
  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigate('/home');
    } catch (error) {
      console.error('Login Error:', error);
      alert(error.message);
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User Info:', result.user);
      alert(`Welcome, ${result.user.displayName}`);
      navigate('/home');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      alert(error.message);
    }
  };

  // Navigate to the registration page
  const goToRegister = () => navigate('/register');

  // Navigate to Admin login page
  const goToAdminLogin = () => navigate('/admin-login');

  return (
    <div className="login-page">
      {/* User login section */}
      <div className="login-form-container user-login-container">
        <h1 className="login-form-title">
          Log<span style={{ color: 'red' }}>in</span>
        </h1>
        <p className="login-form-subtitle">Enter your details to Login.</p>
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleEmailLogin} className="login-button">Log In</button>
        <p className="forgot-password">Forgot your Password?</p>
        <hr className="login-hr" />
        <button onClick={handleGoogleSignIn} className="google-signin-button">
          Continue with Google
        </button>
        <p>
          Do not have an account?{' '}
          <span onClick={goToRegister} className="register-link">Register</span>
        </p>

        <p>
          <span onClick={goToAdminLogin} className="admin-login-link">Admin Login</span>
        </p>
      </div>
      
      {/* Image section */}
      <div className="login-image-container">
        <img
          src="https://media.istockphoto.com/id/1437973980/vector/adopt-me-poster-with-cute-dog-in-cardboard-box-colorful-vector-banner-template-with-cartoon.jpg?s=612x612&w=0&k=20&c=_CQIMEkDOgjraO0fxbvhJpYvgOUa4x-6MIepEe-9BRs="
          alt="Login Image"
          className="login-image"
        />
      </div>
    </div>
  );
};

export default Login;
