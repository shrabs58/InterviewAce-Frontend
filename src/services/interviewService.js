import axios from "axios";

const QUESTION_API = "http://localhost:8080/api/questions";
const ATTEMPT_API = "http://localhost:8080/api/interview-attempts";

export const getQuestionsByCategory = (categoryId) => {
  return axios.get(`${QUESTION_API}/category/${categoryId}`);
};

export const submitAttempt = (attempt) => {
  return axios.post(ATTEMPT_API, attempt);
};
