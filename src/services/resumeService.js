import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/resumes";

export const uploadResume = (userId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${API_BASE_URL}/upload/${userId}`, formData);
};

export const getResumeByUser = (userId) => {
  return axios.get(`${API_BASE_URL}/user/${userId}`);
};

export const deleteResume = (userId) => {
  return axios.delete(`${API_BASE_URL}/${userId}`);
};
