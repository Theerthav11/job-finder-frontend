import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './JobAdd.css';
import axios from 'axios';

function JobDetails() {
  const [formData, setFormData] = useState({
    post: '',
    postOther: '',
    minsal: '',
    maxsal: '',
    qualification: '',
    age: '',
    vacancies: '',
    shift: '',
    sname: '',
    address: '',
    location: '',
    phone: '',
    wphone: '',
    jobDescription: '',
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      post, postOther, minsal, maxsal, qualification, age, vacancies, shift,
      sname, address, location, phone, wphone, jobDescription,
    } = formData;

    if (
      !post || (post === 'Other' && !postOther) || !minsal || !maxsal || !qualification || !age || !vacancies || !shift ||
      !sname || !address || !location || !phone || !wphone || !jobDescription
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (parseInt(age) < 18) {
      alert("You must be at least 18 years old to proceed!");
      return;
    }

    if (isNaN(minsal) || isNaN(maxsal)) {
      alert("Salary must be a number.");
      return;
    }

    if (isNaN(vacancies)) {
      alert("Number of vacancies must be a number.");
      return;
    }

    try {
      setErrorMessage('');

      const employer = JSON.parse(localStorage.getItem('employerData'));
      const employerId = employer?.id;

      const jobData = {
        title: post === 'Other' ? postOther : post,
        minSalary: minsal,
        maxSalary: maxsal,
        qualification,
        age,
        vacancies,
        shift,
        company: sname,
        address,
        location,
        phone,
        whatsapp: wphone,
        jobDescription,
        employer: employerId,
      };

      await axios.post("http://localhost:5000/api/jobs", jobData);

      alert("Job posted successfully!");
      navigate('/EmployerHomePage');
    } catch (error) {
      console.error("Error posting job:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="job-form-wrapper">
      <div className="job-form-header">
        <button className="back-btn" onClick={() => navigate('/EmployerHomePage')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back
        </button>
        <h1 className="form-title">Post a New Job</h1>
      </div>

      <div className="job-form-container">
        <form onSubmit={handleSubmit} className="job-form">
          <div className="form-section">
            <h3 className="section-title">About the Job</h3>
            
            <div className="form-group">
              <label htmlFor="post">Job Role*</label>
              <select name="post" value={formData.post} onChange={handleChange} required>
            <option value="">Select Job Role</option>
            <option value='electrician'>Electrician</option>
            <option value='plumber'>Plumber</option>
            <option value='cleaner'>Cleaning Staff</option>
            <option value='receptionist'>Receptionist</option>
            <option value='deliveryboy'>Delivery Partner</option>
            <option value='packing'>Packing Assistant</option>
            <option value='promoter'>Promoter</option>
            <option value='StoreKeeper'>Store Keeper</option>
            <option value='cashier'>Cashier</option>
            <option value='Sales'>Sales Assistant</option>
            <option value='chef'>Chef</option>
            <option value='security'>Security</option>
            <option value='customersupport'>Customer Support</option>
            <option value='floormanager'>Floor Manager</option>
            <option value='social'>Social Media Assistant</option>
            <option value='Other'>Other</option>
              </select>
            </div>

            {formData.post === 'Other' && (
              <div className="form-group">
                <label>Specify Job Role*</label>
                <input
                  type='text'
                  placeholder='Enter job role'
                  name='postOther'
                  value={formData.postOther}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Job Description*</label>
              <textarea
                placeholder='Describe the job role and responsibilities'
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Minimum Salary*</label>
                <input
                  type="text"
                  name="minsal"
                  placeholder='e.g., 15000'
                  value={formData.minsal}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Maximum Salary*</label>
                <input
                  type="text"
                  name="maxsal"
                  placeholder='e.g., 25000'
                  value={formData.maxsal}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor='qualification'>Required Qualification*</label>
                <select name="qualification" value={formData.qualification} onChange={handleChange} required>
            <option value="">Select Qualification</option>
            <option value='pg'>Post Graduate</option>
            <option value='ug'>Under Graduate</option>
            <option value='diploma'>Diploma</option>
            <option value='plustwo'>Higher Secondary</option>
            <option value='sslc'>High School</option>
                </select>
              </div>

              <div className="form-group">
                <label>Job Shift*</label>
                <select name="shift" value={formData.shift} onChange={handleChange} required>
            <option value="">Select Shift</option>
            <option value='day'>Day Shift</option>
            <option value='night'>Night Shift</option>
            <option value='any'>Any Shift</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Minimum Age Required*</label>
                <input
                  type='text'
                  placeholder='e.g., 18'
                  name='age'
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Number of Vacancies*</label>
                <input
                  type='text'
                  placeholder='e.g., 5'
                  name='vacancies'
                  value={formData.vacancies}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Company Details</h3>
            
            <div className="form-group">
              <label>Company Name*</label>
              <input
                type="text"
                name="sname"
                placeholder="Enter company name"
                value={formData.sname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Address*</label>
              <input
                type="text"
                name="address"
                placeholder="Company address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Job Location*</label>
              <input
                type="text"
                name="location"
                placeholder="City or area"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Contact Details</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>WhatsApp Number*</label>
                <input
                  type="tel"
                  name="wphone"
                  placeholder="Enter WhatsApp number"
                  value={formData.wphone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button type="submit" className="submit-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobDetails;