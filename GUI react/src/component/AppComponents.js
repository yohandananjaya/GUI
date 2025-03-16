import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useNavigate } from "react-router-dom";
import "./App.css"; // Ensure you have this file for global styles

// Navbar Component
function Navbar() {
  return (
    <div className="sidebar">
      <h2>Workbridge</h2>
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
    </div>
  );
}

// Home Component
function Home() {
  return (
    <div className="home">
      <h1>Welcome to WORKBRIDGE</h1>
      <p>Your go-to platform for fostering meaningful connections between companies and employees.</p>
      <button>Get Started</button>
    </div>
  );
}

// Messages Component
function Messages() {
  return (
    <div className="messages">
      <h1>Messages Page</h1>
      <p>This is the messages page.</p>
    </div>
  );
}

// EProfile Component
function EProfile() {
  const [profiles, setAppointments] = useState([]);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const loggedInUserId = localStorage.getItem("loggedInUserId");

  useEffect(() => {
    fetch(`http://localhost:3000/Appointments?userId=${loggedInUserId}`)
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.log(err.message));
  }, [loggedInUserId]);

  const editProfile = (id) => {
    navigate("/edit/appointment/" + id);
  };

  const deleteProfile = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch("http://localhost:3000/Appointments/" + id, { method: "DELETE" })
        .then(() => {
          alert("Removed appointment successfully");
          setAppointments(profiles.filter((profile) => profile.id !== id));
        })
        .catch((err) => console.log(err.message));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        saveImageToDB(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveImageToDB = async (imageData) => {
    const profileData = { id: 1, profilePhoto: imageData }; // Adjust ID as needed
    try {
      await fetch("http://localhost:5000/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });
      console.log("Image saved successfully!");
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  return (
    <div className="container">
      {/* Main Content */}
      <div className="main-content">
        <h2>Profile</h2>
        <Link to="/create/appointment" className="btn2 btn-add">
          Create Profile
        </Link>
        <div className="profile-photo-container">
          <h3>Upload Profile Photo</h3>
          <div className="image-preview">
            {image ? (
              <img src={image} alt="Profile Preview" />
            ) : (
              <p>No image selected</p>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="table-container">
          {profiles.length > 0 ? (
            <table>
              <tbody>
                <tr>
                  <th>Full Name</th>
                  {profiles.map((profile) => (
                    <td key={`name-${profile.id}`}>{profile.fullName}</td>
                  ))}
                </tr>
                <tr>
                  <th>Department</th>
                  {profiles.map((profile) => (
                    <td key={`department-${profile.id}`}>{profile.department}</td>
                  ))}
                </tr>
                <tr>
                  <th>Work Experience (Years)</th>
                  {profiles.map((profile) => (
                    <td key={`experience-${profile.id}`}>
                      {profile.workExperience}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Current Projects</th>
                  {profiles.map((profile) => (
                    <td key={`projects-${profile.id}`}>
                      {profile.currentProjects}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Education Level</th>
                  {profiles.map((profile) => (
                    <td key={`education-${profile.id}`}>
                      {profile.educationLevel}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Certifications</th>
                  {profiles.map((profile) => (
                    <td key={`certifications-${profile.id}`}>
                      {profile.certifications}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Hard Skills</th>
                  {profiles.map((profile) => (
                    <td key={`hardSkills-${profile.id}`}>
                      {profile.hardSkills}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Soft Skills</th>
                  {profiles.map((profile) => (
                    <td key={`softSkills-${profile.id}`}>
                      {profile.softSkills}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Languages Spoken</th>
                  {profiles.map((profile) => (
                    <td key={`languages-${profile.id}`}>
                      {profile.languages}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Actions</th>
                  {profiles.map((profile) => (
                    <td key={`actions-${profile.id}`}>
                      <button
                        onClick={() => editProfile(profile.id)}
                        className="btn2 btn-primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProfile(profile.id)}
                        className="btn2 btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No profiles available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// App Component (Main Entry Point)
function App() {
  const [isPopupActive, setIsPopupActive] = useState(false);

  return (
    <Router>
      <div className="App">
        {/* Navbar (Visible on All Pages) */}
        <Navbar />

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            {/* Home Route */}
            <Route path="/appointment/home" element={<Home />} />

            {/* Profile Routes */}
            <Route path="/appointment/table" element={<EProfile />} />
            <Route path="/edit/appointment/:productCode" element={<EditProfile />} />
            <Route path="/create/appointment" element={<CreateProfile />} />

            {/* Messages Route */}
            <Route path="/appointment/messages" element={<Messages />} />

            {/* Default Route (Home) */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;