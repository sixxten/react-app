const { Router } = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  authController.register
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").exists(),
  authController.login
);

router.post("/logout", authController.logout);

router.get("/me", authMiddleware, (req, res) => {
  return res.json({ user: req.user });
});

module.exports = router;