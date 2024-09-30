const db = require("../config/db.js");

exports.create = (token, id_usuario, expiresIn) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (expiresIn === "7d" ? 7 : 1));

    return db.query(`INSERT INTO tb_tokens (token, expira_em, id_usuario) VALUES (?, ?, ?)`, [token, expiresAt, id_usuario]);
}

exports.removeAllByUser = (id_usuario) => {
    return db.query(`DELETE FROM tb_tokens WHERE id_usuario = ?`, [id_usuario]);
}