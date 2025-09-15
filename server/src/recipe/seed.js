import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "./recipe.model.js";

dotenv.config();

async function seedRecipes() {
  await mongoose.connect("mongodb://localhost:27017/mealplanner");

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
    title: "Butter Chicken",
    ingredients: [
      { name: "Chicken", quantity: 200, unit: "g" },
      { name: "Butter", quantity: 30, unit: "g" },
      { name: "Tomato Puree", quantity: 100, unit: "ml" }
    ],
    costPerServing: 8,
    dietTags: ["omnivore"],
    allergenTags: ["dairy"],
    cuisine: "Indian",
  },
  {
    title: "Palak Paneer",
    ingredients: [
      { name: "Paneer", quantity: 150, unit: "g" },
      { name: "Spinach", quantity: 200, unit: "g" }
    ],
    costPerServing: 7,
    dietTags: ["vegetarian", "keto"],
    allergenTags: ["dairy"],
    cuisine: "Indian",
  },
  {
    title: "Masoor Dal",
    ingredients: [
      { name: "Red Lentils", quantity: 150, unit: "g" },
      { name: "Garlic", quantity: 2, unit: "cloves" }
    ],
    costPerServing: 4,
    dietTags: ["vegetarian", "vegan"],
    allergenTags: [],
    cuisine: "Indian",
  },
  {
    title: "Tandoori Fish",
    ingredients: [
      { name: "Fish Fillet", quantity: 200, unit: "g" },
      { name: "Yogurt", quantity: 50, unit: "g" }
    ],
    costPerServing: 9,
    dietTags: ["omnivore", "keto"],
    allergenTags: ["dairy"],
    cuisine: "Indian",
  },
  {
    title: "Margherita Pizza",
    ingredients: [
      { name: "Pizza Dough", quantity: 200, unit: "g" },
      { name: "Mozzarella", quantity: 100, unit: "g" },
      { name: "Tomato Sauce", quantity: 80, unit: "g" }
    ],
    costPerServing: 8,
    dietTags: ["vegetarian"],
    allergenTags: ["gluten", "dairy"],
    cuisine: "Italian",
  },
  {
    title: "Pasta Carbonara",
    ingredients: [
      { name: "Spaghetti", quantity: 150, unit: "g" },
      { name: "Egg", quantity: 1, unit: "pc" },
      { name: "Bacon", quantity: 50, unit: "g" }
    ],
    costPerServing: 9,
    dietTags: ["omnivore"],
    allergenTags: ["gluten", "egg"],
    cuisine: "Italian",
  },
  {
    title: "Minestrone Soup",
    ingredients: [
      { name: "Mixed Vegetables", quantity: 200, unit: "g" },
      { name: "Beans", quantity: 100, unit: "g" }
    ],
    costPerServing: 6,
    dietTags: ["vegetarian", "vegan"],
    allergenTags: [],
    cuisine: "Italian",
  },
  {
    title: "Caprese Salad",
    ingredients: [
      { name: "Tomato", quantity: 2, unit: "pcs" },
      { name: "Mozzarella", quantity: 100, unit: "g" },
      { name: "Basil", quantity: 10, unit: "leaves" }
    ],
    costPerServing: 7,
    dietTags: ["vegetarian", "keto"],
    allergenTags: ["dairy"],
    cuisine: "Italian",
  },
  {
    title: "Grilled Salmon with Herbs",
    ingredients: [
      { name: "Salmon", quantity: 200, unit: "g" },
      { name: "Olive Oil", quantity: 20, unit: "ml" }
    ],
    costPerServing: 12,
    dietTags: ["omnivore", "keto"],
    allergenTags: ["fish"],
    cuisine: "Italian",
  },
  {
    title: "Aloo Gobi",
    ingredients: [
      { name: "Potato", quantity: 150, unit: "g" },
      { name: "Cauliflower", quantity: 200, unit: "g" }
    ],
    costPerServing: 5,
    dietTags: ["vegetarian", "vegan"],
    allergenTags: [],
    cuisine: "Indian",
  },
  {
    title: "Keto Chicken Curry",
    ingredients: [
      { name: "Chicken Thigh", quantity: 200, unit: "g" },
      { name: "Coconut Milk", quantity: 100, unit: "ml" }
    ],
    costPerServing: 10,
    dietTags: ["omnivore", "keto"],
    allergenTags: [],
    cuisine: "Indian",
  },
  {
    title: "Rajma Curry",
    ingredients: [
      { name: "Kidney Beans", quantity: 150, unit: "g" },
      { name: "Onion", quantity: 1, unit: "pc" }
    ],
    costPerServing: 6,
    dietTags: ["vegetarian", "vegan"],
    allergenTags: [],
    cuisine: "Indian",
  },
  {
    title: "Egg Bhurji",
    ingredients: [
      { name: "Eggs", quantity: 2, unit: "pcs" },
      { name: "Onion", quantity: 1, unit: "pc" }
    ],
    costPerServing: 4,
    dietTags: ["omnivore", "keto"],
    allergenTags: ["egg"],
    cuisine: "Indian",
  },
  {
    title: "Paneer Tikka",
    ingredients: [
      { name: "Paneer", quantity: 200, unit: "g" },
      { name: "Bell Pepper", quantity: 100, unit: "g" }
    ],
    costPerServing: 8,
    dietTags: ["vegetarian", "keto"],
    allergenTags: ["dairy"],
    cuisine: "Indian",
  },
  {
    title: "Eggplant Parmigiana",
    ingredients: [
      { name: "Eggplant", quantity: 200, unit: "g" },
      { name: "Mozzarella", quantity: 100, unit: "g" }
    ],
    costPerServing: 9,
    dietTags: ["vegetarian"],
    allergenTags: ["dairy"],
    cuisine: "Italian",
  },
  {
    title: "Keto Zucchini Noodles",
    ingredients: [
      { name: "Zucchini", quantity: 200, unit: "g" },
      { name: "Parmesan", quantity: 50, unit: "g" }
    ],
    costPerServing: 7,
    dietTags: ["vegetarian", "keto"],
    allergenTags: ["dairy"],
    cuisine: "Italian",
  },
  {
    title: "Vegan Pesto Pasta",
    ingredients: [
      { name: "Pasta", quantity: 150, unit: "g" },
      { name: "Basil", quantity: 20, unit: "g" },
      { name: "Olive Oil", quantity: 30, unit: "ml" }
    ],
    costPerServing: 8,
    dietTags: ["vegan", "vegetarian"],
    allergenTags: ["gluten"],
    cuisine: "Italian",
  },
  {
    title: "Chicken Alfredo",
    ingredients: [
      { name: "Chicken Breast", quantity: 150, unit: "g" },
      { name: "Cream", quantity: 50, unit: "ml" },
      { name: "Pasta", quantity: 150, unit: "g" }
    ],
    costPerServing: 11,
    dietTags: ["omnivore"],
    allergenTags: ["gluten", "dairy"],
    cuisine: "Italian",
  },
  {
    title: "Vegan Mushroom Risotto",
    ingredients: [
      { name: "Rice", quantity: 150, unit: "g" },
      { name: "Mushroom", quantity: 100, unit: "g" }
    ],
    costPerServing: 9,
    dietTags: ["vegan", "vegetarian"],
    allergenTags: ["gluten"],
    cuisine: "Italian",
  }
];

  await Recipe.insertMany(recipes);
  console.log("Recipes seeded successfully");
  mongoose.disconnect();
}

seedRecipes();