import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './ProfilePage.css';


export default function EProfile() {
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
      <h2>Profile</h2>
      <Link to="/create/appointment" className="btn2 btn-add">Create Profile</Link>
      <div className="profile-photo-container">
      <h3>Upload Profile Photo</h3>
      <div className="image-preview">
        {image ? <img src={image} alt="Profile Preview" /> : <p>No image selected</p>}
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
        <tr>
          <th>Actions</th>
          {profiles.map((profile) => (
            <td key={`actions-${profile.id}`}>
              <button onClick={() => editProfile(profile.id)} className="btn2 btn-primary">Edit</button>
              <button onClick={() => deleteProfile(profile.id)} className="btn2 btn-danger">Delete</button>
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
  );
}
