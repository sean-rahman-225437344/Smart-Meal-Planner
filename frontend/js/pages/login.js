import { registerUser, loginUser } from "../api/auth.api.js";

// ✅ Signup handler
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await registerUser(name, email, password);
      console.log("✅ Redirecting to dashboard...");
      window.location.href = "dashboard.html";
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed: " + (err.response?.data?.message || "Error"));
    }
  });
}

// ✅ Login handler
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await loginUser(email, password);
      window.location.href = "dashboard.html";
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed: " + (err.response?.data?.message || "Error"));
    }
  });
}
