import { getProfile } from "../api/profile.api.js";
import { logoutUser } from "../api/auth.api.js";

async function loadDashboard() {
  try {
    const data = await getProfile();
    document.getElementById(
      "welcomeMsg"
    ).textContent = `Welcome, ${data.user.name} (${data.user.email})`;
  } catch (err) {
    alert("You are not logged in. Redirecting...");
    window.location.href = "index.html";
  }
}

document.getElementById("logoutBtn").addEventListener("click", async () => {
  try {
    await logoutUser();
    alert("Logged out");
    window.location.href = "index.html";
  } catch (err) {
    alert("Logout failed: " + (err.response?.data?.message || "Error"));
  }
});

loadDashboard();
