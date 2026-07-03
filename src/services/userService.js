import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/users";

export const getUserById = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

export const updateProfile = (id, profileRequest) => {
  return axios.put(`${API_BASE_URL}/${id}`, profileRequest);
};

export const getAllUsers = () => {
  return axios.get(API_BASE_URL);
};

export const deleteUser = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};
