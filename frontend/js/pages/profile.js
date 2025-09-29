import { getProfile, updateProfile } from "../api/profile.api.js";

async function values() {
  const { user, profile } = await getProfile();

  // Prefill readonly user data
  document.getElementById("name").value = user?.name ?? "";
  document.getElementById("email").value = user?.email ?? "";

  // Prefill profile fields
  document.getElementById("dietary-preference").value =
    profile?.diet ?? "omnivore";
  document.getElementById("budget").value = profile?.weeklyBudget ?? 0;
  document.getElementById("servings").value = profile?.servings ?? 1;

  // Join arrays into comma-separated strings for input fields
  document.getElementById("allergies").value =
    profile?.allergies?.join(", ") ?? "";
  document.getElementById("cuisines").value =
    profile?.cuisines?.join(", ") ?? "";
}

document.addEventListener("submit", async (e) => {
  if (e.target.matches("form")) {
    e.preventDefault();

    const allergiesRaw = document.getElementById("allergies").value.trim();
    const cuisinesRaw = document.getElementById("cuisines").value.trim();

    const payload = {
      diet: document.getElementById("dietary-preference").value,
      weeklyBudget: Number(document.getElementById("budget").value || 0),
      servings: Number(document.getElementById("servings").value || 1),
      allergies: allergiesRaw
        ? allergiesRaw.split(",").map((a) => a.trim())
        : [],
      cuisines: cuisinesRaw ? cuisinesRaw.split(",").map((c) => c.trim()) : [],
    };

    try {
      await updateProfile(payload);
      alert("✅ Profile saved!");
    } catch (err) {
      alert(
        "❌ Failed to save profile: " +
          (err.response?.data?.message || err.message)
      );
    }
  }
});

values();
