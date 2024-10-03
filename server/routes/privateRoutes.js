const express = require("express");
const { authenticate } = require("../middlewares/auth.js");

const router = express.Router();

router.get("/", authenticate);

module.exports = router;