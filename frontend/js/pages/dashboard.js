import { listMealPlans } from "../api/mealplan.api.js";
import { getProfile } from "../api/profile.api.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadProfile();
  await loadMealPlans();
});

async function loadProfile() {
  try {
    const data = await getProfile();
    const { user, profile } = data;

    document.getElementById("profileName").textContent = user?.name || "—";
    document.getElementById("profileEmail").textContent = user?.email || "—";
    document.getElementById("profileDiet").textContent = profile?.diet || "—";
    document.getElementById("profileBudget").textContent = profile?.weeklyBudget
      ? `$${profile.weeklyBudget}/week`
      : "—";

    // Optional: also show allergies and cuisines if you add placeholders in HTML
    if (document.getElementById("profileAllergies")) {
      document.getElementById("profileAllergies").textContent = profile
        ?.allergies?.length
        ? profile.allergies.join(", ")
        : "None";
    }
    if (document.getElementById("profileCuisines")) {
      document.getElementById("profileCuisines").textContent = profile?.cuisines
        ?.length
        ? profile.cuisines.join(", ")
        : "—";
    }
  } catch (err) {
    console.error("❌ Failed to load profile:", err);
    document.getElementById("profileName").textContent =
      "Error loading profile";
  }
}

async function loadMealPlans() {
  const container = document.getElementById("recentPlans");
  container.innerHTML =
    "<p class='text-gray-500 dark:text-gray-400'>Loading...</p>";

  try {
    const plans = await listMealPlans();

    if (!plans.length) {
      container.innerHTML = `
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="flex-1 text-center md:text-left">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">No recent meal plans</h3>
            <p class="text-gray-500 dark:text-gray-400 mt-1 mb-4">
              Start planning your meals for the week!
            </p>
            <a href="mealplan.html"
              class="w-full md:w-auto inline-block bg-primary text-gray-900 font-bold py-2 px-5 rounded-lg hover:bg-primary/90 transition-all text-sm"
            >
              Generate Meal Plan
            </a>
          </div>
        </div>`;
      return;
    }

    // Show up to 3 recent plans
    container.innerHTML = plans.slice(0, 3).map(renderPlanCard).join("");
  } catch (err) {
    console.error("❌ Failed to load meal plans:", err);
    container.innerHTML = `
      <p class="text-red-500 dark:text-red-400">
        Could not load meal plans. Please try again later.
      </p>`;
  }
}

function renderPlanCard(plan) {
  const created = new Date(plan.createdAt).toLocaleString();
  const cost = `$${(plan.estimatedCost ?? 0).toFixed(2)}`;
  const servings = plan.days.reduce(
    (sum, d) => sum + d.meals.reduce((s, m) => s + (m.servings || 1), 0),
    0
  );

  return `
    <div class="p-4 mb-4 rounded-lg border bg-background-light dark:bg-background-dark shadow-sm">
      <h3 class="font-bold text-gray-900 dark:text-white">
        ${capitalize(plan.type)} Plan
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">Created: ${created}</p>
      <p class="text-sm">Estimated Cost: <span class="font-semibold">${cost}</span></p>
      <p class="text-sm">Total Servings: <span class="font-semibold">${servings}</span></p>
      <a href="mealplan.html" class="text-primary text-sm underline">View details</a>
    </div>
  `;
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
}
