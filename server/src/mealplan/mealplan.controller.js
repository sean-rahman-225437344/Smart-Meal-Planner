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