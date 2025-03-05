import React from 'react';
import './services.css';

function Services() {
  return (
    <div className="services-section">
      <div className="services-header">
        <h1>Our Services</h1>
        <p>
          At WORKBRIDGE, we offer a range of services designed to help both companies and employees achieve their professional goals. Explore our services below to see how we can assist you.
        </p>
      </div>
      <div className="services-grid">
        <div className="service-card">
          <h3>Professional Networking</h3>
          <p>Connect with industry professionals, join groups, and participate in discussions to expand your network.</p>
        </div>
        <div className="service-card">
          <h3>Job Listings</h3>
          <p>Discover job opportunities that match your skills and interests. Apply directly through our platform and track your applications.</p>
        </div>
        <div className="service-card">
          <h3>Company Profiles</h3>
          <p>Learn more about potential employers, their culture, and the opportunities they offer.</p>
        </div>
        <div className="service-card">
          <h3>Employee Profiles</h3>
          <p>Showcase your skills, experience, and achievements to attract the attention of top companies.</p>
        </div>
        <div className="service-card">
          <h3>Direct Messaging</h3>
          <p>Communicate directly with employers and other professionals to build valuable relationships.</p>
        </div>
        <div className="service-card">
          <h3>Industry News and Updates</h3>
          <p>Stay informed with the latest news and trends in your industry.</p>
        </div>
      </div>
      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join WORKBRIDGE today and take the next step in your professional journey.</p>
        <button className="cta-button">Sign Up Now</button>
      </div>
    </div>
  );
}

export default Services;

