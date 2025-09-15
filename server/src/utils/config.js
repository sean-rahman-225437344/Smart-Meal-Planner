import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mealplanner", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}
