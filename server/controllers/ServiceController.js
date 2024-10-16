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

// exports.editService = async (req, res) => {}

// exports.deleteService = async (req, res) => {}

// exports.reportsServices = async (req, res) => {}

// exports.exportReportsServices = async (req, res) => {}