import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './CreateProfile.css';



export default function CreateProfile() {
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [currentProjects, setCurrentProjects] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [certifications, setCertifications] = useState("");
  const [hardSkills, setHardSkills] = useState("");
  const [softSkills, setSoftSkills] = useState("");
  const [languages, setLanguages] = useState("");
  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem("loggedInUserId");

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = { fullName, department, workExperience, currentProjects, educationLevel,certifications,hardSkills,softSkills,languages, userId: loggedInUserId };
    fetch("http://localhost:3000/Appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    })
      .then(() => {
        alert("Profile Data added successfully");
        navigate("/appointment/table");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="frm">
    <form onSubmit={handleSubmit}>
      <h2>Employee Details</h2>
    
    
    <div>
    <label htmlFor="fullName">Full Name:</label>
    <input 
      type="text" 
      id="fullName" 
      required 
      value={fullName} 
      onChange={(e) => setFullName(e.target.value)} 
    />

    </div>
  
    <div>

    
    <label htmlFor="department">Department:</label>
    <input 
      type="text" 
      id="department" 
      required 
      value={department} 
      onChange={(e) => setDepartment(e.target.value)} 
    />
    </div>
   

   
<div>
    <label htmlFor="workExperience">Work Experience (Years):</label>
    <input 
      type="number" 
      id="workExperience" 
      required 
      value={workExperience} 
      onChange={(e) => setWorkExperience(e.target.value)} 
    />
    
    </div>


    <div>

    <label htmlFor="currentProjects">Current Projects/Responsibilities:</label>
    <input 
      type="text" 
      id="currentProjects" 
      required 
      value={currentProjects} 
      onChange={(e) => setCurrentProjects(e.target.value)} 
    />
    </div>

    <div>

   
    <label htmlFor="educationLevel">Education Level:</label>
    <input 
      type="text" 
      id="educationLevel" 
      required 
      value={educationLevel} 
      onChange={(e) => setEducationLevel(e.target.value)} 
    />
 
    </div>
    
    <div>
    <label htmlFor="certifications">Certifications & Courses:</label>
    <input 
      type="text" 
      id="certifications" 
      required 
      value={certifications} 
      onChange={(e) => setCertifications(e.target.value)} 
    />
   
    </div>
   
    <div>

    <label htmlFor="hardSkills">Hard Skills:</label>
    <input 
      type="text" 
      id="hardSkills" 
      required 
      value={hardSkills} 
      onChange={(e) => setHardSkills(e.target.value)} 
    />
 
    </div>
    
    <div>

    <label htmlFor="softSkills">Soft Skills:</label>
    <input 
      type="text" 
      id="softSkills" 
      required 
      value={softSkills} 
      onChange={(e) => setSoftSkills(e.target.value)} 
    />

    </div>
    
    <div>

    <label htmlFor="languages">Languages Spoken:</label>
    <input 
      type="text" 
      id="languages" 
      required 
      value={languages} 
      onChange={(e) => setLanguages(e.target.value)} 
    />
  
    </div>

    <div>
      <button type="submit" className="btn2 btn-save">Save</button>
      <Link to="/appointment/table" className="btn2 btn-back">Back</Link>
    </div>
    
  </form>
  </div>
  );
}
