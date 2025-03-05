import React, { useState } from 'react';
import './home.css';
import Wrapper from '../component/Wrapper';

function Home() {
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isRegisterActive, setIsRegisterActive] = useState(false);

  const handleGetStartedClick = () => {
    setIsRegisterActive(false);
    setIsPopupActive(true);
  };

  const handleSignUpNowClick = () => {
    setIsRegisterActive(true);
    setIsPopupActive(true);
  };

  return (
    <div className="home-section">
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Welcome to WORKBRIDGE</h1>
          <p>Your go-to platform for fostering meaningful connections between companies and employees.</p>
          <button className="cta-button" onClick={handleGetStartedClick}>Get Started</button>
        </div>
      </div>
      <div className="features-section">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Professional Networking</h3>
            <p>Connect with industry professionals, join groups, and participate in discussions to expand your network.</p>
          </div>
          <div className="feature-card">
            <h3>Job Listings</h3>
            <p>Discover job opportunities that match your skills and interests. Apply directly through our platform and track your applications.</p>
          </div>
          <div className="feature-card">
            <h3>Company Profiles</h3>
            <p>Learn more about potential employers, their culture, and the opportunities they offer.</p>
          </div>
          <div className="feature-card">
            <h3>Employee Profiles</h3>
            <p>Showcase your skills, experience, and achievements to attract the attention of top companies.</p>
          </div>
        </div>
      </div>
      <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"WORKBRIDGE helped me find my dream job! The platform is easy to use and the opportunities are endless."</p>
            <h4>- Yohan Dananjaya</h4>
          </div>
          <div className="testimonial-card">
            <p>"As a company, we've found top talent through WORKBRIDGE. It's a fantastic resource for any business."</p>
            <h4>- Tharindu Perera</h4>
          </div>
        </div>
      </div>
      <div className="cta-section">
        <h2>Join WORKBRIDGE Today</h2>
        <p>Whether you're a job seeker or a company, WORKBRIDGE is here to help you achieve your goals.</p>
        <button className="cta-button" onClick={handleSignUpNowClick}>Sign Up Now</button>
      </div>
      <Wrapper
        isPopupActive={isPopupActive}
        isRegisterActive={isRegisterActive}
        onClose={() => setIsPopupActive(false)}
      />
    </div>
  );
}

export default Home;