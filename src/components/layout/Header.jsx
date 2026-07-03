import { FaUserCircle } from "react-icons/fa";
import "./Header.css";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="app-header">
      <div className="header-logo">🎯 InterviewAce</div>

      <div className="header-user">
        <span>Welcome, {user?.fullName || "User"}</span>

        <FaUserCircle className="user-icon" />
      </div>
    </header>
  );
}

export default Header;
