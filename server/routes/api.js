const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cache = require('memory-cache');
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");
const { isValidEmail, encrypt, isValidCpfCnpj, isValidDate } = require("../utils.js");


const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ mensagem: "Acesso negado!" });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(401).json({ mensagem: "Token inválido ou expirado!" });
    }
};

router.get("/rota-protegida", verifyToken, (req, res) => {
    res.json({ mensagem: "Acesso concedido!" });
});


const createEmailTransporter = () => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });
};


const sanitizeInput = [
    body("email").isEmail().withMessage("E-mail inválido!").normalizeEmail(),
    // body("email_contador").isEmail().withMessage("E-mail inválido!").normalizeEmail(),
    body("nome").trim().escape(),
    body("senha").trim().escape(),
    body("whatsapp").trim().escape(),
    body("cpfOuCnpj").trim().escape(),
    body("cargo").trim().escape(),
    body("faturamento").isNumeric().withMessage("Valor inválido!")
];


const sanitizeLoginInput = [
    body("email").isEmail().withMessage("E-mail inválido!").normalizeEmail(),
    body("senha").trim().escape()
];


// Cadastrando usuário
router.post("/cadastro", sanitizeInput, async (req, res) => {
    const { nome, email, senha, whatsapp, nome_empresa, cpfOuCnpj, email_contador = "", cargo, faturamento = "" } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (!req.db) {
        return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados" });
    }

    if (!nome || !email || !senha || !nome_empresa || !cpfOuCnpj || !cargo) {
        return res.status(400).json({ mensagem: "Preencha todos os campos requeridos!" });
    }

    if (nome.length > 50 || nome.length < 1 || nome_empresa.length > 50 || nome_empresa.length < 1) {
        return res.status(400).json({ mensagem: "Nome inválido!" });
    }

    if (email.length > 250 || email_contador.length > 250) {
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
        const [results] = await req.db.query(`SELECT email FROM tb_usuario WHERE email = ?`, [email]);

        if (results.length > 0) {
            return res.status(400).json({ mensagem: "E-mail já cadastrado!" });
        }

        const { cryptPass, cryptHash } = await encrypt(senha);

        const values = [
            nome,
            email,
            cryptPass,
            cryptHash,
            whatsapp,
            nome_empresa,
            cpfOuCnpj.length === 11 ? cpfOuCnpj : null,
            cpfOuCnpj.length === 14 ? cpfOuCnpj : null,
            email_contador || "",
            cargo,
            faturamento || "",
            1,
            1
        ];

        await req.db.query(`
            INSERT INTO tb_usuario (nome, email, senha, hash, whatsapp, nome_empresa, cpf, cnpj, email_contador, cargo, faturamento, id_perfil, id_status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, values);

        const token = jwt.sign({ id: results.insertId, email }, JWT_SECRET, { expiresIn: "15m" });

        return res.json({ mensagem: "Usuário cadastrado com sucesso!", token });
    } catch (err) {
        console.error("Erro ao cadastrar usuário:", err);
        res.status(500).json({ erro: "Erro ao cadastrar usuário" });
    }
});


// Esqueci senha
router.post("/esqueci-senha", sanitizeInput, async (req, res) => {
    const EMAIL_WAIT_TIME = 120;
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ mensagem: "Preencha o campo!" });
    }

    if (!isValidEmail(email) || email.length > 250) {
        return res.status(400).json({ mensagem: "E-mail inválido!" });
    }

    try {
        const [results] = await req.db.query(`SELECT email, hash FROM tb_usuario WHERE email = ?`, [email]);

        if (results.length === 0) {
            return res.status(404).json({ mensagem: "E-mail inválido!" });
        }

        const cachedTime = cache.get(email);
        if (cachedTime) {
            const timeSinceLastEmail = (Date.now() - cachedTime) / 1000;
            if (timeSinceLastEmail < EMAIL_WAIT_TIME) {
                const remainingTime = Math.ceil(EMAIL_WAIT_TIME - timeSinceLastEmail);
                return res.status(429).json({ mensagem: `Aguarde ${ remainingTime } segundos para enviar outro E-mail.` });
            }
        }

        const userHash = results[0].hash;
        const url = `http://localhost:3000/nova-senha?idRec=${ userHash }`;

        const transporter = createEmailTransporter();
        const mailOptions = {
            from: "suportesoulerp@gmail.com",
            to: email,
            subject: "Recuperação de Senha",
            text: `Solicitação de alteração de senha para o e-mail: ${ email }\nClique no link abaixo para redefinir sua senha:\n\n${ url }`
        };

        await transporter.sendMail(mailOptions);
        cache.put(email, Date.now(), EMAIL_WAIT_TIME * 1000);
        return res.json({ mensagem: "E-mail enviado!" });
    } catch (error) {
        console.error("Erro ao enviar o E-mail:", error);
        res.status(500).json({ erro: "Erro ao enviar o E-mail" });
    }
});


// Nova Senha
router.post("/nova-senha", sanitizeLoginInput, async (req, res) => {
    const { email, senha, confSenha, idRec } = req.body;

    if (!email || !senha || !confSenha || !idRec) {
        return res.status(400).json({ mensagem: "Preencha todos os campos!" });
    }

    if (senha !== confSenha) {
        return res.status(400).json({ mensagem: "As senhas são diferentes!" });
    }

    if (email.length > 250 || senha.length > 60 || confSenha.length > 60) {
        return res.status(400).json({ mensagem: "Credenciais inválidas!" });
    }

    try {
        const [results] = await req.db.query(`SELECT id_usuario, email, hash FROM tb_usuario WHERE email = ? AND hash = ?`, [email, idRec]);

        if (results.length === 0) {
            return res.status(404).json({ mensagem: "Usuário inválido!" });
        }

        const { cryptPass, cryptHash } = await encrypt(senha);
        const idUsuarioDB = results[0].id_usuario;

        const [updateResults] = await req.db.query(`UPDATE tb_usuario SET senha = ?, hash = ? WHERE id_usuario = ?`, [cryptPass, cryptHash, idUsuarioDB]);

        if (updateResults.affectedRows > 0) {
            const transporter = createEmailTransporter();
            const mailOptions = {
                from: "suportesoulerp@gmail.com",
                to: email,
                subject: "Senha Alterada",
                text: `A senha da sua conta no ERP Soul foi alterada. Se você não solicitou essa alteração, sugerimos mudar sua senha imediatamente e ativar verificações adicionais de segurança.`
            };

            await transporter.sendMail(mailOptions);
            return res.json({ mensagem: "Senha alterada com sucesso!" });
        } else {
            return res.status(500).json({ erro: "Erro ao alterar a senha" });
        }
    } catch (err) {
        console.error("Erro ao alterar a senha:", err);
        res.status(500).json({ erro: "Erro ao alterar a senha" });
    }
});


// Login
const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: "Muitas tentativas de login deste IP. Tente novamente após 10 minutos"
});

router.post("/login", loginLimiter, sanitizeLoginInput, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, senha } = req.body;

    if (email.length > 250 || senha.length > 60) {
        return res.status(400).json({ mensagem: "Credenciais inválidas!" });
    }

    try {
        const [results] = await req.db.query(`SELECT id_usuario, email, senha FROM tb_usuario WHERE email = ?`, [email]);

        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Email e/ou Senha inválido!" });
        }

        const usuario = results[0];
        const senhaDB = usuario.senha;

        const isMatch = await bcrypt.compare(senha, senhaDB);

        if (isMatch) {
            const token = jwt.sign({ id: usuario.id_usuario, email: usuario.email }, JWT_SECRET, { expiresIn: "15m" });
            return res.json({ mensagem: "Usuário logado com sucesso!", token });
        } else {
            return res.status(400).json({ mensagem: "Email e/ou Senha inválido!" });
        }
    } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
});

router.put("/login/desconectar", async (req, res) => {
    try {
        return res.json({ mensagem: "Usuário desconectado com sucesso!" });
    } catch (err) {
        console.error("Erro ao desconectar usuário:", err);
        res.status(500).json({ erro: "Erro ao desconectar usuário" });
    }
});


// Cadastrando cliente
router.post("/cadastro-cliente", async (req, res) => {
    const { nome, cpfOuCnpj, dt_nasc, id_tipo_cliente, logradouro, numero, cep, bairro, cidade, uf } = req.body;

    if (!nome || !cpfOuCnpj || !dt_nasc || !id_tipo_cliente || !logradouro || !numero || !cep || !bairro || !cidade || !uf) {
        return res.status(400).json({ mensagem: "Preencha todos os campos requeridos!" });
    }

    if (nome.length > 50) {
        return res.status(400).json({ mensagem: "Nome inválido!" });
    }

    if (!isValidCpfCnpj(cpfOuCnpj)) {
        return res.status(400).json({ mensagem: "CPF ou CNPJ inválido!" });
    }

    if (!isValidDate(dt_nasc)) {
        return res.status(400).json({ mensagem: "Data de nascimento inválida!" });
    }

    if (logradouro.length > 60 ||
        numero.length > 8      ||
        cep.length !== 8       ||
        cidade.length > 30     ||
        uf.length !== 2        ||
        bairro.length > 45
    ) {
        return res.status(400).json({ mensagem: "Endereço inválido!" })
    }

    if (cpfOuCnpj.length === 14 && id_tipo_cliente !== "2") {
        return res.status(400).json({ mensagem: "Tipo de cliente incorreto!" });
    }

    try {
        const [results] = await req.db.query(`SELECT cpf, cnpj FROM tb_cliente WHERE cpf = ? OR cnpj = ?`, [
            cpfOuCnpj.length === 11 ? cpfOuCnpj : null,
            cpfOuCnpj.length === 14 ? cpfOuCnpj : null
        ]);

        if (results.length > 0) {
            return res.status(400).json({ mensagem: "Cliente já cadastrado!" });
        }

        const [addressResult] = await req.db.query(`
            INSERT INTO tb_endereco (logradouro, numero, cep, bairro, cidade, uf)
            VALUES (?, ?, ?, ?, ?, ?);
        `, [logradouro, numero, cep, bairro, cidade, uf]);

        const id_endereco = addressResult.insertId;

        const values = [
            nome,
            cpfOuCnpj.length === 11 ? cpfOuCnpj : null,
            cpfOuCnpj.length === 14 ? cpfOuCnpj : null,
            dt_nasc,
            id_tipo_cliente,
            id_endereco,
            1
        ];

        await req.db.query(`
            INSERT INTO tb_cliente (nome, cpf, cnpj, dt_nasc, id_tipo_cliente, id_endereco, id_status)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `, values);

        return res.json({ mensagem: "Cliente cadastrado com sucesso!" });
    } catch (err) {
        console.error("Erro ao cadastrar cliente:", err);
        res.status(500).json({ erro: "Erro ao cadastrar cliente" });
    }
});


// Clientes cadastrados
router.get("/clientes", async (req, res) => {
    try {
        const [results] = await req.db.query(
            "SELECT id_cliente, nome, cpf, cnpj FROM tb_cliente WHERE id_status = 1 AND (id_tipo_cliente = 1 OR id_tipo_cliente = 2);"
        );
        res.json(results);
    } catch (err) {
        console.error("Erro ao buscar dados:", err);
        res.status(500).json({ erro: "Erro ao buscar dados" });
    }
});

router.put("/clientes/:id_cliente/editar", async (req, res) => {
    const { id_cliente } = req.params;
    const { nome, cpfOuCnpj } = req.body;

    if (!nome || !cpfOuCnpj) {
        return res.status(400).json({ mensagem: "Os campos não podem ficar vazio!" });
    }

    if (nome.length > 50 || nome.length < 1) {
        return res.status(400).json({ mensagem: "Nome inválido!" });
    }

    if (!isValidCpfCnpj(cpfOuCnpj)) {
        return res.status(400).json({ mensagem: "CPF ou CNPJ inválido!" });
    }
    
    try {
        const [result] = await req.db.query(
            "UPDATE tb_cliente SET nome = ?, cpf = ?, cnpj = ?, id_tipo_cliente = ? WHERE id_cliente = ?",
            [
                nome,
                cpfOuCnpj.length === 11 ? cpfOuCnpj : null,
                cpfOuCnpj.length === 14 ? cpfOuCnpj : null,
                cpfOuCnpj.length === 11 ? "1" : "2",
                id_cliente
            ]
        );

        if (result.affectedRows > 0) {
            return res.json({ mensagem: "Cliente atualizado com sucesso!" });
        } else {
            return res.status(404).json({ erro: "Cliente não encontrado!" });
        }
    } catch (err) {
        console.error("Erro ao atualizar cliente:", err);
        res.status(500).json({ erro: "Erro ao atualizar cliente" });
    }
});

router.put("/clientes/:id_cliente/excluir", async (req, res) => {
    const { id_cliente } = req.params;

    try {
        const [result] = await req.db.query(
            "UPDATE tb_cliente SET id_status = 2 WHERE id_cliente = ?",
            [id_cliente]
        );

        if (result.affectedRows > 0) {
            return res.json({ mensagem: "Cliente excluído com sucesso!" });
        } else {
            return res.status(404).json({ erro: "Cliente não encontrado!" });
        }
    } catch (err) {
        console.error("Erro ao excluir cliente:", err);
        res.status(500).json({ erro: "Erro ao excluir cliente" });
    }
});


module.exports = router;