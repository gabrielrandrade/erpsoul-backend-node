import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ServicosCadastrados({ isOpenServicosCadastrados, setCloseModal }) {
    const [services, setServices] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [editandoDados, setEditandoDados] = useState({ nome: "", cpfOuCnpj: "" });

    useEffect(() => {
        if (isOpenServicosCadastrados) {
            const token = localStorage.getItem("token");

            fetch("http://localhost:5000/api/service/servicesRegistered", {
                method: "GET",
                headers: { "Authorization": `Bearer ${ token }` }
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.length === 0) {
                    setServices([]);
                } else {
                    setServices(data);
                }
            })
            .catch((error) => console.error("Erro ao buscar dados:", error));
        }
    }, [isOpenServicosCadastrados]);

    const startEdit = (cliente) => {
        setEditandoId(cliente.id_cliente);
        setEditandoDados({ nome: cliente.name, cpfOuCnpj: cliente.cpf || cliente.cnpj });
    };

    const cancelEdit = () => {
        setEditandoId(null);
        setEditandoDados({ nome: "", cpfOuCnpj: "" });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditandoDados({ ...editandoDados, [name]: value });
    };

    const saveEdit = (id_cliente) => {
        const { nome, cpfOuCnpj } = editandoDados;

        if (!nome || !cpfOuCnpj) {
            Swal.fire({
                title: "Erro!",
                text: "Os campos não podem ficar vazios!",
                icon: "error",
                confirmButtonColor: "#00968F"
            });
        } else if (nome.length > 50 || nome.length < 1) {
            Swal.fire({
                title: "Nome inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (cpfOuCnpj.length < 11   ||
                   cpfOuCnpj.length > 14   ||
                   cpfOuCnpj.length === 12 ||
                   cpfOuCnpj.length === 13
        ) {
            Swal.fire({
                title: "CPF ou CNPJ inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else {
            fetch(`http://localhost:5000/api/crm/clientsRegistered/${ id_cliente }/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editandoDados)
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.mensagem === "Os campos não podem ficar vazios!") {
                    Swal.fire({
                        title: "Erro!",
                        text: "Os campos não podem ficar vazios!",
                        icon: "error",
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
                } else if (data.mensagem === "Cliente atualizado com sucesso!") {
                    Swal.fire({
                        title: "Sucesso!",
                        text: "O cliente foi atualizado com sucesso.",
                        icon: "success",
                        confirmButtonColor: "#00968F"
                    });
                    setClientes(clientes.map(cliente => 
                        cliente.id_cliente === id_cliente ? { 
                            ...cliente, 
                            nome: editandoDados.nome, 
                            cpf: editandoDados.cpfOuCnpj 
                        } : cliente
                    ));
                    cancelEdit();
                } else {
                    Swal.fire({
                        title: "Erro!",
                        text: "Não foi possível atualizar o cliente.",
                        icon: "error",
                        confirmButtonColor: "#00968F"
                    });
                }
            })
            .catch((error) => console.error("Erro ao atualizar cliente:", error));
        }
    };

    const updateToInactive = (id_cliente) => {
        Swal.fire({
            title: "Tem certeza?",
            text: "Esta ação excluirá o cliente!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00968F",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/api/crm/clientsRegistered/${ id_cliente }/delete`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.mensagem === "Cliente excluído com sucesso!") {
                        Swal.fire({
                            title: "Excluído!",
                            text: "O cliente foi excluído com sucesso.",
                            icon: "success",
                            confirmButtonColor: "#00968F"
                        });
                        setClientes(clientes.filter(cliente => cliente.id_cliente !== id_cliente));
                    } else {
                        Swal.fire({
                            title: "Erro!",
                            text: "Não foi possível excluir o cliente.",
                            icon: "error",
                            confirmButtonColor: "#00968F"
                        });
                    }
                })
                .catch((error) => console.error("Erro ao excluir cliente:", error));
            }
        });
    };

    if (isOpenServicosCadastrados) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>SERVIÇOS CADASTRADOS</h1>
                    <br />
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

                            {services.length === 0 ? (
                                <tr>
                                    <td colSpan="7">Não há serviços cadastrados.</td>
                                </tr>
                            ) : (
                                services.map((service, index) => (
                                    <tr key={ index }>
                                        <td>{ service.clientName }</td>
                                        <td>{ service.servico }</td>
                                        <td>R$ { service.valor_servico }</td>
                                        <td>{ service.aliquota_iss }%</td>
                                        <td>{ service.id_natureza === 2 ? "PJ" : "PF" }</td>
                                        <td>
                                            { new Date(service.dt_vencimento).toLocaleDateString("pt-BR") }
                                        </td>
                                        <td>{
                                            service.id_status === 3 ? "Concluído" :
                                            service.id_status === 4 ? "Em Andamento" :
                                            service.id_status === 5 ? "Vencido" :
                                            service.id_status === 6 ? "Cancelado" :
                                            "Status Desconhecido"
                                        }</td>
                                    </tr>
                                ))
                            )}
                        </table>
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