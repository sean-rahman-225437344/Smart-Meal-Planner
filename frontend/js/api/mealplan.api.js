import api from "./api.js";

export async function listMealPlans() {
  const { data } = await api.get("/api/mealplans");
  return data; 
}

export async function createMealPlan(type = "daily") {
  const { data } = await api.post(`/api/mealplans?type=${encodeURIComponent(type)}`);
  return data; 
}