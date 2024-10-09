const connectDB = require("../config/db.js");

exports.create = async (token, expiresIn, userId) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (expiresIn === "7d" ? 7 : 1));
    
    const db = await connectDB();
    return await db.query(
        `INSERT INTO tb_tokens (token, expira_em, id_usuario) VALUES (?, ?, ?)`,
        [
            token,
            expiresAt,
            userId
        ]
    );
}

exports.removeAllByUser = async (id_usuario) => {
    const db = await connectDB();
    return await db.query(`DELETE FROM tb_tokens WHERE id_usuario = ?`, [id_usuario]);
}

exports.remove = async (token) => {
    const db = await connectDB();
    return await db.query(`DELETE FROM tb_tokens WHERE token = ?`, [token]);
}