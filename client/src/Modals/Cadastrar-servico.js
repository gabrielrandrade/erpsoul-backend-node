import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function CadastrarServico({ isOpenCadastrarServico, setCloseModal }) {
    const [formData, setFormData] = useState({
        cliente: "",
        cpfOuCnpj: "",
        servico: "",
        cod_servico: "",
        cod_lc: "",
        imposto: "",
        val_servico: "",
        id_natureza: "",
        data_vencimento: "",
        desc_servico: ""
    });

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        if (isOpenCadastrarServico) {
            const token = localStorage.getItem("token");

            fetch("http://localhost:5000/api/crm/clientsRegistered", {
                method: "GET",
                headers: { "Authorization": `Bearer ${ token }` }
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.length === 0) {
                    setClientes([]);
                } else {
                    setClientes(data);
                }
            })
            .catch((error) => console.error("Erro ao buscar dados:", error));
        }
    }, [isOpenCadastrarServico]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleClienteChange = (e) => {
        const selectedCliente = e.target.value;
        const cliente = clientes.find(c => c.id === selectedCliente);
        if (cliente) {
            setFormData({
                ...formData,
                cliente: selectedCliente,
                cpfOuCnpj: cliente.cpfOuCnpj
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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
        } = formData;

        if (
            !cliente               ||
            !cpfOuCnpj             ||
            !servico               ||
            !cod_servico           ||
            !cod_lc                ||
            !imposto               ||
            !val_servico           ||
            !id_natureza           ||
            !data_vencimento       ||
            !desc_servico          
        ) {
            const Toast = Swal.mixin({
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
            Toast.fire({
                icon: "error",
                title: "Preencha todos os campos requeridos!"
            });
        } else if (servico.length > 100) {
            Swal.fire({
                title: "Serviço inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (cod_servico.length > 6) {
            Swal.fire({
                title: "Código de Serviço inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (cod_lc.length > 5) {
            Swal.fire({
                title: "Código LC 116 inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (imposto.length > 5) {
            Swal.fire({
                title: "Alíquota ISS inválida!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (desc_servico.length > 250) {
            Swal.fire({
                title: "Descrição inválida!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else {
            const token = localStorage.getItem("token");

            fetch("http://localhost:5000/api/service/register", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${ token }`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.mensagem === "Preencha todos os campos requeridos!") {
                    const Toast = Swal.mixin({
                        position: "center",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true
                    });
                    Toast.fire({
                        icon: "error",
                        title: "Preencha todos os campos requeridos!"
                    });
                } else if (data.mensagem === "Serviço inválido!") {
                    Swal.fire({
                        title: "Serviço inválido!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Código de Serviço inválido!") {
                    Swal.fire({
                        title: "Código de Serviço inválido!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Código LC 116 inválido!") {
                    Swal.fire({
                        title: "Código LC 116 inválido!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Alíquota ISS inválida!") {
                    Swal.fire({
                        title: "Alíquota ISS inválida!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Descrição inválida!") {
                    Swal.fire({
                        title: "Descrição inválida!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Serviço já cadastrado!") {
                    Swal.fire({
                        title: "Serviço já está cadastrado!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Serviço cadastrado com sucesso!") {
                    Swal.fire({
                        title: "Serviço cadastrado com sucesso!",
                        text: "O serviço foi inserido nos serviços cadastrados!",
                        icon: "success",
                        confirmButtonColor: "#00968F"
                    });
    
                    setCloseModal();
                } else {
                    Swal.fire({
                        title: "Não foi possível cadastrar serviço!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                }
            })
            .catch((error) => {
                console.error("Erro ao cadastrar serviço:", error);
            });
        }
    }

    if (isOpenCadastrarServico) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>Cadastrar Serviço</h1>
                    <form onSubmit={ handleSubmit }>
                        <div className="row">
                            <div className="col-6">
                                <select
                                    name="cliente"
                                    value={ formData.cliente }
                                    onChange={ handleClienteChange }
                                    required
                                >
                                    <option>Selecione o cliente*</option>
                                    {clientes.map(cliente => (
                                        <option key={ cliente.id } value={ cliente.id }>
                                            { cliente.nome }
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    placeholder="CPF/CNPJ do Cliente"
                                    value={ formData.cpfOuCnpj }
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="servico"
                                    name="servico"
                                    placeholder="Serviço*"
                                    onChange={ handleChange }
                                    required
                                />    
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="cod_servico"
                                    name="cod_servico"
                                    placeholder="Código Serviço*"
                                    onChange={ handleChange }
                                    maxLength={ 6 }
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="cod_lc"
                                    name="cod_lc"
                                    placeholder="Código LC 116*"
                                    onChange={ handleChange }
                                    maxLength={ 5 }
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="imposto"
                                    name="imposto"
                                    placeholder="Alíquota ISS (%)*"
                                    onChange={ handleChange }
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="val_servico"
                                    name="val_servico"
                                    placeholder="Valor do Serviço (R$)*"
                                    onChange={ handleChange }
                                    required
                                />
                            </div>
                        </div>
                        <div className="natureza-servico">
                            <p>Natureza*</p>
                            <div className="row">
                                <div className="col-6">
                                    <label>PF</label>
                                    <input
                                        className="radio"
                                        type="radio"
                                        id="id_natureza"
                                        name="id_natureza"
                                        value="1"
                                        checked={ formData.id_natureza === "1" }
                                        onChange={ handleChange }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>PJ</label>
                                    <input
                                        className="radio"
                                        type="radio"
                                        id="id_natureza"
                                        name="id_natureza"
                                        value="2"
                                        checked={ formData.id_natureza === "2" }
                                        onChange={ handleChange }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>Data de vencimento*</label>
                                <input type="date" id="data_vencimento" name="data_vencimento" />
                            </div>
                        </div>
                        <div className="row-textarea">
                            <label>Descrição do serviço:</label>
                            <textarea
                                id="desc_servico"
                                name="desc_servico"
                                rows="4"
                                cols="50"
                                onChange={ handleChange }
                            />
                        </div>
                        <div className="botao-form">
                            <button type="submit" className="botao">
                                <p>Salvar</p>
                            </button>
                        </div>
                        <div className="botao-form">
                            <button type="button" className="botao" onClick={ setCloseModal }>
                                <p>Voltar</p>
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }

    return null;
}