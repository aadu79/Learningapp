import React, { useState } from 'react';
import './StudentLogin.css';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Logging in with', { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>Student Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn login-btn">Login</button>
        </form>
        <p className="signup-prompt">
          Don't have an account? <a href="/student-signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;

