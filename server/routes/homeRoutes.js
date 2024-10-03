const express = require("express");
const { authenticate } = require("../middlewares/auth.js");
const { getHomeData } = require("../controllers/HomeController.js");

const router = express.Router();

router.get("/", authenticate, getHomeData);

module.exports = router;