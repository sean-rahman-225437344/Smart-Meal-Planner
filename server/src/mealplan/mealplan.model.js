import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  title: String,
  recipeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Recipe" 
},
  servings: { 
    type: Number, default: 1 
}
});

const daySchema = new mongoose.Schema({
  date: Date,
  meals: [mealSchema]
});

const mealPlanSchema = new mongoose.Schema(
  {
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    type: { 
        type: String, 
        enum: ["daily", "weekly"], 
        required: true 
    },
    days: [daySchema],
    estimatedCost: { 
        type: Number, 
        default: 0 
    }
  },
  { timestamps: true }
);

export default mongoose.model("MealPlan", mealPlanSchema);