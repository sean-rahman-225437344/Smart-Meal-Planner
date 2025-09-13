import * as ProfileService from "./profile.service.js";
import User from "../auth/user.model.js";

export async function getMe(req, res, next) {
  try {
    if (!req.session.userId) {
      return res
        .status(401)
        .json({ code: "AUTH-401", message: "Not authenticated" });
    }
    const user = await User.findById(req.session.userId).select(
      "-passwordHash"
    );
    if (!user) {
      return res
        .status(404)
        .json({ code: "AUTH-404", message: "User not found" });
    }
    const profile = await ProfileService.getProfile(user._id);
    res.json({ user, profile });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req, res, next) {
  try {
    if (!req.session.userId) {
      return res
        .status(401)
        .json({ code: "AUTH-401", message: "Not authenticated" });
    }
    const updated = await ProfileService.updateProfile(
      req.session.userId,
      req.body
    );
    res.json({ message: "Profile updated", profile: updated });
  } catch (err) {
    next(err);
  }
}
