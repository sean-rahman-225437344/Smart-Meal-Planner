import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "./recipe.model.js";

dotenv.config();

async function seedRecipes() {
  await mongoose.connect(process.env.MONGO_URI);

  const recipes = [
    {
      title: "Chana Masala",
      ingredients: [
        { name: "Chickpeas", quantity: 200, unit: "g" },
        { name: "Onion", quantity: 1, unit: "pc" },
        { name: "Tomato", quantity: 2, unit: "pcs" }
      ],
      costPerServing: 5,
      dietTags: ["vegetarian", "vegan"],
      allergenTags: [],
      cuisine: "Indian",
    },
    {
      title: "Grilled Chicken Salad",
      ingredients: [
        { name: "Chicken Breast", quantity: 150, unit: "g" },
        { name: "Lettuce", quantity: 50, unit: "g" }
      ],
      costPerServing: 7,
      dietTags: ["omnivore"],
      allergenTags: [],
      cuisine: "Western",
      caloriesPerServing: 400
    }
  ];

  await Recipe.insertMany(recipes);
  console.log("Recipes seeded successfully");
  mongoose.disconnect();
}

seedRecipes();