import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    diet: {
      type: String,
      enum: ["omnivore", "vegetarian", "vegan", "keto"],
      default: "omnivore",
    },
    allergies: [{ type: String }],
    cuisines: [{ type: String }],
    weeklyBudget: { type: Number, default: 0 },
    servings: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
