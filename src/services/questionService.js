import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/questions";

export const getAllQuestions = () => {
  return axios.get(API_BASE_URL);
};

export const createQuestion = (question) => {
  return axios.post(API_BASE_URL, question);
};

export const updateQuestion = (id, question) => {
  return axios.put(`${API_BASE_URL}/${id}`, question);
};

export const deleteQuestion = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};
