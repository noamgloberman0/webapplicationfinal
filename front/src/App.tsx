import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  
  return (
    <Router>
      <Routes>

        <Route path="/home" element={   
          <>     
            <Navbar />     
            <Home />   
          </> 
        }/>
        <Route path="/profile/:id" element={
          <>
            <Navbar />
            <Profile />
          </>
        }/>
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      
      </Routes>
    </Router>
  );
}

export default App;