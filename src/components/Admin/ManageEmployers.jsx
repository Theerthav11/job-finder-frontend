import { useEffect, useState } from 'react';
import './ManageEmployers.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManageEmployers() {
  const [employers, setEmployers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployers();
  }, []);

  const fetchEmployers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/employers");
      setEmployers(response.data);
    } catch (error) {
      console.error("Error fetching employers:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this employer?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/employers/${id}`);
        alert("The employer has been deleted!");
        fetchEmployers();
      } catch (error) {
        console.error("Error deleting employer:", error);
      }
    }
  };

  return (
    <div className="manage-wrapper">
      <header className="manage-header">
        <div className="header-left">
          <h1 className="header-title">Manage Employers</h1>
        </div>
        <div className="header-right">
          <button className="back-btn" onClick={() => navigate("/AdministratorHome")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back
          </button>
        </div>
      </header>

      <main className="manage-content">
        {employers.length === 0 ? (
          <div className="no-data">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <p>No employers registered yet</p>
          </div>
        ) : (
          <div className="users-grid">
            {employers.map((employer) => (
              <div className="user-card" key={employer._id}>
                <div className="user-header">
                  <div className="user-avatar">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <h3>{employer.name}</h3>
                </div>

                <div className="user-info">
                  <div className="info-row">
                    <span className="info-label">Age:</span>
                    <span>{employer.age}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Gender:</span>
                    <span>{employer.gender}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span>{employer.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone:</span>
                    <span>{employer.phone}</span>
                  </div>
                </div>

                <button className="delete-btn" onClick={() => handleDeleteClick(employer._id)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ManageEmployers;