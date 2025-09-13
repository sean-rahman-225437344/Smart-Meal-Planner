import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import connectDB from "./utils/config.js";
import authRoutes from "./auth/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8080", // adjust to your frontend port
    credentials: true,
  })
);

// Session setup (using MongoDB as store)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "changeme",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    },
  })
);

// Routes
app.use("/auth", authRoutes);

// Health check
app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

// Error handling
app.use(errorHandler);

export default app;
