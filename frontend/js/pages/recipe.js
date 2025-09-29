// js/pages/recipe.js
import { getRecipe } from "../api/recipe.api.js";

function getRecipeIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

document.addEventListener("DOMContentLoaded", async () => {
  const id = getRecipeIdFromUrl();
  const container = document.getElementById("recipeContainer");

  if (!id) {
    container.innerHTML = "<p>No recipe ID provided.</p>";
    return;
  }

  try {
    const recipe = await getRecipe(id);

    container.innerHTML = `
      <div class="bg-white shadow-md rounded-lg p-6">
        <h1 class="text-3xl font-bold mb-4">${recipe.title}</h1>
        <p class="text-gray-600 mb-2">Cuisine: ${recipe.cuisine}</p>
        <p class="text-gray-600 mb-2">Diet: ${
          recipe.dietTags?.join(", ") || "—"
        }</p>
        <p class="text-gray-600 mb-2">Allergens: ${
          recipe.allergenTags?.join(", ") || "—"
        }</p>
        <p class="text-gray-600 mb-4">Cost/Serving: $${
          recipe.costPerServing || 0
        }</p>

        <h2 class="text-xl font-semibold mb-2">Ingredients</h2>
        <ul class="list-disc pl-6 mb-4">
          ${(recipe.ingredients || [])
            .map((i) => `<li>${i.quantity} ${i.unit} ${i.name}</li>`)
            .join("")}
        </ul>
      </div>
    `;
  } catch (err) {
    console.error(err);
    container.innerHTML =
      "<p class='text-red-500'>Failed to load recipe details.</p>";
  }
});
