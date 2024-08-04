import  { useState } from 'react';
import './InstructorLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InstructorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5999/instructor/login', {
        email,
        password,
      });
      const { token } = response.data;
      // Store the token, e.g., in localStorage
      localStorage.setItem('authToken', token);
      navigate('/instructor-dashboard');
    } catch (error) {
      alert('Incorrect e-mail or password');
    }
  };

  return (
    <div className="instructor-login-container">
      <div className="instructor-login-content">
        <h2>Instructor Login</h2>
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
          Dont have an account? <a href="/student-signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default InstructorLogin;
