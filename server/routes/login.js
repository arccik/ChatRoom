const express = require("express");
const router = express();

const authMiddleware = require("../middleware/auth-middleware");

router.post("/login", authMiddleware, (req, res, next) => {
  res.status(200);
  res.json({
    user: "admin",
    password: "12345",
  });
  return;
});

module.exports = router;
