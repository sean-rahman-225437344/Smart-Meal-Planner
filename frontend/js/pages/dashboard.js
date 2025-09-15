import { getProfile } from "../api/profile.api.js";
import { logoutUser } from "../api/auth.api.js";

async function loadDashboard() {
  try {
    const { user } = await getProfile();

    // update header welcome
    document.getElementById("welcomeName").textContent =
      user?.name || user?.email?.split("@")[0] || "User";

    // update Profile tab
    document.getElementById("pName").textContent = user?.name || "—";
    document.getElementById("pEmail").textContent = user?.email?.toUpperCase() || "—";
  } catch (err) {
    alert("You are not logged in. Redirecting...");
    window.location.href = "index.html";
  }
}

document.getElementById("logoutBtn").addEventListener("click", async () => {
  try {
    await logoutUser();
    window.location.href = "index.html";
  } catch (err) {
    alert("Logout failed: " + (err.response?.data?.message || "Error"));
  }
});

loadDashboard();
