const express = require("express");
const { check } = require("express-validator");
const { authenticate } = require("../middlewares/auth.js");
const {
    registerService,
    getServices,
    // editService,
    // deleteService,
    reportsServices,
    exportReportsServices
} = require("../controllers/ServiceController.js");

const router = express.Router();

let msg = "Preencha todos os campos requeridos!";

router.post("/register", [
    check("servico").notEmpty().withMessage(msg),
], authenticate, registerService);

router.get("/servicesRegistered", authenticate, getServices);

// router.put("/servicesRegistered/:id_servico/edit", [
//     check("servico").notEmpty().withMessage(msg)
// ], editService);

// router.put("/servicesRegistered/:id_servico/delete", deleteService);

router.post("/reports", authenticate, reportsServices);

router.post("/exportReports", exportReportsServices);

module.exports = router;