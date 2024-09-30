import React, { useState } from "react";
import Swal from "sweetalert2";

export default function CadastrarCliente({ isOpenCadastrarCliente, setCloseModal }) {
    const [formData, setFormData] = useState({
        nome: "",
        cpfOuCnpj: "",
        dt_nasc: "",
        id_tipo_cliente: "",
        logradouro: "",
        numero: "",
        cep: "",
        bairro: "",
        cidade: "",
        uf: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { nome, cpfOuCnpj, id_tipo_cliente, logradouro, numero, cep, bairro, cidade, uf } = formData;

        if (!nome || !cpfOuCnpj || !id_tipo_cliente || !logradouro || !numero || !cep || !bairro || !cidade || !uf) {
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
        } else if (nome.length > 50) {
            Swal.fire({
                title: "Nome inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (
                    cpfOuCnpj.length < 11   || 
                    cpfOuCnpj.length > 14   ||
                    cpfOuCnpj.length === 12 ||
                    cpfOuCnpj.length === 13
          ) {
            Swal.fire({
                title: "CPF ou CNPJ inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (
                   logradouro.length > 60 ||
                   numero.length > 8      ||
                   cep.length !== 8       ||
                   cidade.length > 30     ||
                   uf.length !== 2        ||
                   bairro.length > 45
        ) {
            Swal.fire({
                title: "Endereço inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (cpfOuCnpj.length === 14 && id_tipo_cliente !== "2") {
            Swal.fire({
                title: "Tipo de cliente incorreto!",
                text: "Você inseriu um CNPJ, o tipo de cliente deve ser Jurídico.",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else {
            formData.id_tipo_cliente = cpfOuCnpj.length === 11 ? "1" : "2";
            const token = localStorage.getItem("token");

            fetch("http://localhost:5000/api/cadastro-cliente", {
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
                } else if (data.mensagem === "Cliente já cadastrado!") {
                    Swal.fire({
                        title: "Cliente já está cadastrado!",
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
                } else if (data.mensagem === "Endereço inválido!") {
                    Swal.fire({
                        title: "Endereço inválido!",
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
                } else if (data.mensagem === "Cliente cadastrado com sucesso!") {
                    Swal.fire({
                        title: "Cliente cadastrado com sucesso!",
                        text: "O cliente foi inserido nos clientes cadastrados!",
                        icon: "success",
                        confirmButtonColor: "#00968F"
                    });
    
                    setCloseModal();
                } else {
                    Swal.fire({
                        title: "Não foi possível cadastrar cliente!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                }
            })
            .catch((error) => {
                console.error("Erro ao cadastrar cliente:", error);
            });
        }
    }

    if (isOpenCadastrarCliente) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>Cadastrar Cliente</h1>
                    <form onSubmit={ handleSubmit }>
                        <div className="info">
                            <p>Informações pessoais</p>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="nome" name="nome" placeholder="Nome" maxLength={ 50 } required onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="cpfOuCnpj" name="cpfOuCnpj" placeholder="CPF ou CNPJ" minLength={ 11 } maxLength={ 14 } required onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="date" id="dt_nasc" name="dt_nasc" required onChange={ handleChange } />
                                </div>
                            </div>
                        </div>
                        <div className="info">
                            <p>Endereço</p>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="logradouro" name="logradouro" placeholder="Logradouro" maxLength={ 60 } required onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="numero" name="numero" placeholder="Número" maxLength={ 5 } required onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="cep" name="cep" placeholder="CEP" maxLength={ 8 } required onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="bairro" name="bairro" placeholder="Bairro" maxLength={ 100 } required onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="cidade" name="cidade" placeholder="Cidade" maxLength={ 30 } required onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="uf" name="uf" placeholder="UF" minLength={ 2 } maxLength={ 2 } required onChange={ handleChange } />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="tipo-cli">
                            <p>Tipo</p>
                            <div className="row">
                                <div className="col-12">
                                    <label htmlFor="parcelamento">Físico</label>
                                    <input className="radio" type="radio" id="id_tipo_cliente" name="id_tipo_cliente" value="1" checked={ formData.id_tipo_cliente === "1" } onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <label htmlFor="parcelamento">Jurídico</label>
                                    <input className="radio" type="radio" id="id_tipo_cliente" name="id_tipo_cliente" value="2" checked={ formData.id_tipo_cliente === "2" } onChange={ handleChange } />
                                </div>
                            </div>
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