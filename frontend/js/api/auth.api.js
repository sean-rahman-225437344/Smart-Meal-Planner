import api from "./api.js";

export async function registerUser(name, email, password) {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data;
}

export async function loginUser(email, password) {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
}

export async function logoutUser() {
  const res = await api.post("/auth/logout");
  return res.data;
}
