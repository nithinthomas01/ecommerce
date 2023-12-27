import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/map/Home';
import Login from './components/map/Login'
import './App.css'


const App = () => {
  // Check if the user is authenticated (e.g., check the presence of login token)
  const isAuthenticated = !!localStorage.getItem('loginToken');
  return (
    <>
    
      <Routes>
        {/* Public Route for Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Route for Home page */}
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

        {/* Redirect other paths to login */}
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    

   
    
    </>
  )
}

export default App







