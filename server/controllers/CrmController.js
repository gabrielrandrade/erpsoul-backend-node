const CrmModel = require("../models/CrmModel.js");
const AddressModel = require("../models/AddressModel.js");
const { isValidCpfCnpj, isValidDate } = require("../utils/validators.js");

exports.registerClient = async (req, res) => {
    const {
        nome,
        cpfOuCnpj,
        dt_nasc,
        id_tipo_cliente,
        logradouro,
        numero,
        cep,
        bairro,
        cidade,
        uf
    } = req.body;
    
    if (nome.length > 50) {
        return res.status(400).json({ mensagem: "Nome inválido!" });
    }

    if (!isValidCpfCnpj(cpfOuCnpj)) {
        return res.status(400).json({ mensagem: "CPF ou CNPJ inválido!" });
    }

    if (!isValidDate(dt_nasc)) {
        return res.status(400).json({ mensagem: "Data de nascimento inválida!" });
    }

    if (logradouro.length > 60 ||
        numero.length > 8      ||
        cep.length !== 8       ||
        cidade.length > 30     ||
        uf.length !== 2        ||
        bairro.length > 45
    ) {
        return res.status(400).json({ mensagem: "Endereço inválido!" })
    }

    if (cpfOuCnpj.length === 14 && id_tipo_cliente !== "2") {
        return res.status(400).json({ mensagem: "Tipo de cliente incorreto!" });
    }
    
    const id_usuario = req.user.userId;

    try {
        const [existingClient] = await CrmModel.findClient(cpfOuCnpj, id_usuario);

        if (existingClient.length > 0) {
            return res.status(400).json({ mensagem: "Cliente já cadastrado!" });
        }

        const addressId = await AddressModel.create({
            logradouro, numero, cep, bairro, cidade, uf
        });

        await CrmModel.create({
            nome,
            cpfOuCnpj,
            dt_nasc,
            id_tipo_cliente,
            id_endereco: addressId,
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
        const [clients] = await CrmModel.findByUserId(id_usuario);
        return res.json(clients);
    } catch (err) {
        console.error("Erro ao buscar clientes:", err);
        res.status(500).json({ erro: "Erro ao buscar clientes" });
    }
}

exports.editClient = async (req, res) => {
    const { id_cliente } = req.params;
    const { nome, cpfOuCnpj } = req.body;

    if (!nome || !cpfOuCnpj) {
        return res.status(400).json({ mensagem: "Os campos não podem ficar vazio!" });
    }

    if (nome.length > 50 || nome.length < 1) {
        return res.status(400).json({ mensagem: "Nome inválido!" });
    }

    if (!isValidCpfCnpj(cpfOuCnpj)) {
        return res.status(400).json({ mensagem: "CPF ou CNPJ inválido!" });
    }
    
    try {
        const [result] = await CrmModel.edit(nome, cpfOuCnpj, id_cliente);

        if (result.affectedRows > 0) {
            return res.json({ mensagem: "Cliente atualizado com sucesso!" });
        } else {
            return res.status(404).json({ erro: "Cliente não encontrado!" });
        }
    } catch (err) {
        console.error("Erro ao atualizar cliente:", err);
        res.status(500).json({ erro: "Erro ao atualizar cliente" });
    }
}

exports.deleteClient = async (req, res) => {
    const { id_cliente } = req.params;

    try {
        const [result] = await CrmModel.delete(id_cliente);

        if (result.affectedRows > 0) {
            return res.json({ mensagem: "Cliente excluído com sucesso!" });
        } else {
            return res.status(404).json({ erro: "Cliente não encontrado!" });
        }
    } catch (err) {
        console.error("Erro ao excluir cliente:", err);
        res.status(500).json({ erro: "Erro ao excluir cliente" });
    }
}

exports.reportsClients = async (req, res) => {
    const id_usuario = req.user.userId;
    const { nome, cpfOuCnpj, dt_nasc, id_tipo_cliente } = req.body;

    if (!nome && !cpfOuCnpj && !dt_nasc && !id_tipo_cliente) {
        return res.status(400).json({ mensagem: "Preencha pelo menos um dos campos!" });
    }

    if (nome.length > 50) {
        return res.status(400).json({ mensagem: "Nome inválido!" });
    }

    if (cpfOuCnpj.length > 0 && !isValidCpfCnpj(cpfOuCnpj)) {
        return res.status(400).json({ mensagem: "CPF ou CNPJ inválido!" });
    }

    if (dt_nasc.length > 0 && !isValidDate(dt_nasc)) {
        return res.status(400).json({ mensagem: "Data de nascimento inválida!" });
    }

    if ((
         cpfOuCnpj.length === 14    &&
         id_tipo_cliente.length > 0 &&
         id_tipo_cliente !== "2")   ||
         id_tipo_cliente.length > 2
    ) {
        return res.status(400).json({ mensagem: "Tipo de cliente incorreto!" });
    }

    try {
        const [results] = await CrmModel.reports(id_usuario, nome, cpfOuCnpj, dt_nasc, id_tipo_cliente);

        if (results.length > 0) {
            return res.status(200).json({ mensagem: "Cliente encontrado!", results });
        }

        return res.status(404).json({ mensagem: "Cliente não encontrado!" });
    } catch (err) {
        console.error("Erro ao gerar relatórios:", err);
        res.status(500).json({ erro: "Erro ao gerar relatórios" });
    }
}

exports.exportReportsClients = async (req, res) => {
    const { clienteIds } = req.body;

    if (!clienteIds) {
        return res.status(404).json({ mensagem: "Nenhum cliente encontrado!" });
    }

    try {
        const [results] = await CrmModel.exportReports(clienteIds);
        return res.status(200).json({ clientes: results });
    } catch (err) {
        console.error("Erro ao exportar relatório:", err);
        res.status(500).json({ erro: "Erro ao exportar relatório" });
    }
}