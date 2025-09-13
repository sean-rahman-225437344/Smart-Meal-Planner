// server/src/app.js
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./auth/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import connectDB from "./utils/config.js";

const app = express();

connectDB();

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8080", // frontend origin
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "changeme",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      sameSite: "lax",
    },
  })
);

// Routes
app.use("/auth", authRoutes);

// Health check
app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

// Error handler (last middleware)
app.use(errorHandler);

export default app;
