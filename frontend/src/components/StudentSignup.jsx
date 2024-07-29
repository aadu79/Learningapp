import React, { useState } from 'react';
import './StudentSignup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Destructure the form data for ease of use
      const { name, email, password, phoneNumber, address } = formData;
      
      // Send the signup data to the server
      const response = await axios.post('http://localhost:4999/student/signup', {
        name,
        email,
        password,
        phoneNumber,
        address,
        role: 'student'
      });

      console.log('Student registered successfully');
      navigate('/student-dashboard');
    } catch (error) {
      console.error('Error signing up:', error.response?.data || error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="overlay"></div>
      <div className="signup-content">
        <h2>Student Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn signup-btn">Sign Up</button>
        </form>
        <div className="login-prompt">
          Already have an account? <a href="/student-login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;


