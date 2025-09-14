import { registerUser, loginUser } from "../api/auth.api.js";

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    try {
      await registerUser(name, email, password);
      console.log("✅ Redirecting to dashboard...");
      window.location.href = "dashboard.html";
    } catch (err) {
      console.log("Registration failed:", err);
      alert("Registration failed: " + (err.response?.data?.message || "Error"));
    }
  });

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await loginUser(email, password);
    window.location.href = "dashboard.html";
  } catch (err) {
    alert("Login failed: " + (err.response?.data?.message || "Error"));
  }
});
