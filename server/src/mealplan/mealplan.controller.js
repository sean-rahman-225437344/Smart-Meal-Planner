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

/*export async function getMealPlan(req, res, next) {
  try {
    const plan = await MealPlanService.getMealPlan(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.json(plan);
  } catch (err) {
    next(err);
  }
}*/

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