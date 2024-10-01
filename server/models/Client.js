const connectDB = require("../config/db.js");

exports.create = async (client) => {
    const { nome, cpfOuCnpj, dt_nasc, id_tipo_cliente, id_endereco, id_usuario } = client;
    const db = await connectDB();
    return await db.query(`
        INSERT INTO tb_cliente (nome, cpf, cnpj, dt_nasc, id_tipo_cliente, id_endereco, id_usuario, id_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            nome,
            cpfOuCnpj.length === 11 ? cpfOuCnpj : null,
            cpfOuCnpj.length === 14 ? cpfOuCnpj : null,
            dt_nasc,
            id_tipo_cliente,
            id_endereco,
            id_usuario,
            2
        ]
    );
}

exports.findByUserId = async (id_usuario) => {
    const db = await connectDB();
    return await db.query(`SELECT * FROM tb_cliente WHERE id_usuario = ?`, [id_usuario]);
}