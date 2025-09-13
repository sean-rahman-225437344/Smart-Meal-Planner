import bcrypt from "bcryptjs";
import User from "./user.model.js";

export async function register({ email, password, name }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error({ code: "AUTH-409", message: "User already exists" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, name });
  return { id: user._id, email: user.email, name: user.name, role: user.role };
}

export async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error({ code: "AUTH-404", message: "User not found" });

  const valid = await user.comparePassword(password);
  if (!valid)
    throw new Error({ code: "AUTH-401", message: "Invalid credentials" });

  return { id: user._id, email: user.email, name: user.name, role: user.role };
}
