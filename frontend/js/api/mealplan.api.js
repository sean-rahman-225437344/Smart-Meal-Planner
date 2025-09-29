import api from "./api.js";

export async function generateMealPlan(type = "daily") {
  const res = await api.post(`/api/mealplans?type=${type}`);
  return res.data;
}

export async function listMealPlans() {
  const res = await api.get("/api/mealplans");
  return res.data;
}


export async function saveWeeklyGrocery() {
  const res = await api.post("/api/grocery");
  return res.data;
}

export async function getLatestGrocery() {
  const res = await api.get("/api/grocery");
  return res.data;
}