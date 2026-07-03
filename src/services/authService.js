import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";

export const login = (loginRequest) => {
  return axios.post(`${API_BASE_URL}/login`, loginRequest);
};

export const register = (registerRequest) => {
  return axios.post(`${API_BASE_URL}/register`, registerRequest);
};
