import { useNavigate, NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ menuItems }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="app-sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.id}>
            {item.label === "Logout" ? (
              <button
                className="sidebar-link logout-button"
                onClick={handleLogout}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active-link" : "sidebar-link"
                }
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
