const ServiceModel = require("../models/ServiceModel.js");
const { isValidCpfCnpj, isValidDate } = require("../utils/validators.js");

exports.registerService = async (req, res) => {
    const {
        cliente,
        cpfOuCnpj,
        servico,
        cod_servico,
        cod_lc,
        imposto,
        val_servico,
        id_natureza,
        data_vencimento,
        desc_servico
    } = req.body;

    if (!cliente || !isValidCpfCnpj(cpfOuCnpj)) {
        return res.status(400).json({ mensagem: "Cliente inválido!" });
    }

    if (servico.length > 100) {
        return res.status(400).json({ mensagem: "Serviço inválido!" });
    }

    if (cod_servico.length > 6) {
        return res.status(400).json({ mensagem: "Código de Serviço inválido!" });
    }
    
    if (cod_lc.length > 5) {
        return res.status(400).json({ mensagem: "Código LC 116 inválido!" });
    }
    
    if (imposto.length > 5) {
        return res.status(400).json({ mensagem: "Alíquota ISS inválida!" });
    }

    const valImposto = parseFloat(imposto.replace(",", "."));
    const valServico = parseFloat(val_servico.replace(".", "").replace(",", "."));

    if (desc_servico.length > 250) {
        return res.status(400).json({ mensagem: "Descrição inválida!" });
    }

    const data_vencimentoISO = new Date(data_vencimento);
    const dataAtual = new Date();
    if (!isValidDate(data_vencimento) || data_vencimentoISO < dataAtual) {
        return res.status(400).json({ mensagem: "Data de vencimento inválida!" });
    }

    const id_usuario = req.user.userId;
    const id_cliente = cliente;

    try {
        const client = await ServiceModel.verifyClient(
            id_usuario,
            id_cliente,
            cpfOuCnpj
        );

        if (client.length > 0) {
            await ServiceModel.create({
                servico,
                cod_servico,
                cod_lc,
                imposto: valImposto,
                val_servico: valServico,
                desc_servico,
                data_vencimento,
                id_natureza,
                id_cliente,
                id_usuario
            });
    
            return res.json({ mensagem: "Serviço cadastrado com sucesso!" });
        } else {
            return res.status(400).json({ mensagem: "Cliente inválido!" });
        }
    } catch (err) {
        console.error("Erro ao cadastrar serviço:", err);
        res.status(500).json({ erro: "Erro ao cadastrar serviço" });
    }
}

exports.getServices = async (req, res) => {
    const id_usuario = req.user.userId;

    try {
        const [services] = await ServiceModel.findByUserId(id_usuario);

        const servicesWithClientName = await Promise.all(services.map(async (service) => {
            const clientName = await ServiceModel.getClientName(service.id_cliente, id_usuario);
            return {
                ...service,
                clientName
            }
        }));

        return res.json(servicesWithClientName);
    } catch (err) {
        console.error("Erro ao buscar serviços:", err);
        res.status(500).json({ erro: "Erro ao buscar serviços" });
    }
}

exports.editService = async (req, res) => {
    const { id_servico } = req.params;
    const { val_servico, imposto, id_natureza, data_vencimento, status_servico } = req.body;

    if (!val_servico || !imposto || !id_natureza || !data_vencimento || !status_servico) {
        return res.status(400).json({ mensagem: "Os campos não podem ficar vazios!" });
    }

    const valServicoStr = String(val_servico);
    if (valServicoStr.length > 20) {
        return res.status(400).json({ mensagem: "Valor do Serviço inválido!" });
    }
    const valServico = parseFloat(valServicoStr.replace(".", "").replace(",", "."));

    const impostoStr = String(imposto);
    if (impostoStr.length > 10) {
        return res.status(400).json({ mensagem: "Alíquota ISS inválida!" });
    }
    const valImposto = parseFloat(impostoStr.replace(",", "."));

    if (
        (id_natureza !== 1 && id_natureza !== "1") &&
        (id_natureza !== 2 && id_natureza !== "2")
    ) {
        return res.status(400).json({ mensagem: "Natureza inválida!" });
    }

    if (!isValidDate(data_vencimento)) {
        return res.status(400).json({ mensagem: "Data de Vencimento inválida!" });
    }

    if (
        (status_servico !== 3 && status_servico !== "3") &&
        (status_servico !== 4 && status_servico !== "4") &&
        (status_servico !== 5 && status_servico !== "5") &&
        (status_servico !== 6 && status_servico !== "6")
    ) {
        return res.status(400).json({ mensagem: "Status inválido!" });
    }
    
    try {
        const [result] = await ServiceModel.edit(
            valServico, valImposto, id_natureza, data_vencimento, status_servico, id_servico
        );

        if (result.affectedRows > 0) {
            return res.json({ mensagem: "Serviço atualizado com sucesso!" });
        } else {
            return res.status(404).json({ erro: "Serviço não encontrado!" });
        }
    } catch (err) {
        console.error("Erro ao atualizar serviço:", err);
        res.status(500).json({ erro: "Erro ao atualizar serviço" });
    }
}

exports.deleteService = async (req, res) => {
    const { id_servico } = req.params;

    try {
        const [result] = await ServiceModel.delete(id_servico);

        if (result.affectedRows > 0) {
            return res.json({ mensagem: "Serviço excluído com sucesso!" });
        } else {
            return res.status(404).json({ erro: "Serviço não encontrado!" });
        }
    } catch (err) {
        console.error("Erro ao excluir serviço:", err);
        res.status(500).json({ erro: "Erro ao excluir serviço" });
    }
}

exports.reportsServices = async (req, res) => {
    const id_usuario = req.user.userId;
    const { nome_cliente, cod_servico, servico, data_vencimento, status_servico } = req.body;

    if (!nome_cliente && !cod_servico && !servico && !data_vencimento && !status_servico) {
        return res.status(400).json({ mensagem: "Preencha pelo menos um dos campos!" });
    }

    if (nome_cliente.length > 50) {
        return res.status(400).json({ mensagem: "Nome inválido!" });
    }

    if (cod_servico.length > 11 && isNaN(cod_servico)) {
        return res.status(400).json({ mensagem: "Código do Serviço inválido!" });
    }

    if (servico.length > 100) {
        return res.status(400).json({ mensagem: "Serviço inválido!" });
    }

    if (data_vencimento.length > 0 && !isValidDate(data_vencimento)) {
        return res.status(400).json({ mensagem: "Data de Vencimento inválida!" });
    }

    try {
        const [results] = await ServiceModel.reports(
            id_usuario, nome_cliente, cod_servico, servico, data_vencimento, status_servico
        );

        if (results.length > 0) {
            return res.status(200).json({ mensagem: "Serviço encontrado!", results });
        }

        return res.status(404).json({ mensagem: "Serviço não encontrado!" });
    } catch (err) {
        console.error("Erro ao gerar relatórios:", err);
        res.status(500).json({ erro: "Erro ao gerar relatórios" });
    }
}

exports.exportReportsServices = async (req, res) => {
    const { servicoIds } = req.body;

    if (!servicoIds) {
        return res.status(404).json({ mensagem: "Nenhum serviço encontrado!" });
    }

    try {
        const [results] = await ServiceModel.exportReports(servicoIds);
        return res.status(200).json({ servicos: results });
    } catch (err) {
        console.error("Erro ao exportar relatório:", err);
        res.status(500).json({ erro: "Erro ao exportar relatório" });
    }
}