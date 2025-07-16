import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
export default App;
