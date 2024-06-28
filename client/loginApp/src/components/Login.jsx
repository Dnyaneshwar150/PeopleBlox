// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'
const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      
      window.location.href = '/home';
    } catch (err) {
      // Extract the error message and show it in a toast
      const errorMsg = err.response?.data?.msg || 'Login failed. Please try again.';
      toast.error(errorMsg);
      console.error(err);
    }
  };

  return (
    <>
      <div className="container">
      <h1>Login</h1>
      <ToastContainer className="toast-container" />
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} />
        <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => window.location.href = '/signup'}>Sign Up</button>
    </div>
    </>
  );
};

export default LoginForm;
