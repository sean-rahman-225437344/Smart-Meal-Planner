import api from "./api.js";

export async function getProfile() {
  const res = await api.get("/api/me");
  return res.data;
}

export async function updateProfile(payload) {
  const { data } = await api.put("/api/profile", payload);
  return data; 
}