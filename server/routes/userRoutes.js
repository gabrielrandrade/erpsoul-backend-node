const express = require("express");
const { check } = require("express-validator");
const { loginLimiter } = require("../middlewares/loginLimiter.js");
const {
    login,
    logout,
    register,
    forgotPassword,
    resetPassword
} = require("../controllers/UserController.js");

const router = express.Router();

router.post("/login", loginLimiter, [
    check("email").isEmail().withMessage("Credenciais inválidas!").normalizeEmail(),
    check("senha").notEmpty().withMessage("Preencha todos os campos!"),
    check("senha").trim().escape()
], login);

router.put("/logout", logout);

router.post("/register", [
    check("nome").notEmpty().withMessage("Preencha todos os campos requeridos!"),
    check("nome").trim().escape(),
    check("email").isEmail().withMessage("E-mail inválido!").normalizeEmail(),
    check("senha").notEmpty().withMessage("Preencha todos os campos requeridos!"),
    check("senha").trim().escape(),
    check("whatsapp").trim().escape(),
    check("cpfOuCnpj").trim().escape(),
    check("cargo").trim().escape(),
    check("faturamento").isNumeric().withMessage("Faturamento inválido!")
], register);

router.post("/forgot-password", [
    check("email").isEmail().withMessage("E-mail inválido!")
], forgotPassword);

router.post("/reset-password", [
    check("email").isEmail().withMessage("E-mail inválido!"),
    check("senha").notEmpty().withMessage("Preencha todos os campos!"),
    check("confSenha").notEmpty().withMessage("Preencha todos os campos!"),
    check("idRec").notEmpty().withMessage("Não é possível alterar a senha!")
], resetPassword);

module.exports = router;