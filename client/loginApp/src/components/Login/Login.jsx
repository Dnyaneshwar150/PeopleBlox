import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, { username, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful! Redirecting to home...');
      setTimeout(() => {
        window.location.href = '/home';
      }, 200); // Add a small delay to allow the toast to be visible
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Login failed. Please try again.';
      toast.error(errorMsg);
      console.error(err);
    }
  };

  return (
    <>
      <div className="login-card">
        <h2>Login</h2>
        <h3>Enter your credentials</h3>
        <ToastContainer className="toast-container" />
        <form className="login-form" onSubmit={onSubmit}>
          <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} />
          <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} />
          <button type="submit">LOGIN</button>
        </form>
        <button className="redirect-btn" onClick={() => window.location.href = '/signup'}>Sign Up</button>
      </div>
    </>
  );
};

export default Login;
