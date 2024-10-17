import React, { useState } from "react";
import Swal from "sweetalert2";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

export default function RelatoriosServicos({ isOpenRelatoriosServicos, setCloseModal }) {
    const [servicos, setServicos] = useState([]);

    const [formData, setFormData] = useState({
        nome_cliente: "",
        cod_servico: "",
        servico: "",
        data_vencimento: "",
        status_servico: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setServicos([]);

        const { nome_cliente, cod_servico, servico, data_vencimento, status_servico } = formData;

        if (!nome_cliente && !cod_servico && !servico && !data_vencimento && !status_servico) {
            Swal.fire({
                title: "Preencha pelo menos um dos campos!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (nome_cliente.length > 50) {
            Swal.fire({
                title: "Nome inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (cod_servico.length > 11 || isNaN(cod_servico)) {
            Swal.fire({
                title: "Código do Serviço inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (servico.length > 100) {
            Swal.fire({
                title: "Serviço inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else {
            const token = localStorage.getItem("token");

            fetch("http://localhost:5000/api/service/reports", {
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
                } else if (data.mensagem === "Código do Serviço inválido!") {
                    Swal.fire({
                        title: "Código do Serviço inválido!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                }  else if (data.mensagem === "Serviço inválido!") {
                    Swal.fire({
                        title: "Serviço inválido!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Data de Vencimento inválida!") {
                    Swal.fire({
                        title: "Data de Vencimento inválida!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Serviço não encontrado!") {
                    Swal.fire({
                        title: "Serviço não encontrado!",
                        text: "Verifique se os campos estão preenchidos corretamente.",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Serviço encontrado!") {
                    setServicos(data.results);
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
    
/*
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

                    fetch("http://localhost:5000/api/crm/exportReports", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ clienteIds })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (result.value === "excel") {
                            exportToExcel(data.clientes);
                        } else if (result.value === "pdf") {
                            exportToPDF(data.clientes);
                        } else if (result.value === "txt") {
                            exportToText(data.clientes);
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
                cliente.cpf || cliente.cnpj,
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
                cliente.cpf || cliente.cnpj,
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
            texto += `${ cliente.id_cliente } | ${ cliente.nome } | ${ cliente.cpf || cliente.cnpj } | ${ new Date(cliente.dt_nasc).toLocaleDateString("pt-BR") } | ${ cliente.endereco_completo || '' } | ${ cliente.id_tipo_cliente === 1 ? "Físico" : "Jurídico" }\n`;
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
*/

    if (isOpenRelatoriosServicos) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>Relatórios</h1>
                    <h3>
                        Para gerar seu relatório, é necessário que pelo menos um dos campos esteja preenchido. 
                    </h3>
                    <form onSubmit={ handleSubmit }>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    name="nome_cliente"
                                    id="nome_cliente"
                                    placeholder="Nome do Cliente"
                                    maxLength={ 50 }
                                    onChange={ handleChange }
                                />
                                <input
                                    type="text"
                                    name="cod_servico"
                                    id="cod_servico"
                                    placeholder="Código do Serviço"
                                    maxLength={ 11 }
                                    onChange={ handleChange }
                                />
                                <input
                                    type="text"
                                    name="servico"
                                    id="servico"
                                    placeholder="Serviço Prestado"
                                    maxLength={ 100 }
                                    onChange={ handleChange }
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>Data de Vencimento</label>
                                <input
                                    type="date"
                                    id="data_vencimento"
                                    name="data_vencimento"
                                    value={ formData.data_vencimento }
                                    onChange={ handleChange }
                                />
                
                                <label>Status do Serviço</label>
                                <select
                                    id="status_servico"
                                    name="status_servico"
                                    value={ formData.status_servico }
                                    onChange={ handleChange }
                                >
                                    <option value="">Selecione o status</option>
                                    <option value="3">CONCLUÍDO</option>
                                    <option value="4">EM ANDAMENTO</option>
                                    <option value="5">VENCIDO</option>
                                    <option value="6">CANCELADO</option>
                                </select>
                            </div>
                        </div>
                        <div className="botao-form">
                            <button type="submit" className="botao">
                                <p>Gerar</p>
                            </button>
                        </div>
                    </form>
                    <div className="rel-clientes">
                        <table id="table-rel-clientes">
                            <tr>
                                <th>Cliente</th>
                                <th>Serviço</th> 
                                <th>Valor Serviço</th>
                                <th>Alíquota ISS</th>
                                <th>Natureza</th>
                                <th>Data de Vencimento</th>
                                <th>Status</th>
                            </tr>

                            {servicos.length === 0 ? (
                                <tr>
                                    <td colSpan="7">Serviços não foram encontrados.</td>
                                </tr>
                            ) : (
                                servicos.map((servico, index) => (
                                    <tr key={ index }>
                                        <td>{ servico.nome_cliente }</td>
                                        <td>{ servico.servico }</td>
                                        <td>R$ { servico.valor_servico }</td>
                                        <td>{ servico.aliquota_iss }%</td>
                                        <td>{ servico.id_natureza === 2 ? "PJ" : "PF" }</td>
                                        <td>
                                            { new Date(servico.dt_vencimento).toLocaleDateString("pt-BR") }
                                        </td>
                                        <td>{
                                            servico.id_status === 3 ? "Concluído" :
                                            servico.id_status === 4 ? "Em Andamento" :
                                            servico.id_status === 5 ? "Vencido" :
                                            servico.id_status === 6 ? "Cancelado" :
                                            "Status Desconhecido"
                                        }</td>
                                    </tr>
                                ))
                            )}
                        </table>
                    </div>
                    <div className="botao-form">
                        <button type="button" className="botao">
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