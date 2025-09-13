import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser, logoutUser } from "./auth.controller.js";
import validate from "../middleware/validate.middleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("name").notEmpty(),
  ],
  validate,
  registerUser
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  validate,
  loginUser
);

router.post("/logout", logoutUser);

export default router;
