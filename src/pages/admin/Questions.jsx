import { useEffect, useState } from "react";
import {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../../services/questionService";
import { getAllCategories } from "../../services/categoryService";
import "./Questions.css";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [categoryId, setCategoryId] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const questionResponse = await getAllQuestions();
        setQuestions(questionResponse.data);

        const categoryResponse = await getAllCategories();
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  const refreshQuestions = async () => {
    const response = await getAllQuestions();
    setQuestions(response.data);
  };

  const handleSubmit = async () => {
    if (!question.trim() || !answer.trim() || !difficulty || !categoryId) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const request = {
        question,
        answer,
        difficulty,
        categoryId: Number(categoryId),
      };

      if (editingId) {
        await updateQuestion(editingId, request);
        alert("Question updated successfully!");
      } else {
        await createQuestion(request);
        alert("Question added successfully!");
      }

      setQuestion("");
      setAnswer("");
      setDifficulty("Easy");
      setCategoryId("");
      setEditingId(null);

      await refreshQuestions();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (question) => {
    setQuestion(question.question);
    setAnswer(question.answer);
    setDifficulty(question.difficulty);
    setCategoryId(question.categoryId);
    setEditingId(question.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) {
      return;
    }

    try {
      await deleteQuestion(id);

      alert("Question deleted successfully!");

      await refreshQuestions();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="questions-page">
      <h2>Manage Questions</h2>

      <div className="question-form">
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <textarea
          rows="4"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button onClick={handleSubmit}>
          {editingId ? "Update Question" : "Add Question"}
        </button>
      </div>

      <table className="questions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Question</th>
            <th>Difficulty</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td>{question.id}</td>
              <td>{question.question}</td>
              <td>{question.difficulty}</td>
              <td>{question.categoryName}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(question)}
                >
                  Edit
                </button>
              </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(question.id)}
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

export default Questions;
