import { useEffect, useState } from 'react';
import './ManageEmployee.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManageEmployee() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/employees/${id}`);
        alert("The employee has been deleted!");
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <div className="manage-wrapper">
      <header className="manage-header">
        <div className="header-left">
          <h1 className="header-title">Manage Employees</h1>
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
        {employees.length === 0 ? (
          <div className="no-data">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <p>No employees registered yet</p>
          </div>
        ) : (
          <div className="users-grid">
            {employees.map((employee) => (
              <div className="user-card" key={employee._id}>
                <div className="user-header">
                  <div className="user-avatar">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <h3>{employee.fullname}</h3>
                </div>

                <div className="user-info">
                  <div className="info-row">
                    <span className="info-label">Age:</span>
                    <span>{employee.age}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Gender:</span>
                    <span>{employee.gender}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Qualification:</span>
                    <span>{employee.qualification}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone:</span>
                    <span>{employee.phone}</span>
                  </div>
                </div>

                <button className="delete-btn" onClick={() => handleDeleteClick(employee._id)}>
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

export default ManageEmployee;