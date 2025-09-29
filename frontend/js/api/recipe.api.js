import api from "./api.js";

export async function getRecipe(id) {
  const res = await api.get(`/api/recipes/${id}`);
  return res.data;
}
