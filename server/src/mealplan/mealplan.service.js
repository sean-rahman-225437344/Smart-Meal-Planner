import MealPlan from "./mealplan.model.js";
import Profile from "../profile/profile.model.js";
import Recipe from "../recipe/recipe.model.js";
import GroceryList from "../grocery/grocery.model.js";

export async function generateMealPlan(userId, type = "daily") {
  const profile = await Profile.findOne({ userId });
  if (!profile) throw new Error("No profile found for user.");

  let recipes = await Recipe.find({
    dietTags: profile.diet,
    allergenTags: { $nin: profile.allergies },
    cuisine: { $in: profile.cuisines }
  }).limit(50);

  if (!recipes.length) throw new Error("No recipes found for preferences");

  function shuffle(a){ 
    for (let i=a.length-1; i>0; i--){ 
      const j = Math.floor(Math.random()*(i+1)); 
      [a[i],a[j]] = [a[j],a[i]];
    } 
    return a; 
  }
recipes = shuffle(recipes);

  
  const selectedMeals = (r) => ({
    title: r.title,
    recipeId: r._id,
    servings: profile.servings,
    costPerServing: r.costPerServing ?? 0
  });

  const mealsPerDay = 3;
  const days = [];
  const pool = recipes.slice(); 


  for (let d = 0; d < (type === "weekly" ? 7 : 1); d++) {
  if (pool.length < mealsPerDay) {
    pool.push(...shuffle(recipes.slice()));
  }
  const dayRecipes = pool.splice(0, mealsPerDay);
  const dayMeals = dayRecipes.map(selectedMeals); 
  days.push({ date: new Date(Date.now() + d * 86400000), meals: dayMeals });
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

//grocery list generation for weekly plans

export async function buildWeeklyGrocery(userId) {

  const plan = await MealPlan.findOne({ userId, type: "weekly" }).sort({ createdAt: -1 });
  if (!plan) {
    const err = new Error("No weekly meal plan found for this user. Create one with POST /api/mealplans?type=weekly");
    err.status = 404;
    throw err;
  }

  
  const recipeIds = [];
  for (const day of plan.days || []) {
    for (const m of (day.meals || [])) {
      if (m?.recipeId) recipeIds.push(m.recipeId);
    }
  }

  if (!recipeIds.length) {
    return { plan, items: [], weekStart: plan.days?.[0]?.date || null, weekEnd: plan.days?.[plan.days.length-1]?.date || null };
  }

 
  const recipes = await Recipe.find({ _id: { $in: recipeIds } }).select("title ingredients");
  const recipeMap = new Map(recipes.map(r => [String(r._id), r]));

  
  const agg = new Map(); 
  for (const day of plan.days || []) {
    for (const m of (day.meals || [])) {
      const servings = Number(m?.servings ?? 1);
      const r = recipeMap.get(String(m.recipeId));
      if (!r) continue;

      for (const ing of (r.ingredients || [])) {
        const name = (ing.name || "").trim();
        const unit = (ing.unit || "").trim();
        const baseQty = Number(ing.quantity ?? 0);

        const key = `${name.toLowerCase()}|${unit}`;
        const prev = agg.get(key) || { name, unit, quantity: 0, recipes: new Set() };
        prev.quantity += baseQty * servings;
        prev.recipes.add(r.title);
        agg.set(key, prev);
      }
    }
  }

  const items = [...agg.values()]
    .map(x => ({ name: x.name, unit: x.unit, quantity: x.quantity, recipes: [...x.recipes] }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const weekStart = plan.days?.[0]?.date || null;
  const weekEnd   = plan.days?.[plan.days.length - 1]?.date || null;

  return { plan, items, weekStart, weekEnd };
}

export async function createGrocerySnapshot(userId) {
  const { plan, items, weekStart, weekEnd } = await buildWeeklyGrocery(userId);
  const doc = await GroceryList.create({
    userId,
    planId: plan._id,
    weekStart,
    weekEnd,
    items
  });
  return doc;
}