import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdministratorHome.css";
import axios from "axios";

const AdministratorHome = () => {
  const navigate = useNavigate();
  const [overview, setOverview] = useState({
    totalJobs: 0,
    totalEmployees: 0,
    totalEmployers: 0,
  });

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminToken");
      navigate("/AdministratorLogin");
    }
  };

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/overview");
        console.log(res.data);
        setOverview(res.data);
      } catch (error) {
        console.error("Failed to fetch overview:", error);
      }
    };

    fetchOverview();
  }, [navigate]);

  return (
    <div className="admin-wrapper">
      <header className="admin-header">
        <div className="header-left">
          <h1 className="header-title">Admin Dashboard</h1>
        </div>
        <div className="header-right">
          <button className="home-btn" onClick={() => navigate("/")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </header>

      <main className="admin-content">
        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{overview.totalJobs}</span>
              <span className="stat-label">Total Jobs</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{overview.totalEmployees}</span>
              <span className="stat-label">Employees</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{overview.totalEmployers}</span>
              <span className="stat-label">Employers</span>
            </div>
          </div>
        </section>

        <section className="actions-section">
          <h2 className="section-title">Management</h2>
          <div className="actions-grid">
            <div className="action-card" onClick={() => navigate("/ManageEmployee")}>
              <div className="action-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Manage Employees</h3>
              <p>View and manage registered employees</p>
              <button className="action-btn">
                View
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            <div className="action-card" onClick={() => navigate("/ManageEmployers")}>
              <div className="action-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>Manage Employers</h3>
              <p>View and manage registered employers</p>
              <button className="action-btn">
                View
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            <div className="action-card" onClick={() => navigate("/JobsList")}>
              <div className="action-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <h3>All Job Postings</h3>
              <p>View and manage all job listings</p>
              <button className="action-btn">
                View
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdministratorHome;