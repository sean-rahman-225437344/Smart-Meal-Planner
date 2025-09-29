import { getProfile } from "../api/profile.api.js";
import { logoutUser } from "../api/auth.api.js";
import { listMealPlans } from "../api/mealplan.api.js";

async function loadDashboard() {
  try {
    const { user } = await getProfile();

    // update header welcome
    document.getElementById("welcomeName").textContent =
      user?.name || user?.email?.split("@")[0] || "User";

    // update Profile tab
    document.getElementById("pName").textContent = user?.name || "—";
    document.getElementById("pEmail").textContent =
      user?.email?.toUpperCase() || "—";
  } catch (err) {
    alert("You are not logged in. Redirecting...");
    window.location.href = "index.html";
  }
}

async function loadPlans() {
  try {
    const plans = await listMealPlans();
    const listEl = document.querySelector(".plan-list");
    listEl.innerHTML = ""; // clear the demo plans already in HTML

    if (!plans.length) {
      listEl.innerHTML = `<li class="muted">No meal plans yet. Create one!</li>`;
      return;
    }

    for (const plan of plans) {
      const li = document.createElement("li");
      li.className = "plan";

      li.innerHTML = `
        <div class="plan-title">${plan.title || `${plan.type} Plan`}</div>
        <div class="plan-meta muted">
          Budget: $${plan.budget ?? "—"} • Days: ${
        plan.days ?? "—"
      } • Created: ${new Date(plan.createdAt).toLocaleDateString()}
        </div>
        <div class="plan-actions">
          <button class="btn ghost view-btn">View</button>
          <button class="btn ghost edit-btn">Edit</button>
          <button class="btn ghost danger delete-btn">Delete</button>
        </div>
      `;

      // Example event listeners
      li.querySelector(".view-btn").addEventListener("click", () => {
        alert(`Viewing plan: ${plan.id}`);
      });
      li.querySelector(".edit-btn").addEventListener("click", () => {
        alert(`Editing plan: ${plan.id}`);
      });
      li.querySelector(".delete-btn").addEventListener("click", () => {
        alert(`Deleting plan: ${plan.id}`);
      });

      listEl.appendChild(li);
    }
  } catch (err) {
    console.error("Failed to load plans:", err);
  }
}

// 🔹 Handle New Plan button
document.getElementById("newPlanBtn")?.addEventListener("click", async () => {
  try {
    // for now, always create "daily" plan (you can later ask user type)
    await createMealPlan("daily");
    await loadPlans(); // refresh list
  } catch (err) {
    alert(
      "Failed to create meal plan: " +
        (err.response?.data?.message || err.message)
    );
  }
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  try {
    await logoutUser();
    window.location.href = "index.html";
  } catch (err) {
    alert("Logout failed: " + (err.response?.data?.message || "Error"));
  }
});

loadDashboard();
