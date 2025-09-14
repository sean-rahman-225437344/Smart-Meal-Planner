import { registerUser, loginUser } from "../api/auth.api.js";

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    try {
      const data = await registerUser(name, email, password);
      alert("Registration successful: " + data.user.name);
      window.location.href = "dashboard.html";
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.message || "Error"));
    }
  });

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const data = await loginUser(email, password);
    alert("Login successful: " + data.user.name);
    window.location.href = "dashboard.html";
  } catch (err) {
    alert("Login failed: " + (err.response?.data?.message || "Error"));
  }
});
