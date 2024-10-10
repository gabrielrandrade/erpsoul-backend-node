const express = require("express");
const crmRoutes = require("./crmRoutes.js");
const userRoutes = require("./userRoutes.js");
const homeRoutes = require("./homeRoutes.js");
const serviceRoutes = require("./serviceRoutes.js");
const privateRoutes = require("./privateRoutes.js");

const router = express.Router();

router.use("/crm", crmRoutes);
router.use("/user", userRoutes);
router.use("/home", homeRoutes);
router.use("/service", serviceRoutes);
router.use("/private-route", privateRoutes);

module.exports = router;