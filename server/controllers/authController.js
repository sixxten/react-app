const { validationResult } = require("express-validator");
const userService = require("../services/userService");

const COOKIE_NAME = "token";

class AuthController {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login or password during registration",
        });
      }

      const { email, password } = req.body;
      const { token, user } = await userService.registration(email, password);


      res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({ message: "User created", user });
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data while logging",
        });
      }

      const { email, password } = req.body;
      const { token, user } = await userService.login(email, password);

      res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ message: "Login successful", user });
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async logout(req, res) {
    res.clearCookie(COOKIE_NAME);
    return res.json({ message: "Logged out" });
  }
}

module.exports = new AuthController();