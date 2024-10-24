import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { NumericFormat } from "react-number-format";

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

            // fetch("https://soulerp.srv-tii.com.br/api/service/servicesRegistered", {
            fetch("http://localhost:5000/api/service/servicesRegistered", {
                method: "GET",
                headers: { "Authorization": `Bearer ${ token }` }
            })
            .then((response) => response.json())
            .then((data) => {
                setServices(data.length === 0 ? [] : data);
            })
            .catch((error) => console.error("Erro ao buscar dados:", error));
        }
    }, [isOpenServicosCadastrados]);

    const startEdit = (service) => {
        setEditandoId(service.id_servico);
        setEditandoDados({
            val_servico: service.valor_servico,
            imposto: service.aliquota_iss,
            id_natureza: service.id_natureza,
            data_vencimento: new Date(service.dt_vencimento).toISOString().split("T")[0],
            status_servico: service.id_status
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
        if (isNaN(editandoDados.val_servico)) {
            editandoDados.val_servico = editandoDados.val_servico.replace(/\D/g, "");
        }

        const { val_servico, imposto, id_natureza, data_vencimento, status_servico } = editandoDados;

        if (!val_servico || !imposto || !id_natureza || !data_vencimento || !status_servico) {
            Swal.fire({
                title: "Erro!",
                text: "Os campos não podem ficar vazios!",
                icon: "error",
                confirmButtonColor: "#00968F"
            });
        } else if (val_servico.length > 20) {
            Swal.fire({
                title: "Valor do Serviço inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (imposto.length > 10) {
            Swal.fire({
                title: "Alíquota ISS inválida!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (
            (id_natureza !== 1 && id_natureza !== "1") &&
            (id_natureza !== 2 && id_natureza !== "2")
        ) {
            Swal.fire({
                title: "Natureza inválida!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (
            (status_servico !== 3 && status_servico !== "3") &&
            (status_servico !== 4 && status_servico !== "4") &&
            (status_servico !== 5 && status_servico !== "5") &&
            (status_servico !== 6 && status_servico !== "6")
        ) {
            Swal.fire({
                title: "Status inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else {
            // fetch(`https://soulerp.srv-tii.com.br/api/service/servicesRegistered/${ id_servico }/edit`, {
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
                } else if (data.mensagem === "Valor do Serviço inválido!") {
                    Swal.fire({
                        title: "Valor do Serviço inválido!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Alíquota ISS inválida!") {
                    Swal.fire({
                        title: "Alíquota ISS inválida!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Natureza inválida!") {
                    Swal.fire({
                        title: "Natureza inválida!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Data de Vencimento inválida!") {
                    Swal.fire({
                        title: "Data de Vencimento inválida!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Status inválido!") {
                    Swal.fire({
                        title: "Status inválido!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Serviço atualizado com sucesso!") {
                    Swal.fire({
                        title: "Sucesso!",
                        text: "O serviço foi atualizado com sucesso.",
                        icon: "success",
                        confirmButtonColor: "#00968F"
                    });

                    // fetch("https://soulerp.srv-tii.com.br/api/service/servicesRegistered", {
                    fetch("http://localhost:5000/api/service/servicesRegistered", {
                        method: "GET",
                        headers: { 
                            "Authorization": `Bearer ${ localStorage.getItem("token" )}`
                        }
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
        })
        .then((result) => {
            if (result.isConfirmed) {
                // fetch(`https://soulerp.srv-tii.com.br/api/service/servicesRegistered/${ id_servico }/delete`, {
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

                            {services.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: "center" }}>
                                        Não há serviços cadastrados.
                                    </td>
                                </tr>
                            ) : (
                                services.map((service, index) => (
                                    <tr key={ index }>
                                        <td>{ service.clientName }</td>
                                        <td>{ service.servico }</td>

                                        {editandoId === service.id_servico ? (
                                            <>
                                                <td>
                                                    <NumericFormat
                                                        id="val_servico"
                                                        name="val_servico"
                                                        placeholder="Valor do Serviço (R$)*"
                                                        maxLength={ 23 }
                                                        prefix={ "R$ " }
                                                        decimalSeparator=","
                                                        thousandSeparator="."
                                                        decimalScale={ 2 }
                                                        value={ editandoDados.val_servico }
                                                        onChange={ handleInputChange }
                                                        required
                                                        style={{
                                                            height: "25px",
                                                            color: "#040438"
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <NumericFormat
                                                        id="imposto"
                                                        name="imposto"
                                                        placeholder="Alíquota ISS (%)*"
                                                        maxLength={ 7 }
                                                        value={ editandoDados.imposto }
                                                        onValueChange={(values) => {
                                                            const { value } = values;
                                                            setEditandoDados({
                                                                ...editandoDados,
                                                                imposto: value
                                                            });
                                                        }}
                                                        decimalScale={ 2 }
                                                        fixedDecimalScale={ true }
                                                        allowNegative={ true }
                                                        suffix="%"
                                                        required
                                                    />
                                                </td>
                                                <td>
                                                    <select
                                                        id="id_natureza"
                                                        name="id_natureza"
                                                        value={ editandoDados.id_natureza }
                                                        onChange={ handleInputChange }
                                                        required
                                                        style={{
                                                            height: "25px",
                                                            color: "#040438",
                                                            backgroundColor: "#fff"
                                                        }}
                                                    >
                                                        <option
                                                            value="1"
                                                            selected={ editandoDados.id_natureza === 1 }
                                                            onChange={ handleInputChange }
                                                        >
                                                            PF
                                                        </option>
                                                        <option
                                                            value="2"
                                                            selected={ editandoDados.id_natureza === 2 }
                                                            onChange={ handleInputChange }
                                                        >
                                                            PJ
                                                        </option>
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
                                                        id="status_servico"
                                                        name="status_servico"
                                                        value={ editandoDados.status_servico }
                                                        onChange={ handleInputChange }
                                                        required
                                                        style={{
                                                            height: "25px",
                                                            color: "#040438",
                                                            backgroundColor: "#fff"
                                                        }}
                                                    >
                                                        <option
                                                            value="3"
                                                            selected={ editandoDados.status_servico === 3 }
                                                            onChange={ handleInputChange }
                                                        >
                                                            Concluído
                                                        </option>
                                                        <option
                                                            value="4"
                                                            selected={ editandoDados.status_servico === 4 }
                                                            onChange={ handleInputChange }
                                                        >
                                                            Em Andamento
                                                        </option>
                                                        <option
                                                            value="5"
                                                            selected={ editandoDados.status_servico === 5 }
                                                            onChange={ handleInputChange }
                                                        >
                                                            Vencido
                                                        </option>
                                                        <option
                                                            value="6"
                                                            selected={ editandoDados.status_servico === 6 }
                                                            onChange={ handleInputChange }
                                                        >
                                                            Cancelado
                                                        </option>
                                                    </select>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>
                                                    { parseFloat(service.valor_servico).toLocaleString("pt-BR",
                                                        { style: "currency", currency: "BRL" })
                                                    }
                                                </td>
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
                                                <td colSpan="2">
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
                                                </td>
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