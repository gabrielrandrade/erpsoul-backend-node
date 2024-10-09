const connectDB = require("../config/db.js");

exports.findByEmail = async (email) => {
    const db = await connectDB();
    const [rows] = await db.query(
        `SELECT id_usuario, senha, hash FROM tb_usuario WHERE email = ?`, [email]
    );
    
    return rows.length > 0 ? rows[0] : null;
}

exports.create = async (user) => {
    const {
        nome,
        email,
        senha,
        hash,
        whatsapp,
        nome_empresa,
        cpfOuCnpj,
        email_contador,
        cargo,
        faturamento
    } = user;

    const db = await connectDB();
    const [result] = await db.query(`
        INSERT INTO tb_usuario (
            nome,
            email,
            senha,
            hash,
            whatsapp,
            nome_empresa,
            cpf,
            cnpj,
            email_contador,
            cargo,
            faturamento,
            id_perfil,
            id_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            nome,
            email,
            senha,
            hash,
            whatsapp,
            nome_empresa,
            cpfOuCnpj.length === 11 ? cpfOuCnpj : null,
            cpfOuCnpj.length === 14 ? cpfOuCnpj : null,
            email_contador || "",
            cargo,
            faturamento || "",
            1,
            2
        ]
    );

    return result.insertId;
}

exports.findByEmailAndHash = async (email, idRec) => {
    const db = await connectDB();
    const [rows] = await db.query(
        `SELECT id_usuario, email, hash FROM tb_usuario WHERE email = ? AND hash = ?`, [email, idRec]
    );

    return rows.length > 0 ? rows[0] : null;
}

exports.updatePassword = async (cryptPass, cryptHash, id_usuario) => {
    const db = await connectDB();
    const [rows] = await db.query(
        `UPDATE tb_usuario SET senha = ?, hash = ? WHERE id_usuario = ?`,
        [
            cryptPass,
            cryptHash,
            id_usuario
        ]
    );

    return rows;
}