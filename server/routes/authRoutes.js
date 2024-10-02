const express = require("express");
const { check } = require("express-validator");
const { loginLimiter } = require("../middlewares/loginLimiter.js");
const { login, logout, register, forgotPassword, resetPassword } = require("../controllers/AuthController.js");

const router = express.Router();

router.post("/login", loginLimiter, [
    check("email").isEmail().withMessage("E-mail inválido!").normalizeEmail(),
    check("senha").notEmpty().withMessage("Senha obrigatória!"),
    // body("senha").trim().escape()
], login);

router.put("/logout", logout);

router.post("/register", [
    check("nome").notEmpty().withMessage("Nome obrigatório!"),
    // check("nome").trim().escape(),
    check("email").isEmail().withMessage("E-mail inválido!").normalizeEmail(),
    check("senha").notEmpty().withMessage("Senha obrigatória!"),
    // body("senha").trim().escape(),
    check("whatsapp").trim().escape(),
    check("cpfOuCnpj").trim().escape(),
    check("cargo").trim().escape(),
    check("faturamento").isNumeric().withMessage("Valor inválido!")
], register);

router.post("/forgot-password", [
    check("email").isEmail().withMessage("E-mail inválido!")
], forgotPassword);

router.post("/reset-password", [
    check("email").isEmail().withMessage("E-mail inválido!"),
    check("senha").notEmpty().withMessage("Senha obrigatória!"),
    check("confSenha").notEmpty().withMessage("Confirmação de Senha obrigatória!"),
    check("idRec").notEmpty().withMessage("idRec está vazio!")
], resetPassword);

module.exports = router;