import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const BASE_URL = 'https://peopleblox.onrender.com'; // Ensure BASE_URL is defined

const Home = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    axios.get(`${BASE_URL}/api/auth/profile`, {
      headers: {
        'x-auth-token': token,
      },
    })
      .then(res => {
        setUsername(res.data.username);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(err => {
        console.error(err);
        localStorage.removeItem('token'); // Ensure token is cleared if there's an error
        navigate('/');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  return (
    <div className="container">
      <h1><strong>Welcome {username}</strong></h1>
. <p>     PeopleBlox is a cutting-edge Talent Intelligence SaaS platform that helps global organizations in their talent transformation journey </p>      
<p>With a unique patent-pending Competency Deconstruction Framework and a dynamic Competency Lifecycle Management SaaS platform, PeopleBlox enables companies to measure their Talent Readiness Index (TRI) and efficiently manage employee competencies throughout their journey within the organization.</p>
      <button className="LogoutButton" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
