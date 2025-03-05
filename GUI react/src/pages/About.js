import React from 'react';
import './about.css';

function About() {
  return (
    <div className="about-section">
      <div className="about-header">
        <h1>About WORKBRIDGE</h1>
        <p>
          Welcome to WORKBRIDGE, your go-to platform for fostering meaningful connections between companies and employees. Our mission is to create a dynamic and interactive environment where professionals can network, find job opportunities, and grow their careers.
        </p>
      </div>
      <div className="about-content">
        <div className="about-left">
          <img src="https://wallpaperaccess.com/full/4321869.jpg" alt="Our Mission" />
          <h2>Our Mission</h2>
          <p>
            At WORKBRIDGE, we believe in the power of connections. Our mission is to bridge the gap between talented individuals and forward-thinking companies, creating a thriving community where everyone can achieve their professional goals.
          </p>
          <h2>What We Offer</h2>
          <ul>
            <li><strong>Professional Networking:</strong> Connect with industry professionals, join groups, and participate in discussions to expand your network.</li>
            <li><strong>Job Listings:</strong> Discover job opportunities that match your skills and interests. Apply directly through our platform and track your applications.</li>
            <li><strong>Company Profiles:</strong> Learn more about potential employers, their culture, and the opportunities they offer.</li>
            <li><strong>Employee Profiles:</strong> Showcase your skills, experience, and achievements to attract the attention of top companies.</li>
            <li><strong>Direct Messaging:</strong> Communicate directly with employers and other professionals to build valuable relationships.</li>
            <li><strong>Industry News and Updates:</strong> Stay informed with the latest news and trends in your industry.</li>
          </ul>
        </div>
        <div className="about-right">
          <img src="https://th.bing.com/th/id/R.d4e6d6d2b92ba82b5444d77164f90d0c?rik=%2bnB5kINkydhjuA&pid=ImgRaw&r=0" alt="Our Vision" />
          <h2>Our Vision</h2>
          <p>
            Our vision is to become the leading platform for professional growth and development. We aim to empower individuals and companies to achieve their full potential by providing the tools and resources they need to succeed.
          </p>
          <h2>Join Us</h2>
          <p>
            Whether you're a job seeker looking for new opportunities or a company searching for top talent, WORKBRIDGE is here to help you achieve your goals. Join our community today and take the next step in your professional journey.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;