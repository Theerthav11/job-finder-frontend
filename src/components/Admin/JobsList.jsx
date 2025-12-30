import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./JobsList.css";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`http://localhost:5000/api/jobs/${id}`);
        alert("The job has been deleted!");
        fetchJobs();
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  return (
    <div className="jobs-list-wrapper">
      <header className="jobs-list-header">
        <div className="header-left">
          <h1 className="header-title">All Job Postings</h1>
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

      <main className="jobs-list-content">
        {jobs.length === 0 ? (
          <div className="no-jobs">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            <p>No jobs posted yet</p>
          </div>
        ) : (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <div className="job-card" key={job._id}>
                <div className="job-card-header">
                  <h3>{job.title}</h3>
                  <span className="company-badge">{job.company}</span>
                </div>

                <p className="job-description">{job.jobDescription}</p>

                <div className="job-details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Salary:</span>
                    <span>₹{job.minSalary} - ₹{job.maxSalary}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Location:</span>
                    <span>{job.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Qualification:</span>
                    <span>{job.qualification}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Age:</span>
                    <span>{job.age}+</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Vacancies:</span>
                    <span>{job.vacancies}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Shift:</span>
                    <span>{job.shift}</span>
                  </div>
                </div>

                <div className="job-address">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  </svg>
                  <span>{job.address}</span>
                </div>

                <button className="delete-btn" onClick={() => handleDeleteClick(job._id)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                  Delete Job
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default JobsList;