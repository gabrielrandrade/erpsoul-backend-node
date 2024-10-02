const express = require("express");
const { authenticate } = require("../middlewares/auth.js");
const { getHomeData } = require("../controllers/UserController.js");

const router = express.Router();

router.get("/home", authenticate, getHomeData);
router.get("/private-route", authenticate);

module.exports = router;