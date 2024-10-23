const connectDB = require("../config/db.js");

exports.verifyClient = async (id_usuario, id_cliente, cpfOuCnpj) => {
    const db = await connectDB();
    return await db.query(`
        SELECT * FROM tb_cliente WHERE id_usuario = ? AND id_cliente = ? AND (cpf = ? OR cnpj = ?)`,
        [
            id_usuario,
            id_cliente,
            cpfOuCnpj.length === 11 ? cpfOuCnpj : null,
            cpfOuCnpj.length === 14 ? cpfOuCnpj : null
        ]
    );
}

exports.create = async (service) => {
    const {
        servico,
        cod_servico,
        cod_lc,
        imposto,
        val_servico,
        desc_servico,
        data_vencimento,
        id_natureza,
        id_cliente,
        id_usuario 
    } = service;

    const db = await connectDB();
    return await db.query(`
        INSERT INTO tb_servico (
            servico,
            cod_servico,
            cod_lc,
            aliquota_iss,
            valor_servico,
            descricao,
            dt_vencimento,
            id_natureza,
            id_status,
            id_cliente,
            id_usuario
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            servico,
            cod_servico,
            cod_lc,
            imposto,
            val_servico,
            desc_servico,
            data_vencimento,
            id_natureza,
            4,
            id_cliente,
            id_usuario
        ]
    );
}

exports.findByUserId = async (id_usuario) => {
    const db = await connectDB();
    return await db.query(
        `SELECT * FROM tb_servico WHERE (
            id_status = 3 OR
            id_status = 4 OR
            id_status = 5 OR
            id_status = 6
        ) AND id_usuario = ?`, [id_usuario]
    );
}

exports.getClientName = async (id_cliente, id_usuario) => {
    const db = await connectDB();
    const [result] = await db.query(
        `SELECT nome FROM tb_cliente WHERE id_cliente = ? AND id_usuario = ?`,
        [id_cliente, id_usuario]
    );
    
    return result.length > 0 ? result[0].nome : "";
}

exports.edit = async (val_servico, aliquota_iss, id_natureza, data_vencimento, status_servico, id_servico) => {
    const db = await connectDB();
    return await db.query(
        `UPDATE tb_servico SET
            valor_servico = ?,
            aliquota_iss = ?,
            id_natureza = ?,
            dt_vencimento = ?,
            id_status = ?
        WHERE id_servico = ?`,
        [
            val_servico,
            aliquota_iss,
            id_natureza,
            data_vencimento,
            status_servico,
            id_servico
        ]
    );
}

exports.delete = async (id_servico) => {
    const db = await connectDB();
    return await db.query(`UPDATE tb_servico SET id_status = 1 WHERE id_servico = ?`, [id_servico]);
}

exports.reports = async (id_usuario, nome_cliente, cod_servico, servico, data_vencimento, status_servico) => {
    const db = await connectDB();

    return await db.query(`
        SELECT 
            s.*, 
            c.nome AS nome_cliente
        FROM tb_servico s
        JOIN tb_cliente c ON s.id_cliente = c.id_cliente
        WHERE
            s.id_usuario = ?
            AND (c.nome = ? OR ? IS NULL)
            AND (s.cod_servico = ? OR ? IS NULL)
            AND (s.servico = ? OR ? IS NULL)
            AND (s.dt_vencimento = ? OR ? IS NULL)
            AND (s.id_status = ? OR ? IS NULL)
            AND (s.id_status != 1)
        `,
        [
            id_usuario,
            nome_cliente || null, nome_cliente || null,
            cod_servico || null, cod_servico || null,
            servico || null, servico || null,
            data_vencimento || null, data_vencimento || null,
            status_servico || null, status_servico || null
        ]
    );
}

exports.exportReports = async (servicoIds) => {
    const db = await connectDB();
    return await db.query(`
        SELECT 
            s.*,
            c.nome AS nome_cliente,
            COALESCE(c.cpf, c.cnpj) AS cpfOuCnpjCliente
        FROM tb_servico s
        JOIN tb_cliente c ON s.id_cliente = c.id_cliente
        WHERE s.id_servico IN (?)
    `, [servicoIds]);
}