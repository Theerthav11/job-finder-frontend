import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import homebg from "../../components/images/homebg.jpg";

function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const featuresSectionRef = useRef(null);
  const HomeSectionRef = useRef(null);
  const navigate = useNavigate();
  const SigninSectionRef = useRef(null);
  const ContactSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref, sectionName) => {
    setActiveSection(sectionName);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home-wrapper">
      {/* Modern Navbar */}
      <nav className={`modern-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-logo">
            <span className="logo-text">Quick Hire</span>
          </div>
          <div className="navbar-menu">
            <a
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection(HomeSectionRef, 'home')}
            >
              Home
            </a>
            <a
              className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}
              onClick={() => scrollToSection(featuresSectionRef, 'features')}
            >
              Features
            </a>
            <a
              className={`nav-link ${activeSection === 'signin' ? 'active' : ''}`}
              onClick={() => scrollToSection(SigninSectionRef, 'signin')}
            >
              Sign In
            </a>
            <a
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => scrollToSection(ContactSectionRef, 'contact')}
            >
              Contact
            </a>
            <button className="nav-btn-primary" onClick={() => navigate("/SelectRole")}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={HomeSectionRef} className="hero-section">
        <div className="hero-overlay"></div>
        <img src={homebg} alt="Hero Background" className="hero-bg" />
        <div className="hero-content">
          <h1 className="hero-title">
            Hire Smart, Get Hired Faster
          </h1>
          <p className="hero-subtitle">
            Connect local businesses with talented professionals
          </p>
          <div className="hero-buttons">
            <button className="hero-btn-primary" onClick={() => navigate("/SelectRole")}>
              Join Now
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="hero-btn-secondary" onClick={() => scrollToSection(featuresSectionRef, 'features')}>
              Learn More
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Active Jobs</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Companies</p>
            </div>
            <div className="stat-item">
              <h3>5000+</h3>
              <p>Job Seekers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresSectionRef} className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="section-title">Why Choose Quick Hire?</h2>
            <p className="section-subtitle">
              Everything you need to find the perfect job or hire the perfect candidate
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h3>Local Focus</h3>
              <p>Find opportunities in your area with our location-based job matching</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3>Quick Process</h3>
              <p>Streamlined application and hiring process saves you time</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Verified Users</h3>
              <p>Connect with verified employers and qualified candidates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sign In Section */}
      <section ref={SigninSectionRef} className="signin-section">
        <div className="signin-container">
          <h2 className="section-title">Get Started Today</h2>
          <p className="section-subtitle">Choose your role to access the platform</p>

          <div className="role-cards">
            <div className="role-card" onClick={() => navigate("/LoginEmployee")}>
              <div className="role-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3>Job Seeker</h3>
              <p>Find your dream job</p>
              <button className="role-btn">Sign In</button>
            </div>

            <div className="role-card" onClick={() => navigate("/LoginEmployer")}>
              <div className="role-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <h3>Employer</h3>
              <p>Hire top talent</p>
              <button className="role-btn">Sign In</button>
            </div>
          </div>

          <div className="admin-link">
            <p>Administrator? <span onClick={() => navigate("/AdministratorLogin")}>Login here</span></p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={ContactSectionRef} className="contact-section">
        <div className="contact-container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">We're here to help you succeed</p>

          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h4>Email</h4>
              <p>support@quickhire.com</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h4>Phone</h4>
              <p>+91 9876543210</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h4>Location</h4>
              <p>Serving Local Communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <h3 className="footer-brand">Quick Hire</h3>
              <p>Connecting talent with opportunity</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <a onClick={() => scrollToSection(HomeSectionRef, 'home')}>Home</a>
              <a onClick={() => scrollToSection(featuresSectionRef, 'features')}>Features</a>
              <a onClick={() => navigate("/SelectRole")}>Sign Up</a>
            </div>
            <div className="footer-links">
              <h4>Support</h4>
              <a onClick={() => scrollToSection(ContactSectionRef, 'contact')}>Contact</a>
              <a href="#">Help Center</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Quick Hire. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
