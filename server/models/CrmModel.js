const connectDB = require("../config/db.js");

exports.findClient = async (cpfOuCnpj, id) => {
    const db = await connectDB();
    return await db.query(`
        SELECT cpf, cnpj FROM tb_cliente WHERE id_usuario = ? AND id_status != 1 AND (cpf = ? OR cnpj = ?)`,
        [
            id,
            cpfOuCnpj.length === 11 ? cpfOuCnpj : null,
            cpfOuCnpj.length === 14 ? cpfOuCnpj : null
        ]
    );
}

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
    return await db.query(
        `SELECT id_cliente, nome, cpf, cnpj FROM tb_cliente WHERE id_status = 2 AND id_usuario = ?`, [id_usuario]
    );
}

exports.edit = async (nome, cpfOuCnpj, id_cliente) => {
    const db = await connectDB();
    return await db.query(
        `UPDATE tb_cliente SET nome = ?, cpf = ?, cnpj = ?, id_tipo_cliente = ? WHERE id_cliente = ?`,
        [
            nome,
            cpfOuCnpj.length === 11 ? cpfOuCnpj : null,
            cpfOuCnpj.length === 14 ? cpfOuCnpj : null,
            cpfOuCnpj.length === 11 ? "1" : "2",
            id_cliente
        ]
    );
}

exports.delete = async (id_cliente) => {
    const db = await connectDB();
    return await db.query(`UPDATE tb_cliente SET id_status = 1 WHERE id_cliente = ?`, [id_cliente]);
}

exports.reports = async (id_usuario, nome, cpfOuCnpj, dt_nasc, id_tipo_cliente) => {
    const db = await connectDB();
    return await db.query(`
        SELECT id_cliente, nome, cpf, cnpj, id_endereco
        FROM tb_cliente
        WHERE
            id_status = 2
            AND id_usuario = ?
            AND (nome = ? OR ? IS NULL)
            AND (cpf = ? OR ? IS NULL)
            AND (cnpj = ? OR ? IS NULL)
            AND (dt_nasc = ? OR ? IS NULL)
            AND (id_tipo_cliente = ? OR ? IS NULL)
        `,
        [
            id_usuario,
            nome || null, nome || null,
            cpfOuCnpj.length === 11 ? cpfOuCnpj : null, cpfOuCnpj.length === 11 ? cpfOuCnpj : null,
            cpfOuCnpj.length === 14 ? cpfOuCnpj : null, cpfOuCnpj.length === 14 ? cpfOuCnpj : null,
            dt_nasc || null, dt_nasc || null,
            id_tipo_cliente || null, id_tipo_cliente || null
        ]
    );
}

exports.exportReports = async (clienteIds) => {
    const db = await connectDB();
    return await db.query(`
        SELECT 
            c.id_cliente,
            c.nome,
            c.cpf, c.cnpj,
            c.dt_nasc,
            CONCAT(
                e.logradouro, ', ', e.numero, ' - ', e.bairro, ', ', e.cidade, ' - ', e.uf, ', CEP: ', e.cep
            ) AS endereco_completo,
            c.id_tipo_cliente
        FROM tb_cliente c
        LEFT JOIN tb_endereco e ON c.id_endereco = e.id_endereco
        WHERE c.id_cliente IN (?)
    `, [clienteIds]);
}