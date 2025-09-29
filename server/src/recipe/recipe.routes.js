import express from "express";
import { getRecipeById } from "./recipe.controller.js";

const router = express.Router();

router.get("/recipes/:id", getRecipeById);

export default router;
