import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;
  const navigate = useNavigate(); // Initialize navigate from useNavigate

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://peopleblox.onrender.com/api/auth/signup', { username, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Account created successfully! Redirecting to home...');
      navigate('/home'); // Use navigate for redirection
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Signup failed. Please try again.';
      toast.error(errorMsg);
      console.error(err);
    }
  };

  return (
    <>
      <div className="signup-card">
        <h2>Sign Up</h2>
        <h3>Enter your details</h3>
        <ToastContainer className="toast-container" />
        <form className="signup-form" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <button type="submit">SIGN UP</button>
        </form>
        <button className="redirect-btn" onClick={() => navigate('/')}>Already Have Account? Login Here</button>
      </div>
    </>
  );
};

export default Register;
