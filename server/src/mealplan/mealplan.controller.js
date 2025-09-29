import * as MealPlanService from "./mealplan.service.js";

export async function createMealPlan(req, res, next) {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const type = req.query.type || "daily";
    const plan = await MealPlanService.generateMealPlan(req.session.userId, type);
    res.status(201).json(plan);
  } catch (err) {
    next(err);
  }
}

export async function listMealPlans(req, res, next) {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const plans = await MealPlanService.listMealPlans(req.session.userId);
    res.json(plans);
  } catch (err) {
    next(err);
  }
}

export async function saveWeeklyGrocery(req, res) {
  try {
    if (!req.session.userId) return res.status(401).json({ message: "Not authenticated" });
    const snap = await MealPlanService.createGrocerySnapshot(req.session.userId);
    res.status(201).json({
      message: "Weekly grocery list snapshot saved",
      grocery: snap
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Failed to save grocery list" });
  }
}

export async function getLatestGrocery(req, res) {
  try {
    if (!req.session.userId) return res.status(401).json({ message: "Not authenticated" });
 
    const GroceryList = (await import("../grocery/grocery.model.js")).default;
    const latest = await GroceryList.findOne({ userId: req.session.userId }).sort({ createdAt: -1 });
    if (!latest) return res.status(404).json({ message: "No saved grocery list. Use POST /api/grocery to create one." });
    res.json(latest);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch grocery list" });
  }
}