const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cache = require("memory-cache");
const UserModel = require("../models/UserModel.js");
const TokenModel = require("../models/TokenModel.js");
const { encrypt } = require("../utils/encrypt.js");
const { validationResult } = require("express-validator");
const { sendEmail, confirmationEmail } = require("../utils/email.js");
const { isValidEmail, isValidCpfCnpj } = require("../utils/validators.js");

const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, senha, conectado } = req.body;

    if (email.length > 250 || senha.length > 60) {
        return res.status(400).json({ mensagem: "Credenciais inválidas!" });
    }

    try {
        const user = await UserModel.findByEmail(email);
        if (!user) {
            return res.status(400).json({ mensagem: "E-mail e/ou Senha inválido!" });
        }

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(400).json({ mensagem: "E-mail e/ou Senha inválido!" });
        }

        await TokenModel.removeAllByUser(user.id_usuario);

        const expiresIn = conectado ? "7d" : "1d";
        const token = jwt.sign({ userId: user.id_usuario }, JWT_SECRET, { expiresIn });

        await TokenModel.create(token, expiresIn, user.id_usuario);

        return res.json({ mensagem: "Usuário logado com sucesso!", token });
    } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
}

exports.logout = async (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ mensagem: "Acesso negado!" });
    }

    try {
        const removeToken = await TokenModel.remove(token);

        if (removeToken.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Token não encontrado." });
        } else {
            return res.json({ mensagem: "Usuário desconectado com sucesso!" });
        }
    } catch (err) {
        console.error("Erro ao desconectar usuário:", err);
        res.status(500).json({ erro: "Erro ao desconectar usuário" });
    }
}

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        nome,
        email,
        senha,
        whatsapp,
        nome_empresa,
        cpfOuCnpj,
        email_contador,
        cargo,
        faturamento
    } = req.body;

    if (!nome || !email || !senha || !nome_empresa || !cpfOuCnpj || !cargo) {
        return res.status(400).json({ mensagem: "Preencha todos os campos requeridos!" });
    }

    if (nome.length > 50 || nome.length < 1 || nome_empresa.length > 50 || nome_empresa.length < 1) {
        return res.status(400).json({ mensagem: "Nome inválido!" });
    }

    if (
        email.length > 250 ||
        (email_contador.length > 0 && !isValidEmail(email_contador)) ||
        email_contador.length > 250
    ) {
        return res.status(400).json({ mensagem: "E-mail inválido!" });
    }

    if (senha.length > 60) {
        return res.status(400).json({ mensagem: "Senha inválida!" });
    }

    if (whatsapp.length > 14) {
        return res.status(400).json({ mensagem: "WhatsApp inválido!" });
    }

    if (!isValidCpfCnpj(cpfOuCnpj)) {
        return res.status(400).json({ mensagem: "CPF ou CNPJ inválido!" });
    }

    if (cargo.length > 50) {
        return res.status(400).json({ mensagem: "Cargo inválido!" });
    }

    if (faturamento.length > 16) {
        return res.status(400).json({ mensagem: "Faturamento inválido!" });
    }

    try {
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ mensagem: "Não foi possível cadastrar usuário!" });
        }

        const { cryptPass, cryptHash } = await encrypt(senha);
        const newUserId = await UserModel.create({
            nome,
            email,
            senha: cryptPass,
            hash: cryptHash,
            whatsapp,
            nome_empresa,
            cpfOuCnpj,
            email_contador,
            cargo,
            faturamento
        });

        expiresIn = "1d";
        const token = jwt.sign({ userId: newUserId }, JWT_SECRET, { expiresIn });
        await TokenModel.create(token, expiresIn, newUserId);

        return res.json({ mensagem: "Usuário cadastrado com sucesso!", token });
    } catch (err) {
        console.error("Erro ao cadastrar usuário:", err);
        res.status(500).json({ erro: "Erro ao cadastrar usuário" });
    }
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (email.length > 250) {
        return res.status(400).json({ mensagem: "E-mail inválido!" });
    }

    try {
        const user = await UserModel.findByEmail(email);
        if (!user) {
            return res.status(404).json({ mensagem: "E-mail inválido!" });
        }

        const EMAIL_WAIT_TIME = 60 * 2;
        const cachedTime = cache.get(email);
        if (cachedTime) {
            const timeSinceLastEmail = (Date.now() - cachedTime) / 1000;
            if (timeSinceLastEmail < EMAIL_WAIT_TIME) {
                const remainingTime = Math.ceil(EMAIL_WAIT_TIME - timeSinceLastEmail);
                return res.status(429).json({
                    mensagem: `Aguarde ${ remainingTime } segundos para enviar outro E-mail.`
                });
            }
        }

        const idRec = user.hash;
        const sendingEmail = await sendEmail(email, idRec);

        if (sendingEmail.accepted.length > 0) {
            cache.put(email, Date.now(), EMAIL_WAIT_TIME * 1000);
            return res.json({ mensagem: "E-mail enviado!" });
        } else {
            return res.status(500).json({ mensagem: "Erro ao enviar o E-mail." });
        }
    } catch (err) {
        console.error("Erro ao enviar o E-mail:", err);
        res.status(500).json({ erro: "Erro ao enviar o E-mail" });
    }
}

exports.resetPassword = async (req, res) => {
    const { email, senha, confSenha, idRec } = req.body;

    if (senha !== confSenha) {
        return res.status(400).json({ mensagem: "As senhas são diferentes!" });
    }

    if (email.length > 250 || senha.length > 60 || confSenha.length > 60) {
        return res.status(400).json({ mensagem: "Credenciais inválidas!" });
    }

    try {
        const user = await UserModel.findByEmailAndHash(email, idRec);
        if (!user) {
            return res.status(404).json({ mensagem: "Usuário inválido!" });
        }

        const { cryptPass, cryptHash } = await encrypt(senha);
        const updatePassword = await UserModel.updatePassword(cryptPass, cryptHash, user.id_usuario);

        if (updatePassword.affectedRows > 0) {
            await confirmationEmail(email);
            return res.json({ mensagem: "Senha alterada com sucesso!" });
        } else {
            return res.status(500).json({ erro: "Erro ao alterar a senha" });
        }
    } catch (err) {
        console.error("Erro ao alterar a senha:", err);
        res.status(500).json({ erro: "Erro ao alterar a senha" });
    }
}