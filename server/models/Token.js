const connectDB = require("../config/db.js");
const db = await connectDB();

exports.create = async (token, id_usuario, expiresIn) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (expiresIn === "7d" ? 7 : 1));
    
    return await db.query(`INSERT INTO tb_tokens (token, expira_em, id_usuario) VALUES (?, ?, ?)`, [token, expiresAt, id_usuario]);
}

exports.removeAllByUser = async (id_usuario) => {
    return await db.query(`DELETE FROM tb_tokens WHERE id_usuario = ?`, [id_usuario]);
}

exports.remove = async (token) => {
    return await db.query(`DELETE FROM tb_tokens WHERE token = ?`, [token]);
}