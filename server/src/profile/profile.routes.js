import express from "express";
import { body } from "express-validator";
import { getMe, updateProfile } from "./profile.controller.js";
import validate from "../middleware/validate.middleware.js";

const router = express.Router();

router.get("/me", getMe);

// Update profile
router.put(
  "/profile",
  [
    body("diet").optional().isString(),
    body("allergies").optional().isArray(),
    body("cuisines").optional().isArray(),
    body("weeklyBudget").optional().isNumeric(),
    body("servings").optional().isNumeric(),
  ],
  validate,
  updateProfile
);

export default router;
