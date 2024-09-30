const express = require("express");
const authRoutes = require("./authRoutes.js");
const userRoutes = require("./userRoutes.js");
const clientRoutes = require("./clientRoutes.js");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/clients", clientRoutes);

module.exports = router;