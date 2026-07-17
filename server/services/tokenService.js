const jwt = require("jsonwebtoken");
const config = require("config");

class TokenService {
  generateToken(payload) {
    return jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: config.get("jwtExpiresIn"),
    });
  }

  validateToken(token) {
    try {
      return jwt.verify(token, config.get("jwtSecret"));
    } catch (e) {
      return null;
    }
  }
}

module.exports = new TokenService();