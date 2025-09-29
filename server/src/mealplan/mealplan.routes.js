import express from "express";
import { createMealPlan, listMealPlans , saveWeeklyGrocery, getLatestGrocery } from "./mealplan.controller.js";

const router = express.Router();

router.post("/mealplans", createMealPlan);
router.get("/mealplans", listMealPlans);

router.post("/grocery", saveWeeklyGrocery);
router.get("/grocery", getLatestGrocery);

export default router;