import React, { useState } from 'react';
import './InstructorLogin.css';
import axios from 'axios';

const InstructorLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/instructor/login', {
        email,
        password,
      });
      // Store the token, e.g., in localStorage
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      console.log('Successful');
    } catch (error) {
      console.error('Error logging in:', error);
    }
    console.log('Instructor Login Data:', formData);
  };

  return (
    <div className="instructor-login-container">
      <div className="overlay"></div>
      <div className="instructor-login-content">
        <h2>Instructor Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn login-btn">Login</button>
        </form>
        <div className="signup-prompt">
          Don't have an account? <a href="/instructor-signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default InstructorLogin;
