import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ServicosCadastrados({ isOpenServicosCadastrados, setCloseModal }) {
    const [services, setServices] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [editandoDados, setEditandoDados] = useState({
        val_servico: "",
        imposto: "",
        id_natureza: "",
        data_vencimento: "",
        status_servico: ""
    });

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

    const startEdit = (service) => {
        setEditandoId(service.id_servico);
        setEditandoDados({
            val_servico: service.valor_servico,
            imposto: service.aliquota_iss,
            id_natureza: service.id_natureza === 2 ? "PJ" : "PF",
            data_vencimento: new Date(service.dt_vencimento).toLocaleDateString("pt-BR"),
            status_servico: service.id_status === 3 ? "Concluído" :
                            service.id_status === 4 ? "Em Andamento" :
                            service.id_status === 5 ? "Vencido" :
                            service.id_status === 6 ? "Cancelado" :
                            "Status Desconhecido"
        });
    }

    const cancelEdit = () => {
        setEditandoId(null);
        setEditandoDados({
            val_servico: "",
            imposto: "",
            id_natureza: "",
            data_vencimento: "",
            status_servico: ""
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditandoDados({ ...editandoDados, [name]: value });
    }

    const saveEdit = (id_servico) => {
        const { val_servico, imposto, id_natureza, data_vencimento, status_servico } = editandoDados;

        if (!val_servico || !imposto || !id_natureza || data_vencimento || status_servico) {
            Swal.fire({
                title: "Erro!",
                text: "Os campos não podem ficar vazios!",
                icon: "error",
                confirmButtonColor: "#00968F"
            });
        } else if (imposto.length > 50) {
            Swal.fire({
                title: "Alíquota ISS inválida!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (id_natureza !== "PF" && id_natureza !== "PJ") {
            Swal.fire({
                title: "Natureza inválida!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else {
            fetch(`http://localhost:5000/api/service/servicesRegistered/${ id_servico }/edit`, {
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
                    setServices(services.map(service => 
                        service.id_servico === id_servico ? { 
                            ...service, 
                            val_servico: editandoDados.val_servico,
                            imposto: editandoDados.imposto,
                            id_natureza: editandoDados.id_natureza,
                            data_vencimento: editandoDados.data_vencimento,
                            status_servico: editandoDados.status_servico
                        } : service
                    ));
                    cancelEdit();
                } else {
                    Swal.fire({
                        title: "Erro!",
                        text: "Não foi possível atualizar o serviço.",
                        icon: "error",
                        confirmButtonColor: "#00968F"
                    });
                }
            })
            .catch((error) => console.error("Erro ao atualizar serviço:", error));
        }
    }

    const updateToInactive = (id_servico) => {
        Swal.fire({
            title: "Tem certeza?",
            text: "Esta ação excluirá o serviço!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00968F",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/api/service/servicesRegistered/${ id_servico }/delete`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.mensagem === "Serviço excluído com sucesso!") {
                        Swal.fire({
                            title: "Excluído!",
                            text: "O serviço foi excluído com sucesso.",
                            icon: "success",
                            confirmButtonColor: "#00968F"
                        });
                        setServices(services.filter(service => service.id_servico !== id_servico));
                    } else {
                        Swal.fire({
                            title: "Erro!",
                            text: "Não foi possível excluir o serviço.",
                            icon: "error",
                            confirmButtonColor: "#00968F"
                        });
                    }
                })
                .catch((error) => console.error("Erro ao excluir serviço:", error));
            }
        });
    }

    if (isOpenServicosCadastrados) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>SERVIÇOS CADASTRADOS</h1>
                    <br />
                    <div className="rel-clientes" style={{ overflowX: "auto", maxWidth: "80%" }}>
                        <table
                            id="table-rel-clientes"
                            style={{
                                width: "100%",
                                borderCollapse: "collapse"
                            }}
                        >
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

                                        {editandoId === service.id_servico ? (
                                            <>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="val_servico"
                                                        name="val_servico"
                                                        value={ editandoDados.val_servico }
                                                        maxLength={ 50 }
                                                        onChange={ handleInputChange }
                                                        required
                                                        style={{
                                                            height: "25px",
                                                            color: "#040438"
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="imposto"
                                                        name="imposto"
                                                        value={ editandoDados.imposto }
                                                        maxLength={ 50 }
                                                        onChange={ handleInputChange }
                                                        required
                                                        style={{
                                                            height: "25px",
                                                            color: "#040438"
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <select
                                                        name="status_servico"
                                                        value={ editandoDados.status_servico }
                                                        onChange={ handleInputChange }
                                                        required
                                                        style={{
                                                            height: "25px",
                                                            color: "#040438"
                                                        }}
                                                    >
                                                        <option value="1">PF</option>
                                                        <option value="2">PJ</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        id="data_vencimento"
                                                        name="data_vencimento"
                                                        value={ editandoDados.data_vencimento }
                                                        onChange={ handleInputChange }
                                                        required
                                                        style={{
                                                            height: "25px",
                                                            color: "#040438"
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <select
                                                        name="status_servico"
                                                        value={ editandoDados.status_servico }
                                                        onChange={ handleInputChange }
                                                        required
                                                        style={{
                                                            height: "25px",
                                                            color: "#040438"
                                                        }}
                                                    >
                                                        <option value="3">Concluído</option>
                                                        <option value="4">Em Andamento</option>
                                                        <option value="5">Vencido</option>
                                                        <option value="6">Cancelado</option>
                                                    </select>
                                                </td>
                                            </>
                                        ) : (
                                            <>
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
                                            </>
                                        )}
                                        {editandoId === service.id_servico ? (
                                            <>
                                                <button
                                                        onClick={ () => saveEdit(service.id_servico) }
                                                        style={{
                                                            padding: "2px",
                                                            marginTop: "10px",
                                                            marginLeft: "3px",
                                                            color: "#040438"
                                                        }}
                                                >
                                                    Salvar
                                                </button>
                                                <button
                                                        onClick={ cancelEdit }
                                                        style={{
                                                            padding: "2px",
                                                            marginTop: "10px",
                                                            marginLeft: "3px",
                                                            color: "#040438"
                                                        }}
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <td>
                                                    <i 
                                                        className="fa-solid fa-pen"
                                                        onClick={ () => startEdit(service) } 
                                                        style={{ cursor: "pointer" }}>
                                                    </i>
                                                </td>
                                                <td>
                                                    <i 
                                                        className="fa-solid fa-trash" 
                                                        onClick={ () => updateToInactive(service.id_servico) } 
                                                        style={{ cursor: "pointer" }}>
                                                    </i>
                                                </td>
                                            </>
                                        )}
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