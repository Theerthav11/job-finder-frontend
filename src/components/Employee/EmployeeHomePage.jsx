import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmployeeHomePage.css";

const EmployeeHomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    jobLocation: "",
    salaryRange: "",
  });
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [employeeName, setEmployeeName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
    fetchFilterOptions();
    fetchEmployeeName();
  }, []);

  const fetchEmployeeName = () => {
    const employeeData = JSON.parse(localStorage.getItem("employeeData"));
    if (employeeData && employeeData.name) {
      setEmployeeName(employeeData.name);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/employees/filters"
      );
      setCategories(res.data.categories);
      setLocations(res.data.locations);
    } catch (err) {
      console.error("Error fetching filter options:", err);
    }
  };

  const handleInterestClick = async (jobId) => {
    const employeeData = JSON.parse(localStorage.getItem("employeeData"));
    const employeeId = employeeData?.id;

    try {
      const res = await axios.post("http://localhost:5000/api/jobs/interest", {
        jobId,
        employeeId,
      });

      if (res.status === 200) {
        alert("Interest marked successfully!");
      } else {
        alert(res.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while marking interest.");
    }
  };

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const applyFilters = () => {
    let filtered = [...jobs];

    if (filters.category && filters.category !== "") {
      filtered = filtered.filter((job) =>
        job.title
          .trim()
          .toLowerCase()
          .includes(filters.category.trim().toLowerCase())
      );
    }

    if (filters.jobLocation && filters.jobLocation !== "") {
      filtered = filtered.filter(
        (job) =>
          job.location.trim().toLowerCase() ===
          filters.jobLocation.trim().toLowerCase()
      );
    }

    if (filters.salaryRange && filters.salaryRange !== "") {
      const salary = parseInt(filters.salaryRange, 10);

      filtered = filtered.filter((job) => {
        const jobMin = parseInt(job.minSalary?.replace(/₹|,/g, ""), 10);
        return !isNaN(jobMin) && jobMin >= salary;
      });
    }

    setFilteredJobs(filtered);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("employeeToken");
      localStorage.removeItem("employeeData");
      navigate("/");
    }
  };

  return (
    <div className="employee-home-wrapper">
      <header className="employee-header">
        <div className="header-left">
          <h1 className="header-title">Job Portal</h1>
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

      <div className="employee-content">
        <div className="filters-section">
          <h2 className="employee-greeting">Hello, {employeeName}!</h2>
          <div className="filter-group">
            <label>Job Category</label>
            <select id="category" onChange={handleFilterChange}>
              <option value="">All Jobs</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Location</label>
            <select id="jobLocation" onChange={handleFilterChange}>
              <option value="">All Places</option>
              {locations.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <button className="filter-btn" onClick={applyFilters}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            Apply Filters
          </button>
        </div>

        <div className="jobs-grid">
          {filteredJobs.length === 0 ? (
            <div className="no-jobs">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <p>No jobs found</p>
            </div>
          ) : (
            filteredJobs.map((job, index) => (
              <div className="job-card" key={index}>
                <div className="job-card-header">
                  <h3>{job.title}</h3>
                  <span className="company-badge">{job.company}</span>
                </div>
                
                <p className="job-description">{job.jobDescription}</p>
                
                <div className="job-info-grid">
                  <div className="info-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    <span>₹{job.minSalary} - ₹{job.maxSalary}</span>
                  </div>
                  <div className="info-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{job.location}</span>
                  </div>
                  <div className="info-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <span>{job.qualification.toUpperCase()}</span>
                  </div>
                  <div className="info-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>{job.shift}</span>
                  </div>
                  <div className="info-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>Min Age: {job.age}</span>
                  </div>
                  <div className="info-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <span>{job.vacancies} Vacancies</span>
                  </div>
                </div>

                <div className="job-address">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  </svg>
                  <span>{job.address}</span>
                </div>

                <button
                  className="interested-btn"
                  onClick={() => handleInterestClick(job._id)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  I'm Interested
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeHomePage;
