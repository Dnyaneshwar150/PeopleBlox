import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

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
        'x-auth-token': token,
      },
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
    <div className="container">
      <h1><strong>Welcome, {username}</strong></h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum ante sed aliquet aliquam. Nulla facilisi. Proin auctor, justo ac auctor malesuada, neque felis pretium magna, in auctor nulla magna non velit.</p>
      <p>Mauris vel ligula sed felis volutpat faucibus. Vestibulum vestibulum interdum purus, at faucibus sem tincidunt vel. Fusce sit amet malesuada metus. Donec feugiat consequat ipsum, ac egestas elit sodales non.</p>
      <button className="LogoutButton" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
