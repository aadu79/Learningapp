import  { useState } from 'react';
import './StudentLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5999/student/login', {
        email,
        password,
      });
      const { token } = response.data;
      // Store the token, e.g., in localStorage
      localStorage.setItem('authToken', token);
      console.log('Successful');
       // Redirect to the StudentDashboard
       navigate('/student-dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
    console.log('Logging in with', { email, password });
  };

  return (
    <div className="student-login-container">
      <div className="student-login-content">
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
          Dont have an account? <a href="/student-signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;

