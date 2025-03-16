import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./Home.css"; // Import the CSS file

// Import images (replace with your actual image paths)
import fullTimeJobImage from "./fullTimeJobImage.png";
import partTimeJobImage from "./partTimeJobImage.png";
import remoteJobImage from "./remoteJobImage.png";
import freelancerJobImage from "./freelancerJobImage.png";

function Hom() {
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    localStorage.removeItem("loggedInUserId"); // Clear user session
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="hom-container">
      {/* Left Side Navigation */}
      <div className="left-side-buttons">
        <h2 className="brand-name">WORKBRIDGE</h2>
        <NavLink to="/appointment/home" className="nav-button" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/appointment/wb" className="nav-button" activeClassName="active">
          WB
        </NavLink>
        <NavLink to="/appointment/table" className="nav-button" activeClassName="active">
          Profile
        </NavLink>
        <NavLink to="/appointment/messages" className="nav-button" activeClassName="active">
          Messages
        </NavLink>

        {/* Log Out Button */}
        <button onClick={handleLogout} className="nav-button logout-btn">
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="hom-content">
        <h1>WORKBRIDGE</h1>
        <p>Your go-to platform for fostering meaningful connections between companies and employees.</p>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search jobs..." />
          <button>Search</button>
        </div>

        {/* Job Buttons with Images */}
        <div className="job-buttons-container">
          <div className="job-button">
            <img src={fullTimeJobImage} alt="Full-Time Job" />
            <button>Full-Time Job</button>
          </div>
          <div className="job-button">
            <img src={partTimeJobImage} alt="Part-Time Job" />
            <button>Part-Time Job</button>
          </div>
          <div className="job-button">
            <img src={remoteJobImage} alt="Remote Job" />
            <button>Remote Job</button>
          </div>
          <div className="job-button">
            <img src={freelancerJobImage} alt="Freelancer Job" />
            <button>Freelancer Job</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hom;