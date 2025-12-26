import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './EmployerRegistration.css';
import axios from 'axios';

function EmployerRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    password: '',
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, age, gender, password } = formData;

    if (!name || !email || !phone || !age || !gender || !password) {
      setErrorMessage("All fields are required.");
    } else if (!/^\d{10}$/.test(phone)) {
      setErrorMessage("Phone number must be exactly 10 digits.");
    } else if (parseInt(age) < 18) {
      setErrorMessage("You must be at least 18 years old to proceed!");
    } else {
      try {
        setErrorMessage("");
        const response = await axios.post("http://localhost:5000/api/employer/register", {
          name,
          email,
          phone,
          age,
          gender,
          password,
        });

        if (response.data === "Employer registered successfully") {
          alert("Registration successful!");
          navigate('/LoginEmployer');
        } else {
          setErrorMessage("Registration failed: " + response.data);
        }
      } catch (error) {
        setErrorMessage("Error: " + error.message);
      }
    }
  };

  return (
    <div className="employer-signup-wrapper">
      <div className="employer-signup-container">
        <div className="employer-signup-header">
          <h1 className="employer-signup-title">Join Quick Hire</h1>
          <p className="employer-signup-subtitle">Create your employer account</p>
        </div>
        
        <form className="employer-signup-form" onSubmit={handleSubmit}>
          <div className="employer-form-row">
            <div className="employer-input-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="name">Company/Business Name</label>
            </div>
          </div>

          <div className="employer-form-row">
            <div className="employer-input-group">
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
            </div>
          </div>

          <div className="employer-form-row two-col">
            <div className="employer-input-group">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="phone">Phone Number</label>
            </div>
            <div className="employer-input-group">
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min='18'
                placeholder=" "
              />
              <label htmlFor="age">Age</label>
            </div>
          </div>

          <div className="employer-form-row">
            <div className="employer-input-group select-group">
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <label htmlFor="gender">Gender</label>
            </div>
          </div>

          <div className="employer-form-row">
            <div className="employer-input-group">
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
            </div>
          </div>

          {errorMessage && <div className="employer-error-message">{errorMessage}</div>}

          <button type="submit" className="employer-signup-btn">
            <span>Create Account</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </form>

        <div className="employer-signup-footer">
          <p>Already have an account? <span className="employer-login-link" onClick={() => navigate('/LoginEmployer')}>Sign In</span></p>
          <p style={{ marginTop: '10px' }}><span className="employer-login-link" onClick={() => navigate('/')}>← Back to Home</span></p>
        </div>
      </div>
    </div>
  );
}

export default EmployerRegistration;