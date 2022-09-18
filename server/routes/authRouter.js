const express = require("express");
const router = new express.Router();

const authContoller = require("../controllers/auth-contoller");
const authMiddleware = require("../middleware/auth-middleware");

router.post("/registration", authContoller.registration);
router.post("/login", authContoller.login);
router.get("/getUsers", authContoller.getUsers);

module.exports = router;
