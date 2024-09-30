const db = require("../config/db.js");

exports.findByEmail = (email) => {
    return db.query(`SELECT * FROM tb_usuario WHERE email = ?`, [email]);
}

exports.findById = (id) => {
    return db.query(`SELECT * FROM tb_usuario WHERE id_usuario = ?`, [id]);
}

exports.create = (user) => {
    const { nome, email, senha, hash, whatsapp, cpfOuCnpj, cargo, faturamento } = user;
    return db.query(`
        INSERT INTO tb_usuario (nome, email, senha, hash, whatsapp, cpf, cnpj, cargo, faturamento, id_perfil, id_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 2)`,
        [
            nome,
            email,
            senha,
            hash,
            whatsapp,
            cpfOuCnpj.length === 11 ? cpfOuCnpj : null,
            cpfOuCnpj.length === 14 ? cpfOuCnpj : null,
            cargo,
            faturamento
        ]
    );
}