import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PetForm from './PetForm';
import PetList from './PetList';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Admin from './Admin';
import AdminRequests from './AdminRequests';
import Request from './Request';
import Homee from './Homee';
import Logout from './Logout';

import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar is inside HomePage and displayed on every page */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/petform" element={<PetForm />} />
          <Route path="/petlist" element={<PetList />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<Admin/>} />
          <Route path="/request/:id" element={<Request />} />
          <Route path="/admin/requests" element={<AdminRequests />} />
          <Route path="/homee" element={<Homee />} />
          <Route path="/logout" element={<Logout />} />
          

          {/* Corrected this line */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;