const bcrypt = require("bcrypt");
const User = require("../models/user-model");

class AuthContoller {
  async registration(req, res, next) {
    try {
      const { username, password } = req.body;

      const condidate = await User.findOne({ username });
      if (condidate) throw new Error("Username is taken, make a new name");
      if (username && password) {
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({
          username,
          password: hashPassword,
        });
        res.json({ message: `User ${username} is created`, user: username });
      } else {
        res.json({ message: "User or password is missing" });
      }
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new Error("Username or password missing");
      }
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      } else {
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (isPassEqual) {
          res.json({ message: "Access Granted", user: username, status: "ok" });
        } else {
          throw new Error("User or password not matching");
        }
      }
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req, res, next) {
    try {
      res.json({ getUsers: true });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthContoller();
