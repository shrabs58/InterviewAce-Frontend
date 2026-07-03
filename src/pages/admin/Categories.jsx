import { useEffect, useState } from "react";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";
import "./Categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };

    loadCategories();
  }, []);

  const refreshCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      if (editingId) {
        await updateCategory(editingId, { name });
        alert("Category updated successfully!");
      } else {
        await createCategory({ name });
        alert("Category created successfully!");
      }

      setName("");
      setEditingId(null);

      await refreshCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setEditingId(category.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) {
      return;
    }

    try {
      await deleteCategory(id);

      alert("Category deleted successfully!");

      await refreshCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="categories-page">
      <h2>Manage Categories</h2>

      <div className="category-form">
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {editingId ? "Update Category" : "Add Category"}
        </button>
      </div>

      <table className="categories-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(category)}
                >
                  Edit
                </button>
              </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(category.id)}
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

export default Categories;
