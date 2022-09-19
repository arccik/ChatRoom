const express = require("express");
const router = new express.Router();
const { check } = require("express-validator");
const authContoller = require("../controllers/auth-contoller");
const authMiddleware = require("../middleware/auth-middleware");

router.post(
  "/registration",
  [
    check("username", "Username is required").notEmpty(),
    check("email", "Email address not valid").isEmail(),
    check("password", "Password length must be min 4 and max 30").isLength({
      min: 4,
      max: 30,
    }),
  ],
  authContoller.registration
);
router.post("/login", authContoller.login);
router.get("/getUsers", authContoller.getUsers);
router.post("/validateUser", authMiddleware, authContoller.getUsers);

module.exports = router;
