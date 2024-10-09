const express = require("express");
const { check } = require("express-validator");
const { authenticate } = require("../middlewares/auth.js");
const {
    registerClient,
    getClients,
    editClient,
    deleteClient,
    reportsClients,
    exportReportsClients
} = require("../controllers/CrmController.js");

const router = express.Router();

let msg = "Preencha todos os campos requeridos!";

router.post("/register", [
    check("nome").notEmpty().withMessage(msg),
    check("cpfOuCnpj").notEmpty().withMessage(msg),
    check("dt_nasc").notEmpty().withMessage(msg),
    check("id_tipo_cliente").notEmpty().withMessage(msg),
    check("logradouro").notEmpty().withMessage(msg),
    check("numero").notEmpty().withMessage(msg),
    check("cep").notEmpty().withMessage(msg),
    check("bairro").notEmpty().withMessage(msg),
    check("cidade").notEmpty().withMessage(msg),
    check("uf").notEmpty().withMessage(msg)
], authenticate, registerClient);

router.get("/clientsRegistered", authenticate, getClients);

router.put("/clientsRegistered/:id_cliente/edit", [
    check("nome").notEmpty().withMessage(msg),
    check("cpfOuCnpj").notEmpty().withMessage(msg)
], editClient);

router.put("/clientsRegistered/:id_cliente/delete", deleteClient);

router.post("/reports", authenticate, reportsClients);

router.post("/exportReports", exportReportsClients);

module.exports = router;