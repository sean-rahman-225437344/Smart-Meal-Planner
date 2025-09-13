import { validationResult } from "express-validator";

export default function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      code: "VAL-400",
      message: "Validation error",
      details: errors.array(),
    });
  }
  next();
}
