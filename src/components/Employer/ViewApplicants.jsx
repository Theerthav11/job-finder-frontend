import { useEffect, useState } from "react";
import "./ViewApplicants.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ViewApplicants() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterestedApplicants = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}/interested-employees`);
        setApplicants(response.data);
      } catch (error) {
        console.error("Error fetching interested applicants:", error);
      }
    };

    fetchInterestedApplicants();
  }, [jobId]);

  const handleContact = async (employeeId, jobId) => {
    try {
      const res = await axios.post("http://localhost:5000/api/employer/contact-employee", {
        userId: employeeId,
        jobId: jobId,
      });
  
      if (res.status === 200) {
        alert("Contact email sent successfully!");
      } else {
        alert("Failed to contact employee!");
      }
    } catch (error) {
      console.error("Error contacting employee:", error);
      alert("Something went wrong while trying to contact the employee.");
    }
  };

  return (
    <div className="applicants-wrapper">
      <header className="applicants-header">
        <div className="header-left">
          <h1 className="header-title">Job Applicants</h1>
        </div>
        <div className="header-right">
          <button className="back-btn" onClick={() => navigate('/EmployerHomePage')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back
          </button>
        </div>
      </header>

      <div className="applicants-content">
        {applicants.length === 0 ? (
          <div className="no-applicants">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <p>No applicants yet</p>
          </div>
        ) : (
          <div className="applicants-grid">
            {applicants.map((applicant, index) => (
              <div className="applicant-card" key={index}>
                <div className="applicant-header">
                  <h3>{applicant.fullname}</h3>
                </div>
                
                <div className="applicant-info">
                  <div className="info-row">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>Age: {applicant.age}</span>
                  </div>
                  <div className="info-row">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    <span>Gender: {applicant.gender}</span>
                  </div>
                  <div className="info-row">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <span>{applicant.phone}</span>
                  </div>
                  <div className="info-row">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                    <span>{applicant.qualification}</span>
                  </div>
                </div>

                <button
                  className="contact-btn"
                  onClick={() => handleContact(applicant._id, jobId)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Contact Applicant
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewApplicants;
