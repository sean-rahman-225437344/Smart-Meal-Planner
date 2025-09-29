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
export async function bulkUpdateMealPlans(req, res, next) {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { filter, updateData } = req.body;

    if (!filter || !updateData) {
      return res.status(400).json({ message: "filter and updateData are required" });
    }

    const result = await MealPlanService.bulkUpdateMealPlans(
      req.session.userId,
      filter,
      updateData
    );

    res.json({
      message: "Bulk update successful",
      matched: result.matchedCount,
      modified: result.modifiedCount,
    });
  } catch (err) {
    next(err);
  }
}