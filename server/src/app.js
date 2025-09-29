import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./utils/config.js";
import authRoutes from "./auth/auth.routes.js";
import profileRoutes from "./profile/profile.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Meal plan routes
import mealPlanRoutes from "./mealplan/mealplan.routes.js";
import recipeRoutes from "./recipe/recipe.routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
console.log("Environment:", PORT);
connectDB();

const app = express();
console.log("MONGO_URI =", process.env.MONGO_URI);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

const allowedOrigins = ["http://localhost:3000", "http://localhost:4000"];

app.use(
  cors({
    origin: allowedOrigins,
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
      secure: false, // Set to true in production
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    },
  })
);

// Serve static files from the 'frontend' directory
app.use(express.static(path.resolve(__dirname, "../../frontend")));

// Health check and specific API routes
app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

// Other API routes
app.use("/auth", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", mealPlanRoutes);
app.use("/api", recipeRoutes);

// Catch-all route to serve the main HTML file.
// THIS MUST BE THE SECOND TO LAST THING DEFINED.
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "../../frontend", "index.html"));
});

// Error handling middleware.
// THIS MUST BE THE VERY LAST THING DEFINED.
app.use(errorHandler);

export default app;
