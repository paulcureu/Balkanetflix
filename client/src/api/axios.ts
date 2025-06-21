import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const apiClient = axios.create({
  baseURL: API_URL,
});

export default apiClient;
