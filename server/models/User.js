const connectDB = require("../config/db.js");

exports.findByEmail = async (email) => {
    const db = await connectDB();
    const [rows] = await db.query(`SELECT * FROM tb_usuario WHERE email = ?`, [email]);
    return rows;
}

exports.findById = async (id) => {
    const db = await connectDB();
    const [rows] = await db.query(`SELECT * FROM tb_usuario WHERE id_usuario = ?`, [id]);
    return rows;
}

exports.create = async (user) => {
    const { nome, email, senha, hash, whatsapp, cpfOuCnpj, cargo, faturamento } = user;
    const db = await connectDB();
    const [result] = await db.query(`
        INSERT INTO tb_usuario (nome, email, senha, hash, whatsapp, cpf, cnpj, cargo, faturamento, id_perfil, id_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            nome,
            email,
            senha,
            hash,
            whatsapp,
            cpfOuCnpj.length === 11 ? cpfOuCnpj : null,
            cpfOuCnpj.length === 14 ? cpfOuCnpj : null,
            cargo,
            faturamento,
            1,
            2
        ]
    );
    return result;
}