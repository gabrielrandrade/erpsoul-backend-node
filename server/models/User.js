const connectDB = require("../config/db.js");
const db = await connectDB();

exports.findByEmail = async (email) => {
    const [rows] = await db.query(`SELECT * FROM tb_usuario WHERE email = ?`, [email]);
    return rows;
}

exports.findById = async (id) => {
    const [rows] = await db.query(`SELECT * FROM tb_usuario WHERE id_usuario = ?`, [id]);
    return rows;
}

exports.create = async (user) => {
    const { nome, email, senha, hash, whatsapp, cpfOuCnpj, cargo, faturamento } = user;
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

exports.findByEmailAndHash = async (email, idRec) => {
    const [rows] = await db.query(`SELECT id_usuario, email, hash FROM tb_usuario WHERE email = ? AND hash = ?`, [email, idRec]);
    return rows;
}

exports.updatePassword = async (cryptPass, cryptHash, idUsuarioDB) => {
    const [rows] = await db.query(`UPDATE tb_usuario SET senha = ?, hash = ? WHERE id_usuario = ?`, [cryptPass, cryptHash, idUsuarioDB]);
    return rows;
}