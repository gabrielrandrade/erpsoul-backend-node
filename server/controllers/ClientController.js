const Client = require("../models/Client.js");
const Address = require("../models/Address.js");

exports.registerClient = async (req, res) => {
    const { nome, cpfOuCnpj, dt_nasc, id_tipo_cliente, logradouro, numero, cep, bairro, cidade, uf } = req.body;
    const id_usuario = req.user.userId;

    try {
        const address = await Address.create({
            logradouro, numero, cep, bairro, cidade, uf
        });

        const client = await Client.create({
            nome,
            cpfOuCnpj,
            dt_nasc,
            id_tipo_cliente,
            id_endereco: address.id_endereco,
            id_usuario
        });

        return res.json({ mensagem: "Cliente cadastrado com sucesso!" });
    } catch (err) {
        console.error("Erro ao cadastrar cliente:", err);
        res.status(500).json({ erro: "Erro ao cadastrar cliente" });
    }
}

exports.getClients = async (req, res) => {
    const id_usuario = req.user.userId;

    try {
        const clients = await Client.findByUserId(id_usuario);
        return res.json(clients);
    } catch (err) {
        console.error("Erro ao buscar clientes:", err);
        res.status(500).json({ erro: "Erro ao buscar clientes" });
    }
}