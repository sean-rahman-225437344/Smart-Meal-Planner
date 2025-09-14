import axios from "https://cdn.jsdelivr.net/npm/axios/+esm";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export default api;
