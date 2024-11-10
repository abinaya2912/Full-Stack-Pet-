import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    const adminUsernameStatic = 'admin';
    const adminPasswordStatic = 'admin123';
    if (adminUsername === adminUsernameStatic && adminPassword === adminPasswordStatic) {
      alert('Admin login successful!');
      navigate('/homee');
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="admin-page-background">
      <div className="admin-login-wrapper">
        <h1 className="admin-login-title">Admin Login</h1>
        <input
          type="text"
          placeholder=" Admin Username"
          className="admin-input"
          value={adminUsername}
          onChange={(e) => setAdminUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder=" Admin Password"
          className="admin-input"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />
        <button onClick={handleAdminLogin} className="admin-button">
          Login as Admin
        </button>
      </div>
    </div>
  );
};

export default Admin;
