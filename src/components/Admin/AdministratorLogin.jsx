import { useState } from "react";
import "./AdministratorLogin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdministratorLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      setErrorMessage("All fields are required.");
    } else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)
    ) {
      setErrorMessage(
        "Password must be at least 8 characters long and include at least one special character and one number."
      );
    } else {
      try {
        const res = await axios.post("http://localhost:5000/api/admin/login", {
          username,
          password,
        });

        if (res.status === 200) {
          console.log(res.data)
          localStorage.setItem("adminToken", res.data.token)
          setErrorMessage("");
          navigate("/AdministratorHome");
        }
      } catch (err) {
        setErrorMessage("Invalid username or password.");
      }
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <div className="admin-badge">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <h1 className="admin-login-title">Administrator Access</h1>
          <p className="admin-login-subtitle">Secure login for system administrators</p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-login-input-group">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="username">Username</label>
            <svg className="admin-login-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <div className="admin-login-input-group">
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
            <svg className="admin-login-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          {errorMessage && <div className="admin-login-error-message">{errorMessage}</div>}

          <button type="submit" className="admin-login-btn">
            <span>Access Dashboard</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>

        <div className="admin-login-footer">
          <p>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Authorized personnel only
          </p>
          <span onClick={() => navigate('/')}>Back to Home</span>
        </div>
      </div>
    </div>
  );
}

export default AdministratorLogin;
