import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../services/userService";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to load users", error);
      }
    };

    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await deleteUser(id);

      alert("User deleted successfully!");

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="users-page">
      <h2>Manage Users</h2>

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
