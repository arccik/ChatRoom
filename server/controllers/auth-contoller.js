const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/user-model");

const generateAccessToken = (id, username) => {
  const payload = { id, username };
  const secret = process.env.JWT_SECRET;
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthContoller {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error during login", errors });
      }
      const { username, password } = req.body;
      const condidate = await User.findOne({ username });
      if (condidate) throw new Error("Username is taken, make a new name");
      if (username && password) {
        const hashPassword = await bcrypt.hash(password, 5);
        await User.create({
          username,
          password: hashPassword,
        });
        return res.json({
          message: `User ${username} is created`,
          user: username,
        });
      } else {
        return res.json({ message: "User or password is missing" });
      }
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error during login", errors });
      }
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      } else {
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
          return res.status(400).json({ message: "Invalid Password" });
        } else {
          const token = generateAccessToken(user._id, username);
          return res.status(200).json({ token });
        }
      }
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req, res, next) {
    try {
      const { user } = req;
      const condidate = await User.findById(user.id);
      if (!condidate) {
        return res.status(403).json({ message: "User Not authorized" });
      }
      if (condidate.username === user.username) {
        return res
          .status(200)
          .json({ message: "User successfuly Authorized", status: "OK" });
      }
      return res.status(403).json({ message: "User Not Auth" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthContoller();
