import { useState } from 'react';
import './LoginEmployer.css';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function LoginEmployer() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

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
      const response = await axios.post("http://localhost:5000/api/employer/login", {
        email,
        password
      });

      if (response.data.message === "Login successful") {
        localStorage.setItem("employerToken", response.data.token);
        localStorage.setItem("employerData", JSON.stringify(response.data.employer));
        alert("Login successful!");
        setErrorMessage("");
        navigate("/EmployerHomePage");
      } else {
        setErrorMessage(response.data || "Invalid credentials.");
      }
    } catch (error) {
      setErrorMessage("Server error: " + error.response.data)
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post("http://localhost:5000/api/employer/google-login", {
        token: credentialResponse.credential
      });

      if (response.data.token) {
        localStorage.setItem("employerToken", response.data.token);
        localStorage.setItem("employerData", JSON.stringify(response.data.employer));
        alert("Google login successful!");
        navigate('/EmployerHomePage');
      }
    } catch (error) {
      setErrorMessage("Google login failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    setErrorMessage("Google login failed. Please try again.");
  };

  return (
    <div className="employer-login-wrapper">
      <div className="employer-login-container">
        <div className="employer-login-header">
          <h1 className="employer-login-title">Welcome Back</h1>
          <p className="employer-login-subtitle">Sign in to your employer account</p>
        </div>
        
        <form className="employer-login-form" onSubmit={handleSubmit}>
          <div className="employer-login-input-group">
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
            <svg className="employer-login-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>

          <div className="employer-login-input-group">
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
            <svg className="employer-login-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>

          {errorMessage && <div className="employer-login-error-message">{errorMessage}</div>}

          <button type="submit" className="employer-login-btn">
            <span>Sign In</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </form>

        <div className="employer-login-divider">
          <span>OR</span>
        </div>

        <div className="employer-google-login-wrapper">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            theme="outline"
            size="large"
            width="100%"
          />
        </div>

        <div className="employer-login-footer">
          <p>Don't have an account? <span className="employer-signup-link" onClick={() => navigate('/EmployerRegistration')}>Sign Up</span></p>
          <p style={{ marginTop: '10px' }}><span className="employer-signup-link" onClick={() => navigate('/')}>← Back to Home</span></p>
        </div>
      </div>
    </div>
  );
}

export default LoginEmployer;
