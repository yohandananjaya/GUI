import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditProfile() {
  const { profileId } = useParams();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [currentProjects, setCurrentProjects] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [certifications, setCertifications] = useState("");
  const [hardSkills, setHardSkills] = useState("");
  const [softSkills, setSoftSkills] = useState("");
  const [languages, setLanguages] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/Appointments/" + profileId)
      .then((res) => res.json())
      .then((data) => {
        setFullName(data.fullName);
        setDepartment(data.department);
        setWorkExperience(data.workExperience);
        setCurrentProjects(data.currentProjects);
        setEducationLevel(data.educationLevel);
        setCertifications(data.certifications);
        setHardSkills(data.hardSkills);
        setSoftSkills(data.softSkills);
        setLanguages(data.languages);
      })
      .catch((err) => console.log(err.message));
  }, [profileId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = {
      fullName,
      department,
      workExperience,
      currentProjects,
      educationLevel,
      certifications,
      hardSkills,
      softSkills,
      languages,
    };

    fetch("http://localhost:3000/Appointments/" + profileId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    })
      .then(() => {
        alert("Profile updated successfully");
        navigate("/appointment/table");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" id="fullName" required value={fullName} onChange={(e) => setFullName(e.target.value)} />

        <label htmlFor="department">Department:</label>
        <input type="text" id="department" required value={department} onChange={(e) => setDepartment(e.target.value)} />

        <label htmlFor="workExperience">Work Experience (Years):</label>
        <input type="number" id="workExperience" required value={workExperience} onChange={(e) => setWorkExperience(e.target.value)} />

        <label htmlFor="currentProjects">Current Projects:</label>
        <input type="text" id="currentProjects" required value={currentProjects} onChange={(e) => setCurrentProjects(e.target.value)} />

        <label htmlFor="educationLevel">Education Level:</label>
        <input type="text" id="educationLevel" required value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} />

        <label htmlFor="certifications">Certifications:</label>
        <input type="text" id="certifications" required value={certifications} onChange={(e) => setCertifications(e.target.value)} />

        <label htmlFor="hardSkills">Hard Skills:</label>
        <input type="text" id="hardSkills" required value={hardSkills} onChange={(e) => setHardSkills(e.target.value)} />

        <label htmlFor="softSkills">Soft Skills:</label>
        <input type="text" id="softSkills" required value={softSkills} onChange={(e) => setSoftSkills(e.target.value)} />

        <label htmlFor="languages">Languages Spoken:</label>
        <input type="text" id="languages" required value={languages} onChange={(e) => setLanguages(e.target.value)} />

        <div>
          <button className="btn2 btn-save">Update</button>
          <Link to="/appointment/table" className="btn2 btn-back">Back</Link>
        </div>
      </form>
    </div>
  );
}
