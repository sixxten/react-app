const tokenService = require("../services/tokenService");

module.exports = function (req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "No authorization header" });

    const [type, token] = header.split(" ");
    if (type !== "Bearer" || !token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const userData = tokenService.validateToken(token);
    if (!userData) return res.status(401).json({ message: "Invalid or expired token" });

    req.user = userData;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};