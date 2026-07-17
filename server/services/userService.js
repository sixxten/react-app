const bcrypt = require("bcryptjs");
const User = require("../models/User");
const tokenService = require("./tokenService");

class UserService {
  async registration(email, password) {
    const currUser = await User.findOne({ where: { email } });
    if (currUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ email, password: hashedPassword });

    const payload = { userId: user.id, email: user.email, role: user.role };
    const token = tokenService.generateToken(payload);

    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Wrong password");

    const payload = { userId: user.id, email: user.email, role: user.role };
    const token = tokenService.generateToken(payload);

    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }
}

module.exports = new UserService();