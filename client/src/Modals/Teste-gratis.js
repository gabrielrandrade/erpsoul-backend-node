import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function TesteGratis({ isOpenTesteGratis }) {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        whatsapp: "",
        nome_empresa: "",
        cpfOuCnpj: "",
        email_contador: "",
        cargo: "",
        faturamento: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { nome, email, senha, whatsapp, nome_empresa, cpfOuCnpj, email_contador, cargo, faturamento } = formData;

        if (!nome || !email || !senha || !whatsapp || !nome_empresa || !cpfOuCnpj || !cargo) {
            const Toast = Swal.mixin({
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            Toast.fire({
                icon: "error",
                title: "Preencha todos os campos requeridos!"
            });
        } else if (nome.length > 50 || nome.length < 1 || nome_empresa.length > 50 || nome_empresa.length < 1 ) {
            const Toast = Swal.mixin({
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            Toast.fire({
                icon: "error",
                title: "Nome inválido!"
            });
        } else if (email.length > 250 || email_contador.length > 250) {
            const Toast = Swal.mixin({
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            Toast.fire({
                icon: "error",
                title: "E-mail inválido!"
            });
        } else if (senha.length > 60) {
            const Toast = Swal.mixin({
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            Toast.fire({
                icon: "error",
                title: "Senha inválida!"
            });
        } else if (whatsapp.length > 14) {
            const Toast = Swal.mixin({
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            Toast.fire({
                icon: "error",
                title: "WhatsApp inválido!"
            });
        } else if (cpfOuCnpj.length < 11   ||
                   cpfOuCnpj.length > 14   ||
                   cpfOuCnpj.length === 12 ||
                   cpfOuCnpj.length === 13
        ) {
            const Toast = Swal.mixin({
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            Toast.fire({
                icon: "error",
                title: "CPF ou CNPJ inválido!"
            });
        } else if (cargo.length > 50) {
            const Toast = Swal.mixin({
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            Toast.fire({
                icon: "error",
                title: "Cargo inválido!"
            });
        } else if (faturamento.length > 16) {
            const Toast = Swal.mixin({
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            Toast.fire({
                icon: "error",
                title: "Faturamento inválido!"
            });
        } else {
            fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.mensagem === "Preencha todos os campos requeridos!") {
                    const Toast = Swal.mixin({
                        position: "center",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    Toast.fire({
                        icon: "error",
                        title: "Preencha todos os campos requeridos!"
                    });
                } else if (data.mensagem === "Nome inválido!") {
                    const Toast = Swal.mixin({
                        position: "center",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    Toast.fire({
                        icon: "error",
                        title: "Nome inválido!"
                    });
                } else if (data.mensagem === "E-mail inválido!") {
                    const Toast = Swal.mixin({
                        position: "center",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    Toast.fire({
                        icon: "error",
                        title: "E-mail inválido!"
                    });
                } else if (data.mensagem === "Senha inválida!") {
                    const Toast = Swal.mixin({
                        position: "center",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    Toast.fire({
                        icon: "error",
                        title: "Senha inválida!"
                    });
                } else if (data.mensagem === "WhatsApp inválido!") {
                    const Toast = Swal.mixin({
                        position: "center",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    Toast.fire({
                        icon: "error",
                        title: "WhatsApp inválido!"
                    });
                } else if (data.mensagem === "CPF ou CNPJ inválido!") {
                    const Toast = Swal.mixin({
                        position: "center",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    Toast.fire({
                        icon: "error",
                        title: "CPF ou CNPJ inválido!"
                    });
                } else if (data.mensagem === "Cargo inválido!") {
                    const Toast = Swal.mixin({
                        position: "center",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    Toast.fire({
                        icon: "error",
                        title: "Cargo inválido!"
                    });
                } else if (data.mensagem === "Faturamento inválido!") {
                    const Toast = Swal.mixin({
                        position: "center",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    Toast.fire({
                        icon: "error",
                        title: "Faturamento inválido!"
                    });
                } else if (data.token) {
                    const Toast = Swal.mixin({
                        position: "center",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Usuário cadastrado com sucesso!"
                    });
                    localStorage.setItem("token", data.token);
                    navigate("/home-gratuito");
                } else {
                    const Toast = Swal.mixin({
                        position: "center",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    Toast.fire({
                        icon: "error",
                        title: "Não foi possível cadastrar usuário!"
                    });
                }
            })
            .catch((error) => {
                console.error("Erro ao cadastrar usuário:", error);
            });
        }
    }

    if (isOpenTesteGratis) {
        document.body.classList.add("modal-open");

        return(
            <>
                <h2>Teste por <b style={{ color:"#00FFF4", fontSize: "40px" }}>30</b> dias grátis!</h2>
                <div className="box-teste">
                    <div className="formulario">
                        <form onSubmit={ handleSubmit }>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="nome" name="nome" placeholder="Nome*" maxLength={ 50 } required onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="email" id="email" name="email" placeholder="E-mail*" maxLength={ 250 } required onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="senha" name="senha" placeholder="Senha*" maxLength={ 60 } required onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="whatsapp" name="whatsapp" placeholder="Nº WhatsApp (com DDD)*" maxLength={ 14 } required onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="nome_empresa" name="nome_empresa" placeholder="Nome da Empresa*" maxLength={ 50 } required onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="cpfOuCnpj" name="cpfOuCnpj" placeholder="CPF/CNPJ*" minLength={ 11 } maxLength={ 14 } required onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="email_contador" name="email_contador" placeholder="E-mail Contador" maxLength={ 250 } onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="cargo" name="cargo" placeholder="Cargo*" maxLength={ 50 } required onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="faturamento" name="faturamento" placeholder="Faturamento" maxLength={ 20 } onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row termos">
                                <div className="col-12">
                                    <input className="check-box" type="checkbox" id="termos_priv" name="termos_priv" value="1" required />
                                    <label for="termos_priv"> Li e Aceitos os Termos de Privacidade</label>
                                </div>
                            </div>
                            <button type="submit" className="btn-login" id="loginBtn">CADASTRAR</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }

    return null;
}