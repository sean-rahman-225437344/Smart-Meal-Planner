import express from "express";
import { 
  createMealPlan, 
  listMealPlans,
  bulkUpdateMealPlans     // ⬅️ import new controller
} from "./mealplan.controller.js";

const router = express.Router();

router.post("/mealplans", createMealPlan);
router.get("/mealplans", listMealPlans);


router.put("/mealplans/bulk", bulkUpdateMealPlans);

export default router;