const express = require("express");
const { getHomeData } = require("../controllers/UserController.js");
const { authenticate } = require("../middlewares/auth.js");

const router = express.Router();

router.get("/home", authenticate, getHomeData);

module.exports = router;