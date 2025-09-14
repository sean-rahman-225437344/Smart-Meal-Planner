import express from "express";
import { createMealPlan, listMealPlans } from "./mealplan.controller.js";

const router = express.Router();

router.post("/mealplans", createMealPlan);
router.get("/mealplans", listMealPlans);

export default router;