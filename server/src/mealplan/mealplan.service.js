import MealPlan from "./mealplan.model.js";
import Profile from "../profile/profile.model.js";
import Recipe from "../recipe/recipe.model.js";

export async function generateMealPlan(userId, type = "daily") {
  const profile = await Profile.findOne({ userId });

  const recipes = await Recipe.find({
    dietTags: profile.diet,
    allergenTags: { $nin: profile.allergies }
  }).limit(10);

  if (!recipes.length) throw new Error("No recipes found for preferences");
  
  const selectedMeals = recipes.slice(0, 3).map(r => ({
    title: r.title,
    recipeId: r._id,
    servings: profile.servings,
    costPerServing: r.costPerServing ?? 0
  }));

  let days = [];

  if (type === "daily") {
    days.push({ date: new Date(), 
    meals: selectedMeals });
  } 
  else {
    for (let i = 0; i < 7; i++) {
      days.push({ date: new Date(Date.now() + i * 86400000), 
      meals: selectedMeals });
    }
  }

  const recipeCostMap = new Map(
  recipes.map(r => [String(r._id), Number(r.costPerServing) || 0])
);

const estimatedCost = days.reduce((planSum, day) => {
  const daySum = (day.meals || []).reduce((sum, m) => {
    const unitCost = recipeCostMap.get(String(m.recipeId)) || 0;
    const servings = Number(m.servings ?? 1);
    return sum + unitCost * servings;
  }, 0);
  return planSum + daySum;
}, 0);


  const plan = new MealPlan({
    userId,
    type,
    days,
    estimatedCost
  });

  return await plan.save();
}

/*export async function getMealPlan(id) {
  return MealPlan.findById(id);
}*/

export async function listMealPlans(userId) {
  return MealPlan.find({ userId }).sort({ createdAt: -1 });
}
