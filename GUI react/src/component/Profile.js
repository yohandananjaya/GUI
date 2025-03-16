import { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "./ProfilePage.css";

export default function EProfile() {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // Profile photo
  const [coverImage, setCoverImage] = useState(null); // Cover photo
  const loggedInUserId = localStorage.getItem("loggedInUserId");

  useEffect(() => {
    fetch(`http://localhost:3000/Appointments?userId=${loggedInUserId}`) // Fetch profile data
      .then((res) => res.json())
      .then((data) => {
        setProfiles(data);
        // Load the profile photo and cover photo if they exist
        if (data.length > 0) {
          if (data[0].profilePhoto) {
            setImage(data[0].profilePhoto);
          }
          if (data[0].coverPhoto) {
            setCoverImage(data[0].coverPhoto);
          }
        }
      })
      .catch((err) => console.log(err.message));
  }, [loggedInUserId]);

  const editProfile = (id) => {
    navigate("/edit/appointment/" + id);
  };

  const deleteProfile = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch(`http://localhost:3000/Appointments/${id}`, { method: "DELETE" })
        .then(() => {
          alert("Profile removed successfully");
          setProfiles(profiles.filter((profile) => profile.id !== id));
        })
        .catch((err) => console.log(err.message));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setImage(imageData);
        saveImageToDB(imageData, "profilePhoto");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setCoverImage(imageData);
        saveImageToDB(imageData, "coverPhoto");
      };
      reader.readAsDataURL(file);
    }
  };

  const saveImageToDB = async (imageData, imageType) => {
    if (!loggedInUserId) {
      alert("User not logged in.");
      return;
    }

    try {
      // Find the profile associated with the logged-in user
      const profile = profiles.find((p) => p.userId === loggedInUserId);

      if (profile) {
        // Update the profile with the new image
        const updatedProfile = { ...profile, [imageType]: imageData };

        // Send a PUT request to update the profile
        await fetch(`http://localhost:3000/Appointments/${profile.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProfile),
        });

        // Update the local state
        setProfiles((prevProfiles) =>
          prevProfiles.map((p) => (p.id === profile.id ? updatedProfile : p))
        );

        console.log(`${imageType} updated successfully!`);
      } else {
        alert("Profile not found.");
      }
    } catch (error) {
      console.error(`Error saving ${imageType}:`, error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUserId"); // Clear user data
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="homee-container">
      {/* Left Side Navigation Bar */}
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
        <button onClick={handleLogout} className="nav-button logout-btn">
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="homee-content">
        {/* Cover Photo Section */}
        <div className="cover-photo-container">
          {coverImage ? (
            <img src={coverImage} alt="Cover" className="cover-photo" />
          ) : (
            <div className="cover-photo-placeholder">No cover photo selected</div>
          )}
          <label htmlFor="cover-file-input" className="cover-file-input-label">
            <span className="plus-icon">+</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            id="cover-file-input"
            className="cover-file-input"
          />
        </div>

        <h2>PROFILE</h2>
        {/* Hide "Create Profile" button if a profile exists */}
        {profiles.length === 0 && (
          <Link to="/create/appointment" className="btn2 btn-add">
            Create Profile
          </Link>
        )}
        <div className="profile-photo-container">
          <div className="image-preview">
            {image ? (
              <img src={image} alt="Profile Preview" />
            ) : (
              <p>No image selected</p>
            )}
          </div>
          <label htmlFor="file-input" className="file-input-label">
            <span className="plus-icon">+</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="file-input"
            className="file-input"
          />
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
                    <td key={`experience-${profile.id}`}>{profile.workExperience}</td>
                  ))}
                </tr>
                <tr>
                  <th>Current Projects</th>
                  {profiles.map((profile) => (
                    <td key={`projects-${profile.id}`}>{profile.currentProjects}</td>
                  ))}
                </tr>
                <tr>
                  <th>Education Level</th>
                  {profiles.map((profile) => (
                    <td key={`education-${profile.id}`}>{profile.educationLevel}</td>
                  ))}
                </tr>
                <tr>
                  <th>Certifications</th>
                  {profiles.map((profile) => (
                    <td key={`certifications-${profile.id}`}>{profile.certifications}</td>
                  ))}
                </tr>
                <tr>
                  <th>Hard Skills</th>
                  {profiles.map((profile) => (
                    <td key={`hardSkills-${profile.id}`}>{profile.hardSkills}</td>
                  ))}
                </tr>
                <tr>
                  <th>Soft Skills</th>
                  {profiles.map((profile) => (
                    <td key={`softSkills-${profile.id}`}>{profile.softSkills}</td>
                  ))}
                </tr>
                <tr>
                  <th>Languages Spoken</th>
                  {profiles.map((profile) => (
                    <td key={`languages-${profile.id}`}>{profile.languages}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No profiles available.</p>
          )}
          {/* Edit and Delete buttons at the bottom of the table */}
          {profiles.length > 0 && (
            <div className="actions-container">
              <button
                onClick={() => editProfile(profiles[0].id)}
                className="btn2 btn-edit"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProfile(profiles[0].id)}
                className="btn2 btn-delete"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}