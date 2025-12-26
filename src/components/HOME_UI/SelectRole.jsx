import { useNavigate } from "react-router-dom";
import './SelectRole.css';

function SelectRole() {
  const navigate = useNavigate();

  return (
    <div className="select-role-wrapper">
      <div className="select-role-container">
        <div className="select-role-header">
          <h1 className="select-role-title">Join Quick Hire</h1>
          <p className="select-role-subtitle">Choose your path to get started</p>
        </div>

        <div className="role-selection-grid">
          <div className="role-selection-card" onClick={() => navigate('/RegisterEmployee')}>
            <div className="role-selection-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h2>I'm Looking for a Job</h2>
            <p>Find your dream job and connect with local employers</p>
            <div className="role-features">
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Browse local jobs</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Easy application</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Track applications</span>
              </div>
            </div>
            <button className="role-selection-btn">
              <span>Sign Up as Job Seeker</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="role-selection-card" onClick={() => navigate('/EmployerRegistration')}>
            <div className="role-selection-icon employer">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <h2>I Want to Hire</h2>
            <p>Post jobs and find the perfect candidates for your business</p>
            <div className="role-features">
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Post unlimited jobs</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Review applicants</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Manage hiring</span>
              </div>
            </div>
            <button className="role-selection-btn">
              <span>Sign Up as Employer</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="select-role-footer">
          <p>Already have an account? <span onClick={() => navigate('/')}>Sign In</span></p>
        </div>
      </div>
    </div>
  );
}

export default SelectRole;
