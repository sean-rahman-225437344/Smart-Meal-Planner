import { getProfile, updateProfile } from "../api/profile.api.js";

async function values() {
  const { user, profile } = await getProfile();
  document.getElementById("name").value = user?.name ?? "";
  document.getElementById("email").value = user?.email ?? "";
  document.getElementById("dietary-preference").value =
    profile?.diet ?? "vegetarian";
  document.getElementById("budget").value = profile?.weeklyBudget ?? 0;
  //add more fields here as needed
}
document.addEventListener("submit", async (e) => {
  if (e.target.matches("form")) {
    e.preventDefault();
    const payload = {
      diet: document.getElementById("dietary-preference").value,
      weeklyBudget: Number(document.getElementById("budget").value || 0),
      allergies: ["nuts"], //change here to make dynamic
      cuisines: ["indian", "italian"], //change here to make dynamic
      servings: 2, //change here to make dynamic
    };
    try {
      await updateProfile(payload);
      alert("Profile saved!");
    } catch (err) {
      alert(
        "Failed to save profile: " +
          (err.response?.data?.message || err.message)
      );
    }
  }
});

values();
