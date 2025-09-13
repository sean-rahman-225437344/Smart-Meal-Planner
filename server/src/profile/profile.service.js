import Profile from "./profile.model.js";

export async function getProfile(userId) {
  return Profile.findOne({ userId }).lean();
}

export async function updateProfile(userId, data) {
  return Profile.findOneAndUpdate(
    { userId },
    { $set: data },
    { new: true, upsert: true }
  ).lean();
}
