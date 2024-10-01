const connectDB = require("../config/db.js");

exports.create = async (token, id_usuario, expiresIn) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (expiresIn === "7d" ? 7 : 1));
    
    const db = await connectDB();
    return db.query(`INSERT INTO tb_tokens (token, expira_em, id_usuario) VALUES (?, ?, ?)`, [token, expiresAt, id_usuario]);
}

exports.removeAllByUser = async (id_usuario) => {
    const db = await connectDB();
    return db.query(`DELETE FROM tb_tokens WHERE id_usuario = ?`, [id_usuario]);
}