import { useEffect, useState } from 'react';
import './EmployerHomePage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmployerHomePage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [employerName, setEmployerName] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const employerData = JSON.parse(localStorage.getItem("employerData"));
        const employerId = employerData.id;
        const name = employerData.name;
        setEmployerName(name);

        console.log(employerId);
        const response = await axios.get(`http://localhost:5000/api/jobs/employer/${employerId}`);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`http://localhost:5000/api/jobs/${id}`);
        setJobs(jobs.filter(job => job._id !== id));
        alert("Job deleted successfully!");
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("employerData");
      localStorage.removeItem("employerToken");
      navigate("/");
    }
  };

  return (
    <div className="employer-home-wrapper">
      <header className="employer-header">
        <div className="header-left">
          <h1 className="header-title">Employer Dashboard</h1>
        </div>
        <div className="header-right">
          <button className="post-job-btn" onClick={() => navigate('/JobAdd')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Post Job
          </button>
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

      <div className="employer-content">
        <h2 className="employer-greeting">Hello, {employerName}!</h2>
        
        {jobs.length === 0 ? (
          <div className="no-jobs">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            <p>No jobs posted yet</p>
            <button className="post-first-job-btn" onClick={() => navigate('/JobAdd')}>
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <div className="job-card" key={job._id}>
                <div className="job-card-header">
                  <h3>{job.title}</h3>
                  <span className="vacancies-badge">{job.vacancies} Vacancies</span>
                </div>
                
                <div className="job-info">
                  <div className="info-row">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    </svg>
                    <span>{job.company}</span>
                  </div>
                  <div className="info-row">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    <span>₹{job.minSalary} - ₹{job.maxSalary}</span>
                  </div>
                  <div className="info-row">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{job.location}</span>
                  </div>
                </div>

                <div className="job-actions">
                  <button
                    className="action-btn view-btn"
                    onClick={() => navigate(`/ViewApplicants/${job._id}`, { state: { jobId: job._id } })}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    Applicants
                  </button>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => navigate(`/EditJobDetails/${job._id}`, { state: { job } })}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(job._id)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployerHomePage;