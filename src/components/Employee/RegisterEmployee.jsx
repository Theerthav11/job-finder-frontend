import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './RegisterEmployee.css';

function RegisterEmployee() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    qualification: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  // Function to validate password
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;
    return passwordRegex.test(password);
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullname, email, phone, age, gender, qualification, password } = formData;

    // Field validations
    if (!fullname || !email || !phone || !age || !gender || !qualification || !password) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setErrorMessage("Phone number must be exactly 10 digits.");
      return;
    }
    if (parseInt(age) < 18) {
      setErrorMessage("You must be at least 18 years old to proceed!");
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage("Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character.");
      return;
    }

    fetch('http://localhost:5000/api/employees/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Registration successful') {
          alert(data.message);
          navigate('/LoginEmployee');
        } else {
          setErrorMessage(data.message || 'Something went wrong');
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage('Server error. Try again later.');
      });
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="signup-header">
          <h1 className="signup-title">Join Quick Hire</h1>
          <p className="signup-subtitle">Create your employee account</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="fullname">Full Name</label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
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

          <div className="form-row two-col">
            <div className="input-group">
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
            <div className="input-group">
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

          <div className="form-row two-col">
            <div className="input-group select-group">
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <label htmlFor="gender">Gender</label>
            </div>
            <div className="input-group select-group">
              <select id="qualification" name="qualification" value={formData.qualification} onChange={handleChange} required>
                <option value="">Select Qualification</option>
                <option value="highschool">High School</option>
                <option value="higherSec">Higher Secondary</option>
                <option value="graduate">Graduate</option>
                <option value="postgraduate">Post Graduate</option>
              </select>
              <label htmlFor="qualification">Qualification</label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
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

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button type="submit" className="signup-btn">
            <span>Create Account</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <span className="login-link" onClick={() => navigate('/LoginEmployee')}>Sign In</span></p>
        </div>
      </div>
    </div>
  );
}

export default RegisterEmployee;
