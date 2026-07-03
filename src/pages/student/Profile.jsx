import { useEffect, useState } from "react";
import { getUserById, updateProfile } from "../../services/userService";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    aspiringJobRole: "",
    experience: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));

        if (!loggedInUser) return;

        const response = await getUserById(loggedInUser.id);

        setUser({
          fullName: response.data.fullName,
          email: response.data.email,
          phone: response.data.phone || "",
          aspiringJobRole: response.data.aspiringJobRole || "",
          experience: response.data.experience || "",
        });
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    loadUser();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));

      const request = {
        fullName: user.fullName,
        phone: user.phone,
        aspiringJobRole: user.aspiringJobRole,
        experience: user.experience,
      };

      await updateProfile(loggedInUser.id, request);

      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" value={user.email} disabled />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Aspiring Job Role</label>
          <input
            type="text"
            name="aspiringJobRole"
            value={user.aspiringJobRole}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Experience</label>
          <input
            type="text"
            name="experience"
            value={user.experience}
            onChange={handleChange}
          />
        </div>

        <button className="profile-button" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Profile;
