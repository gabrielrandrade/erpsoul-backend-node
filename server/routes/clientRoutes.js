const express = require("express");
const { check } = require("express-validator");
const { authenticate } = require("../middlewares/auth.js");
const { registerClient, getClients } = require("../controllers/ClientController.js");

const router = express.Router();

router.post("/register", [
    check("nome").notEmpty().withMessage("Nome obrigatório!"),
    check("cpfOuCnpj").notEmpty().withMessage("CPF/CNPJ obrigatório!")
], authenticate, registerClient);

router.get("/", authenticate, getClients);

module.exports = router;