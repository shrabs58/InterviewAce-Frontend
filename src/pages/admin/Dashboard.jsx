import { useEffect, useState } from "react";
import { getAdminAnalytics } from "../../services/adminService";
import "./Dashboard.css";

function Dashboard() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await getAdminAnalytics();
        setAnalytics(response.data);
      } catch (error) {
        console.error("Failed to load analytics", error);
      }
    };

    loadAnalytics();
  }, []);

  if (!analytics) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Students</h3>
          <p>{analytics.totalStudents}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Categories</h3>
          <p>{analytics.totalCategories}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Questions</h3>
          <p>{analytics.totalQuestions}</p>
        </div>

        <div className="dashboard-card">
          <h3>Resume Uploads</h3>
          <p>{analytics.totalResumeUploads}</p>
        </div>

        <div className="dashboard-card">
          <h3>Interview Attempts</h3>
          <p>{analytics.totalInterviewAttempts}</p>
        </div>
      </div>

      <div className="category-section">
        <h3>Questions Per Category</h3>

        <table className="analytics-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Questions</th>
            </tr>
          </thead>

          <tbody>
            {analytics.questionsPerCategory.map((item, index) => (
              <tr key={index}>
                <td>{item.categoryName}</td>
                <td>{item.questionCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
