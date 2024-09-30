const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { encrypt } = require("../utils/utils.js");
const { sendEmail } = require("../utils/email.js");
const Token = require("../models/Token.js");
const User = require("../models/User.js");

const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, senha, conectado } = req.body;

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ mensagem: "Email e/ou Senha inválido!" });
        }

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(400).json({ mensagem: "Email e/ou Senha inválido!" });
        }

        await Token.removeAllByUser(user.id_usuario);

        const expiresIn = conectado ? "7d" : "1d";
        const token = jwt.sign({ userId: user.id_usuario }, JWT_SECRET, { expiresIn });

        await Token.create(token, user.id_usuario, expiresIn);

        return res.json({ mensagem: "Usuário logado com sucesso!", token });
    } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
}

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nome, email, senha, whatsapp, cpfOuCnpj, cargo, faturamento } = req.body;

    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ mensagem: "E-mail já cadastrado!" });
        }

        const { cryptPass, cryptHash } = await encrypt(senha);
        const newUser = await User.create({
            nome,
            email,
            senha: cryptPass,
            hash: cryptHash,
            whatsapp,
            cpfOuCnpj,
            cargo,
            faturamento
        });

        const token = jwt.sign({ userId: newUser.id_usuario }, JWT_SECRET, { expiresIn: "1d" });
        await Token.create(token, newUser.id_usuario, "1d");

        return res.json({ mensagem: "Usuário cadastrado com sucesso!", token });
    } catch (err) {
        console.error("Erro ao cadastrar usuário:", err);
        res.status(500).json({ erro: "Erro ao cadastrar usuário" });
    }
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ mensagem: "E-mail inválido!" });
        }

        const resetUrl = `http://localhost:3000/nova-senha?idRec=${ user.hash }`;
        await sendEmail(email, "Recuperação de Senha", `Clique no link para redefinir sua senha: ${ resetUrl }`);
        
        return res.json({ mensagem: "E-mail enviado!" });
    } catch (err) {
        console.error("Erro ao enviar o E-mail:", err);
        res.status(500).json({ erro: "Erro ao enviar o E-mail" });
    }
}