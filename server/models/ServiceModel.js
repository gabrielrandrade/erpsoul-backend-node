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