import * as AuthService from "./auth.service.js";

export async function registerUser(req, res, next) {
  try {
    const { email, password, name } = req.body;
    const user = await AuthService.register({ email, password, name });
    req.session.userId = user.id;
    res.status(201).json({ message: "Registered successfully", user });
  } catch (err) {
    next(err);
  }
}

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await AuthService.login({ email, password });
    req.session.userId = user.id;
    res.json({ message: "Login successful", user });
  } catch (err) {
    next(err);
  }
}

export async function logoutUser(req, res, next) {
  try {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out" });
    });
  } catch (err) {
    next(err);
  }
}
