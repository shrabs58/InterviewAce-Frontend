import { useEffect, useState } from "react";
import { getDashboard } from "../../services/dashboardService";
import "./Dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await getDashboard(loggedInUser.id);
        setDashboard(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadDashboard();
  }, [loggedInUser.id]);

  if (!dashboard) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="dashboard-page">
      <h2>Welcome, {dashboard.userName}</h2>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Resume</h3>
          <p>{dashboard.resumeUploaded ? "Uploaded" : "Not Uploaded"}</p>
        </div>

        <div className="dashboard-card">
          <h3>Questions Attempted</h3>
          <p>{dashboard.questionsAttempted}</p>
        </div>

        <div className="dashboard-card">
          <h3>Categories Practiced</h3>
          <p>{dashboard.categoriesPracticed}</p>
        </div>

        <div className="dashboard-card">
          <h3>Latest Question</h3>
          <p>{dashboard.latestQuestion || "-"}</p>
        </div>
      </div>

      <div className="latest-attempt">
        <strong>Latest Attempt:</strong> {dashboard.latestAttemptAt || "-"}
      </div>
    </div>
  );
}

export default Dashboard;
