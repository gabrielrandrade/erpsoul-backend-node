const db = require("../config/db.js");

exports.create = (address) => {
    const { logradouro, numero, cep, bairro, cidade, uf } = address;
    return db.query(`
        INSERT INTO tb_endereco (logradouro, numero, cep, bairro, cidade, uf)
        VALUES (?, ?, ?, ?, ?, ?)`, [logradouro, numero, cep, bairro, cidade, uf]);
}