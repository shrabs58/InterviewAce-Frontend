import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categoryService";
import {
  getQuestionsByCategory,
  submitAttempt,
} from "../../services/interviewService";
import "./InterviewPractice.css";

function InterviewPractice() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [attempt, setAttempt] = useState(null);

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

  const handleCategoryChange = async (event) => {
    const categoryId = event.target.value;

    setSelectedCategory(categoryId);

    if (!categoryId) {
      setQuestions([]);
      return;
    }

    try {
      const response = await getQuestionsByCategory(categoryId);
      setQuestions(response.data);
      setCurrentIndex(0);
    } catch (error) {
      console.error("Failed to load questions", error);
    }
  };

  const handleSubmit = async () => {
    if (!userAnswer.trim()) {
      alert("Please enter your answer.");
      return;
    }

    try {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));

      const request = {
        userId: loggedInUser.id,
        questionId: currentQuestion.id,
        userAnswer: userAnswer,
      };

      const response = await submitAttempt(request);

      setAttempt(response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Submission failed");
    }
  };

  const handleNext = () => {
    setAttempt(null);
    setUserAnswer("");

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Interview completed!");
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="interview-page">
      <div className="interview-card">
        <h2>Interview Practice</h2>

        <div className="form-group">
          <label>Select Category</label>

          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {currentQuestion && (
          <div className="question-card">
            <h3>
              Question {currentIndex + 1} of {questions.length}
            </h3>

            <p>{currentQuestion.question}</p>

            <p>
              <strong>Difficulty:</strong> {currentQuestion.difficulty}
            </p>

            <textarea
              rows="6"
              placeholder="Type your answer here..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />

            {!attempt ? (
              <button className="resume-button" onClick={handleSubmit}>
                Submit Answer
              </button>
            ) : (
              <>
                <div className="model-answer">
                  <h4>Your Answer</h4>
                  <p>{attempt.userAnswer}</p>

                  <h4>Model Answer</h4>
                  <p>{attempt.correctAnswer}</p>
                </div>

                <button className="resume-button" onClick={handleNext}>
                  Next Question
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewPractice;
