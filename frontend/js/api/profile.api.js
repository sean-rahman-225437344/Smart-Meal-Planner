import api from "./api.js";

export async function getProfile() {
  const res = await api.get("/api/me");
  return res.data;
}
