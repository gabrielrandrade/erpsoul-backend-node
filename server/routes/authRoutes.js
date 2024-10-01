const express = require("express");
const { login, logout, register, forgotPassword, resetPassword } = require("../controllers/AuthController.js");
const { check } = require("express-validator");

const router = express.Router();

router.post("/login", [
    check("email").isEmail().withMessage("Email inválido!"),
    check("senha").notEmpty().withMessage("Senha obrigatória!")
], login);

router.post("/logout", logout);

router.post("/register", [
    check("nome").notEmpty().withMessage("Nome obrigatório!"),
    check("email").isEmail().withMessage("Email inválido!"),
    check("senha").isLength({ min: 6 }).withMessage("Senha deve ter no mínimo 6 caracteres!")
], register);

router.post("/forgot-password", [
    check("email").isEmail().withMessage("Email inválido!")
], forgotPassword);

router.post("/reset-password", [
    check("email").isEmail().withMessage("Email inválido!"),
    check("senha").notEmpty().withMessage("Senha obrigatória!"),
    check("confSenha").notEmpty().withMessage("Confirmação de Senha obrigatória!"),
    check("idRec").notEmpty().withMessage("idRec está vazio!")
], resetPassword);

module.exports = router;