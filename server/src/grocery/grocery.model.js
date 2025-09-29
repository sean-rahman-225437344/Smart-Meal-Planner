import mongoose from "mongoose";

const groceryItemSchema = new mongoose.Schema({
  name: String,
  unit: String,
  quantity: Number,
  recipes: [String],
});

const groceryListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "MealPlan", required: true },
  weekStart: Date,
  weekEnd: Date,
  items: [groceryItemSchema],
}, { timestamps: true });

export default mongoose.model("GroceryList", groceryListSchema);