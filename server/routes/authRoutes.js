const express = require("express");
const { login, register, forgotPassword } = require("../controllers/AuthController.js");
const { check } = require("express-validator");

const router = express.Router();

router.post("/login", [
    check("email").isEmail().withMessage("Email inválido!"),
    check("senha").notEmpty().withMessage("Senha obrigatória!")
], login);

router.post("/register", [
    check("nome").notEmpty().withMessage("Nome obrigatório!"),
    check("email").isEmail().withMessage("Email inválido!"),
    check("senha").isLength({ min: 6 }).withMessage("Senha deve ter no mínimo 6 caracteres!")
], register);

router.post("/forgot-password", [
    check("email").isEmail().withMessage("Email inválido!")
], forgotPassword);

module.exports = router;