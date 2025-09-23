import mongoose from "mongoose";

export default async function connectDB() {
  const mongoUri =
    process.env.MONGO_URI || "mongodb://localhost:27017/mealplanner";
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}
