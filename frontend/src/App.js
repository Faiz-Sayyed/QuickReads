import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';

import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';

import './App.css';

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    setUser(data);
  }, []);

  return (
    <div className='container'>
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <Home />
              }
            />
            <Route
              path="/login"
              element={
                <Login user={user} setUser={setUser} />
              }
            />
            <Route
              path="/register"
              element={
                <Register user={user} setUser={setUser} />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
