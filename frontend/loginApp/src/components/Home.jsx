// Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); 
      return;
    }
    axios.get('http://localhost:8080/api/auth/profile', {
      headers: {
        'x-auth-token': token
      }
    })
    .then(res => {
      setUsername(res.data.username);
    })
    .catch(err => {
      console.error(err);
      
      navigate('/');
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };

  return (
    <div>
      <h1>Welcome, {username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
