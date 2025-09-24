import express from "express";
const router = express.Router();

router.get("/student", (req, res) => {
  res.json({
    name: "Aayushree Sapkota",
    studentId: "225598173"
  });
});

export default router;
