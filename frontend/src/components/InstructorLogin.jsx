import React, { useState } from 'react';
import './InstructorLogin.css';

const InstructorLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle instructor login logic here
    console.log('Instructor Login Data:', formData);
  };

  return (
    <div className="login-container">
      <div className="overlay"></div>
      <div className="login-content">
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
