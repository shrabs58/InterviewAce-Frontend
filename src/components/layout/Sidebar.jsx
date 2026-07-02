import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ menuItems }) {
  return (
    <aside className="app-sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "sidebar-link active-link" : "sidebar-link"
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;