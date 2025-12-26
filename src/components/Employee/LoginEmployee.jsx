import React, { useState } from 'react';
import './LoginEmployee.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginEmployee() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/employees/login", {
        email,
        password
      });

      if (response.data.message === "Login successful") {
        localStorage.setItem("employeeToken", response.data.token); // Store JWT token
        localStorage.setItem("employeeData", JSON.stringify(response.data.employee)); // Optional: store basic user info
        alert("Login successful!");
        setErrorMessage("");
        navigate('/EmployeeHomePage');
      } else {
        setErrorMessage(response.data);
      }
    } catch (error) {
      setErrorMessage("Server error: " + error.response.data);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your employee account</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="email">Email Address</label>
            <svg className="login-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>

          <div className="login-input-group">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
            <svg className="login-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>

          {errorMessage && <div className="login-error-message">{errorMessage}</div>}

          <button type="submit" className="login-btn">
            <span>Sign In</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <span className="signup-link" onClick={() => navigate('/RegisterEmployee')}>Sign Up</span></p>
          <p style={{ marginTop: '10px' }}><span className="signup-link" onClick={() => navigate('/')}>← Back to Home</span></p>
        </div>
      </div>
    </div>
  );
}

export default LoginEmployee;
