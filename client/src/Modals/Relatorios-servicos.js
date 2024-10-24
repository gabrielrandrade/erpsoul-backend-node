import React, { useState } from "react";
import mask from "../Inc/MaskCpfCnpj";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

            // fetch("https://soulerp.srv-tii.com.br/api/service/reports", {
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
    
    const handleImprimirClick = () => {
        if (servicos.length > 0) {
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
                    const servicoIds = servicos.map(servico => servico.id_servico);

                    // fetch("https://soulerp.srv-tii.com.br/api/service/exportReports", {
                    fetch("http://localhost:5000/api/service/exportReports", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ servicoIds })
                    })
                    .then(response => response.json())
                    .then(data => {
                        switch (result.value) {
                            case "excel":
                                exportToExcel(data.servicos);
                            break;

                            case "pdf":
                                exportToPDF(data.servicos);
                            break;
                            
                            case "txt":
                                exportToText(data.servicos);
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
                title: "Nenhum serviço encontrado!",
                text: "Por favor, faça uma busca antes de exportar.",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        }
    }

    const formatCpfCnpj = (cpfOuCnpj) => { return mask(cpfOuCnpj) }

    const exportToExcel = (servicos) => {
        const wb = XLSX.utils.book_new();
        const ws_data = [
            [
                "N° Serviço",
                "Código LC-116",
                "Código do Serviço",
                "Cliente",
                "Serviço",
                "Descrição do Serviço",
                "Valor do Serviço",
                "Alíquota ISS",
                "Natureza",
                "Data de Vencimento",
                "Status"
            ]
        ];

        servicos.forEach((servico) => {
            const servicoData = [
                servico.id_servico,
                servico.cod_lc,
                servico.cod_servico,
                `${ servico.nome_cliente } (${ formatCpfCnpj(servico.cpfOuCnpjCliente) })`,
                servico.servico,
                servico.descricao,
                parseFloat(servico.valor_servico).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
                servico.aliquota_iss + "%",
                servico.id_natureza === 2 ? "PJ" : "PF",
                new Date(servico.dt_vencimento).toLocaleDateString("pt-BR"),
                servico.id_status === 3 ? "Concluído" :
                servico.id_status === 4 ? "Em Andamento" :
                servico.id_status === 5 ? "Vencido" :
                servico.id_status === 6 ? "Cancelado" : "Status Desconhecido"
            ];
            ws_data.push(servicoData);
        });

        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        XLSX.utils.book_append_sheet(wb, ws, "Serviços");
        XLSX.writeFile(wb, "relatorios_servicos.xlsx");

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Exportado com sucesso!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const exportToPDF = (servicos) => {
        const doc = new jsPDF();
        const tableColumn = [
            "N° Serviço",
            "Código LC-116",
            "Código do Serviço",
            "Cliente",
            "Serviço",
            "Descrição do Serviço",
            "Valor do Serviço",
            "Alíquota ISS",
            "Natureza",
            "Data de Vencimento",
            "Status"
        ];
        const tableRows = [];

        servicos.forEach((servico) => {
            const servicoData = [
                servico.id_servico,
                servico.cod_lc,
                servico.cod_servico,
                `${ servico.nome_cliente } (${ formatCpfCnpj(servico.cpfOuCnpjCliente) })`,
                servico.servico,
                servico.descricao,
                parseFloat(servico.valor_servico).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
                servico.aliquota_iss + "%",
                servico.id_natureza === 2 ? "PJ" : "PF",
                new Date(servico.dt_vencimento).toLocaleDateString("pt-BR"),
                servico.id_status === 3 ? "Concluído" :
                servico.id_status === 4 ? "Em Andamento" :
                servico.id_status === 5 ? "Vencido" :
                servico.id_status === 6 ? "Cancelado" : "Status Desconhecido"
            ];
            tableRows.push(servicoData);
        });

        doc.autoTable(tableColumn, tableRows, {
            startY: 0,
            margin: { left: 0 },
            styles: {
                cellPadding: 2,
                minCellHeight: 10,
                overflow: "linebreak"
            },
            columnStyles: {
                0: { cellWidth: 17 },
                1: { cellWidth: 16 },
                2: { cellWidth: 17 },
                3: { cellWidth: 22 },
                4: { cellWidth: 20 },
                5: { cellWidth: 22 },
                6: { cellWidth: 18 },
                7: { cellWidth: 18 },
                8: { cellWidth: 19 },
                9: { cellWidth: 22 },
                10: { cellWidth: 19 }
            }
        });
        doc.save("relatorios_servicos.pdf");
        
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Exportado com sucesso!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const exportToText = (servicos) => {
        let texto = "N° Serviço | Código LC-116 | Código do Serviço | Cliente | Serviço | Descrição do Serviço | Valor do Serviço | Alíquota ISS | Natureza | Data de Vencimento | Status\n";

        servicos.forEach((servico) => {
            texto += `${ servico.id_servico } | ${ servico.cod_lc } | ${ servico.cod_servico } | ${ `${ servico.nome_cliente } (${ formatCpfCnpj(servico.cpfOuCnpjCliente) })` } | ${ servico.servico } | ${ parseFloat(servico.valor_servico).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) } | ${ servico.aliquota_iss + "%" } | ${ servico.id_natureza === 2 ? "PJ" : "PF" } | ${ new Date(servico.dt_vencimento).toLocaleDateString("pt-BR") } | ${ servico.id_status === 3 ? "Concluído" : servico.id_status === 4 ? "Em Andamento" : servico.id_status === 5 ? "Vencido" : servico.id_status === 6 ? "Cancelado" : "Status Desconhecido" }\n`;
        });

        const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "relatorios_servicos.txt";
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
                    <div className="rel-servicos">
                        <table id="table-rel-servicos">
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
                                    <td colSpan="7" style={{ textAlign: "center" }}>
                                        Serviços não foram encontrados.
                                    </td>
                                </tr>
                            ) : (
                                servicos.map((servico, index) => (
                                    <tr key={ index }>
                                        <td>{ servico.nome_cliente }</td>
                                        <td>{ servico.servico }</td>
                                        <td>
                                            { parseFloat(servico.valor_servico).toLocaleString("pt-BR",
                                                { style: "currency", currency: "BRL" })
                                            }
                                        </td>
                                        <td>{ servico.aliquota_iss }%</td>
                                        <td>{ servico.id_natureza === 2 ? "PJ" : "PF" }</td>
                                        <td>
                                            { new Date(servico.dt_vencimento).toLocaleDateString("pt-BR") }
                                        </td>
                                        <td>{
                                            servico.id_status === 3 ? "Concluído" :
                                            servico.id_status === 4 ? "Em Andamento" :
                                            servico.id_status === 5 ? "Vencido" :
                                            servico.id_status === 6 ? "Cancelado" : "Status Desconhecido"
                                        }</td>
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