import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050/api",
  timeout: 0, // disable timeout for safety
});

export default api;
