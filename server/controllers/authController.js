const { validationResult } = require("express-validator");
const userService = require("../services/userService");

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

      return res.status(201).json({ message: "User created", token, user });
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

      return res.json({ message: "Login successful", token, user });
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async logout(req, res) {
    return res.json({ message: "Logged out" });
  }
}

module.exports = new AuthController();