import { useEffect, useState } from "react";
import {
  uploadResume,
  getResumeByUser,
  deleteResume,
} from "../../services/resumeService";
import "./Resume.css";

function Resume() {
  const [resume, setResume] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const loadResume = async () => {
      try {
        const response = await getResumeByUser(loggedInUser.id);
        setResume(response.data);
      } catch (error) {
        setResume(null);
      }
    };

    loadResume();
  }, [loggedInUser.id]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a PDF file.");
      return;
    }

    try {
      await uploadResume(loggedInUser.id, selectedFile);

      alert("Resume uploaded successfully!");

      setSelectedFile(null);

      const response = await getResumeByUser(loggedInUser.id);
      setResume(response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this resume?")) return;

    try {
      await deleteResume(loggedInUser.id);

      alert("Resume deleted successfully!");

      setResume(null);
      setSelectedFile(null);
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="resume-page">
      <div className="resume-card">
        <h2>My Resume</h2>

        {resume ? (
          <div className="resume-details">
            <p>
              <strong>File Name:</strong> {resume.fileName}
            </p>
            <p>
              <strong>File Type:</strong> {resume.fileType}
            </p>
            <p>
              <strong>Uploaded:</strong> {resume.uploadedAt}
            </p>
          </div>
        ) : (
          <p>No resume uploaded.</p>
        )}

        <input type="file" accept=".pdf" onChange={handleFileChange} />

        <button className="resume-button" onClick={handleUpload}>
          {resume ? "Replace Resume" : "Upload Resume"}
        </button>

        {resume && (
          <button className="delete-button" onClick={handleDelete}>
            Delete Resume
          </button>
        )}
      </div>
    </div>
  );
}

export default Resume;
