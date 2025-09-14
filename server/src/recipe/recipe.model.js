import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: { 
        type: String, 
        required: true 
    },
    ingredients: [
      {
        name: String,
        quantity: Number,
        unit: String
      }
    ],
    costPerServing: { type: Number, default: 0 },
    dietTags: [{ type: String }],      
    allergenTags: [{ type: String }], 
    cuisine: { type: String },         
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);