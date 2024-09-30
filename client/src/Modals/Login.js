import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login({ isOpenLogin }) {
    const [formData, setFormData] = useState({
        email: "",
        senha: ""
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

        if (!formData.email || !formData.senha) {
            const Toast = Swal.mixin({
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            Toast.fire({
                icon: "error",
                title: "Preencha todos os campos!"
            });
        } else if (formData.email.length > 250 || formData.senha.length > 60) {
            const Toast = Swal.mixin({
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            Toast.fire({
                icon: "error",
                title: "Credenciais inválidas!"
            });
        } else {
            const conectado = document.getElementById("conectado").checked;

            fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, conectado }),
            })
            .then(async (response) => {
                const data = await response.json();

                if (response.status === 400 && data.errors) {
                    data.errors.forEach((error) => {
                        Swal.fire({
                            icon: "error",
                            title: error.msg
                        });
                    });
                } else if (data.mensagem === "Credenciais inválidas!") {
                    const Toast = Swal.mixin({
                        position: "center",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    Toast.fire({
                        icon: "error",
                        title: "Credenciais inválidas!"
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
                        title: "Usuário logado com sucesso!"
                    });
                    localStorage.setItem("token", data.token);
                    navigate("/home-gratuito");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: data.mensagem || "Erro inesperado"
                    });
                }
            })
            .catch((error) => {
                console.error("Erro ao entrar:", error);
            });
        }
    }

    if (isOpenLogin) {
        document.body.classList.add("modal-open");

        return(
            <>
                <h2>Entrar</h2>
                <p>Bem vindo de volta<br /> É um prazer tê-lo aqui.</p>
                <div className="box-login">
                    <div className="formulario">
                        <form onSubmit={ handleSubmit }>
                            <div className="row">
                                <div className="col-12">
                                    <input type="email" id="email" name="email" placeholder="E-mail" maxLength={ 250 } required onChange={ handleChange } />
                                </div>
                                <div className="col-12">
                                    <input type="password" id="senha" name="senha" placeholder="Senha" maxLength={ 60 } required onChange={ handleChange } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input className="check-box" type="checkbox" id="conectado" name="conectado" />
                                    <label htmlFor="conectado"> Lembre-se de mim</label>
                                </div>
                            </div>
                            <button type="submit" className="btn-login" id="loginBtn">
                                ENTRAR
                            </button>
                        </form>
                        <p>
                            Esqueceu sua senha?
                            <Link to="/esqueci-senha"><b>Clique aqui</b></Link>
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return null;
}