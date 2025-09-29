import { generateMealPlan } from "../api/mealplan.api.js";

document.getElementById("generateBtn").addEventListener("click", async () => {
  const type = document.getElementById("plan-duration").value; // daily | weekly
  const grid = document.getElementById("planGrid");
  const heading = document.getElementById("planHeading");
  const est = document.getElementById("estimatedCost");
  const serv = document.getElementById("totalServings");

  // reset UI
  grid.innerHTML = "";
  heading.textContent = "Generating your plan...";
  est.textContent = "—";
  serv.textContent = "—";

  try {
    const plan = await generateMealPlan(type);

    // update heading
    heading.textContent = `Your ${
      plan.type.charAt(0).toUpperCase() + plan.type.slice(1)
    } Meal Plan`;

    // render days
    grid.innerHTML = plan.days
      .map((day) => {
        const dateObj = new Date(day.date);
        const title = dateObj.toLocaleDateString(undefined, {
          weekday: "long",
        });

        const meals = (day.meals || [])
          .map(
            (m, idx) => `
  <div class="p-3 rounded bg-primary/10 dark:bg-primary/20">
    <p class="font-semibold">Meal ${idx + 1}</p>
    <p class="text-sm">${m.title}</p>
    <p class="text-xs text-subtle-light dark:text-subtle-dark">
      Serves ${m.servings}
    </p>
    <a href="recipe.html?id=${m.recipeId}" 
       class="text-primary text-xs underline mt-2 inline-block">
       View Recipe
    </a>
  </div>`
          )
          .join("");

        return `
            <div class="lg:col-span-1">
              <div class="p-4 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
                <h4 class="font-bold text-lg mb-3 text-center">${title}</h4>
                <div class="space-y-3">${meals}</div>
              </div>
            </div>`;
      })
      .join("");

    // update summary
    est.textContent = `$${(plan.estimatedCost ?? 0).toFixed(2)}`;
    serv.textContent = plan.days.reduce(
      (sum, d) => sum + d.meals.reduce((s, m) => s + (m.servings || 1), 0),
      0
    );
  } catch (err) {
    console.error("Meal plan generation failed:", err);
    alert(
      "Meal plan generation failed: " + (err.response?.data?.message || "Error")
    );
    heading.textContent = "Your Meal Plan";
  }
});
