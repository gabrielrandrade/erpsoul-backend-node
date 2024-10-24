import React, { useState } from "react";
import mask from "../Inc/MaskCpfCnpj.js";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function RelatoriosClientes({ isOpenRelatoriosClientes, setCloseModal }) {
    const [clientes, setClientes] = useState([]);
    const formatCpfCnpj = (cpfOuCnpj) => { return mask(cpfOuCnpj) }

    const [formData, setFormData] = useState({
        nome: "",
        cpfOuCnpj: "",
        dt_nasc: "",
        id_tipo_cliente: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "cpfOuCnpj") {
            const valorMascarado = mask(value);
            setFormData({
                ...formData,
                [name]: valorMascarado
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setClientes([]);

        formData.cpfOuCnpj = formData.cpfOuCnpj.replace(/\D/g, "");

        const { nome, cpfOuCnpj, dt_nasc, id_tipo_cliente } = formData;

        if (!nome && !cpfOuCnpj && !dt_nasc && !id_tipo_cliente) {
            Swal.fire({
                title: "Preencha pelo menos um dos campos!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (nome.length > 50) {
            Swal.fire({
                title: "Nome inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (
            cpfOuCnpj.length > 0    &&
            cpfOuCnpj.length !== 14 &&
            cpfOuCnpj.length !== 11
        ) {
            Swal.fire({
                title: "CPF ou CNPJ inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if ((
                    cpfOuCnpj.length === 14     && 
                    id_tipo_cliente.length > 0  &&
                    id_tipo_cliente !== "2")    ||
                    id_tipo_cliente.length > 2
        ) {
            Swal.fire({
                title: "Tipo de cliente incorreto!",
                text: "Você inseriu um CNPJ, o tipo de cliente deve ser Jurídico.",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else {
            const token = localStorage.getItem("token");

            // fetch("https://soulerp.srv-tii.com.br/api/crm/reports", {
            fetch("http://localhost:5000/api/crm/reports", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${ token }`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.mensagem === "Preencha pelo menos um dos campos!") {
                    Swal.fire({
                        title: "Preencha pelo menos um dos campos!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Nome inválido!") {
                    Swal.fire({
                        title: "Nome inválido!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "CPF ou CNPJ inválido!") {
                    Swal.fire({
                        title: "CPF ou CNPJ inválido!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Data de nascimento inválida!") {
                    Swal.fire({
                        title: "Data de nascimento inválida!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Tipo de cliente incorreto!") {
                    Swal.fire({
                        title: "Tipo de cliente incorreto!",
                        text: "Você inseriu um CNPJ, o tipo de cliente deve ser Jurídico.",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Cliente não encontrado!") {
                    Swal.fire({
                        title: "Cliente não encontrado!",
                        text: "Verifique se os campos estão preenchidos corretamente.",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Cliente encontrado!") {
                    setClientes(data.results);
                } else {
                    Swal.fire({
                        title: "Não foi possível gerar relatórios!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                }
            })
            .catch((error) => {
                console.error("Erro ao gerar relatórios:", error);
            });
        }
    }

    const handleImprimirClick = () => {
        if (clientes.length > 0) {
            Swal.fire({
                title: "Escolha o formato para exportar",
                input: "radio",
                inputOptions: {
                    "excel": "Exportar como Excel",
                    "pdf": "Exportar como PDF",
                    "txt": "Exportar como Documento de Texto"
                },
                inputValidator: (value) => {
                    if (!value) {
                        return "Você precisa escolher um formato!";
                    }
                },
                showCancelButton: true,
                confirmButtonColor: "#00968F",
                confirmButtonText: "Exportar"
            }).then((result) => {
                if (result.isConfirmed) {
                    const clienteIds = clientes.map(cliente => cliente.id_cliente);

                    // fetch("https://soulerp.srv-tii.com.br/api/crm/exportReports", {
                        fetch("http://localhost:5000/api/crm/exportReports", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ clienteIds })
                    })
                    .then(response => response.json())
                    .then(data => {
                        switch (result.value) {
                            case "excel":
                                exportToExcel(data.clientes);
                                break;
                            case "pdf":
                                exportToPDF(data.clientes);
                                break;
                            case "txt":
                                exportToText(data.clientes);
                                break;
                            default:
                                console.error("Formato de exportação inválido:", result.value);
                        }
                    })
                    .catch(error => console.error("Erro ao exportar relatório:", error));
                }
            });
        } else {
            Swal.fire({
                title: "Nenhum cliente encontrado!",
                text: "Por favor, faça uma busca antes de exportar.",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        }
    }

    const exportToExcel = (clientes) => {
        const wb = XLSX.utils.book_new();
        const ws_data = [
            ["N° Cliente", "Nome", "CPF/CNPJ", "Data de Nascimento", "Endereço", "Tipo de Cliente"]
        ];

        clientes.forEach((cliente) => {
            const clienteData = [
                cliente.id_cliente,
                cliente.nome,
                formatCpfCnpj(cliente.cpf || cliente.cnpj),
                new Date(cliente.dt_nasc).toLocaleDateString("pt-BR"),
                cliente.endereco_completo,
                cliente.id_tipo_cliente === 1 ? "Físico" : "Jurídico"
            ];
            ws_data.push(clienteData);
        });

        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        XLSX.utils.book_append_sheet(wb, ws, "Clientes");
        XLSX.writeFile(wb, "relatorios_clientes.xlsx");

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Exportado com sucesso!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const exportToPDF = (clientes) => {
        const doc = new jsPDF();
        const tableColumn = ["N° Cliente", "Nome", "CPF/CNPJ", "Data de Nascimento", "Endereço", "Tipo de Cliente"];
        const tableRows = [];

        clientes.forEach((cliente) => {
            const clienteData = [
                cliente.id_cliente,
                cliente.nome,
                formatCpfCnpj(cliente.cpf || cliente.cnpj),
                new Date(cliente.dt_nasc).toLocaleDateString("pt-BR"),
                cliente.endereco_completo,
                cliente.id_tipo_cliente === 1 ? "Físico" : "Jurídico"
            ];
            tableRows.push(clienteData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.save("relatorios_clientes.pdf");
        
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Exportado com sucesso!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const exportToText = (clientes) => {
        let texto = "N° Cliente | Nome | CPF/CNPJ | Data de Nascimento | Endereço | Tipo de Cliente\n";

        clientes.forEach((cliente) => {
            texto += `${ cliente.id_cliente } | ${ cliente.nome } | ${ formatCpfCnpj(cliente.cpf || cliente.cnpj) } | ${ new Date(cliente.dt_nasc).toLocaleDateString("pt-BR") } | ${ cliente.endereco_completo || '' } | ${ cliente.id_tipo_cliente === 1 ? "Físico" : "Jurídico" }\n`;
        });

        const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "relatorios_clientes.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Exportado com sucesso!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    if (isOpenRelatoriosClientes) {
        document.body.classList.add("modal-open");

        return(
            <> 
                <div className="formulario">
                    <h1>Relatórios</h1>
                    <h3>Para gerar seu relatório, é necessário que pelo menos um dos campos esteja preenchido.</h3>
                    <form onSubmit={ handleSubmit }>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    name="nome"
                                    id="nome"
                                    placeholder="Nome do Cliente"
                                    maxLength={ 50 }
                                    onChange={ handleChange }
                                />
                                <input
                                    type="date"
                                    name="dt_nasc"
                                    id="dt_nasc"
                                    onChange={ handleChange }
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="cpfOuCnpj"
                                    name="cpfOuCnpj"
                                    placeholder="CPF ou CNPJ"
                                    minLength={ 14 }
                                    maxLength={ 18 }
                                    value={ formatCpfCnpj(formData.cpfOuCnpj) }
                                    onChange={ handleChange }
                                />
                                <select
                                    name="id_tipo_cliente"
                                    id="id_tipo_cliente"
                                    value={ formData.id_tipo_cliente }
                                    onChange={ handleChange }
                                >
                                    <option value="" selected>Tipo de cliente</option>
                                    <option value="1">Físico</option>
                                    <option value="2">Jurídico</option>
                                </select>
                            </div>
                        </div>
                        <div className="botao-form">
                            <button type="submit" className="botao">
                                <p>Gerar</p>
                            </button>
                        </div>
                    </form>
                    <div className="relatorios">
                        <table id="table-relatorios-crm">
                            <tr>
                                <th>N° Cliente</th>
                                <th>Nome</th>
                                <th>CPF/CNPJ</th>
                            </tr>

                            {clientes.length === 0 ? (
                                <tr>
                                    <td colSpan="3">Clientes não foram encontrados.</td>
                                </tr>
                            ) : (
                                clientes.map((cliente, index) => (
                                    <tr key={ index }>
                                        <td>{ cliente.id_cliente }</td>
                                        <td>{ cliente.nome }</td>
                                        <td>{ formatCpfCnpj(cliente.cpf || cliente.cnpj) }</td>
                                    </tr>
                                ))
                            )}
                        </table>
                    </div>
                    <div className="botao-form">
                        <button type="button" className="botao" onClick={ handleImprimirClick }>
                            <p>Imprimir</p>
                        </button>
                    </div>
                    <div className="botao-form">
                        <button type="button" className="botao" onClick={ setCloseModal }>
                            <p>Voltar</p>
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return null;
}