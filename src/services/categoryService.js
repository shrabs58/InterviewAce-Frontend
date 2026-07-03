import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/categories";

export const getAllCategories = () => {
  return axios.get(API_BASE_URL);
};

export const getCategoryById = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

export const createCategory = (category) => {
  return axios.post(API_BASE_URL, category);
};

export const updateCategory = (id, category) => {
  return axios.put(`${API_BASE_URL}/${id}`, category);
};

export const deleteCategory = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};
