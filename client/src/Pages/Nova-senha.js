import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footers from "../Inc/Footers.js";
import logo from "../Assets/logo.png";
import "../Styles/Geral.css";

const NovaSenha = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confSenha, setConfSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);
    const [idRec, setIdRec] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            Swal.fire({
                title: "Link inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            }).then(() => {
                navigate("/home-gratuito");
            });
        }
        
        const params = new URLSearchParams(window.location.search);
        const idRecFromUrl = params.get("idRec");

        if (idRecFromUrl) {
            setIdRec(idRecFromUrl);
        } else {
            Swal.fire({
                title: "Link inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            }).then(() => {
                navigate("/");
            });
        }
    }, [navigate]);

    const handleChangeEmail = (e) => { setEmail(e.target.value) }

    const handleChangeSenha = (e) => { setSenha(e.target.value) }

    const handleChangeConfSenha = (e) => { setConfSenha(e.target.value) }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }

    const handleToggleConfPassword = () => {
        setShowConfPassword(!showConfPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!idRec) {
            Swal.fire({
                title: "Não é possível alterar a senha!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (!email || !senha || !confSenha) {
            Swal.fire({
                title: "Preencha todos os campos!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (senha !== confSenha) {
            Swal.fire({
                title: "As senhas são diferentes!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (email.length > 250 || senha.length > 60 || confSenha.length > 60) {
            Swal.fire({
                title: "Credenciais inválidas!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else {
            // fetch("https://soulerp.srv-tii.com.br/api/user/reset-password", {
            fetch("http://localhost:5000/api/user/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, senha, confSenha, idRec })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.mensagem === "Preencha todos os campos!") {
                    Swal.fire({
                        title: "Preencha todos os campos!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "As senhas são diferentes!") {
                    Swal.fire({
                        title: "As senhas são diferentes!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Credenciais inválidas!") {
                    Swal.fire({
                        title: "Credenciais inválidas!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Usuário inválido!") {
                    Swal.fire({
                        title: "Usuário inválido!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Senha alterada com sucesso!") {
                    Swal.fire({
                        title: "Senha alterada com sucesso!",
                        text: "Estamos redirecionando você para a página de login.",
                        icon: "success",
                        color: "#050538",
                        confirmButtonColor: "#00968F",
                        timer: 5000,
                        showConfirmButton: false,
                        timerProgressBar: true,
                        willClose: () => {
                            navigate("/", { state: { showLoginModal: true } });
                        }
                    });
                } else {
                    Swal.fire({
                        title: "ERRO - não foi possível alterar a senha!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                }
            })
            .catch((error) => {
                console.error("Erro ao enviar nova senha:", error);
                Swal.fire({
                    title: "Erro ao enviar nova senha!",
                    color: "#050538",
                    confirmButtonColor: "#00968F"
                });
            });
        }
    }

    const styles = {
        headerGeral: {
            width: "100%",
            height: "125px",
            display: "flex",
            alignItems: "center",
            position: "relative",
            backgroundColor: "var(--bc)"
        },

        logo: {
            left: "50%",
            position: "absolute",
            transform: "translateX(-50%)"
        }
    }

    return(
        <>
            <body className="bodyGeral">
                <div className="pageGeral" id="page">
                    <header style={ styles.headerGeral }>
                        <div style={ styles.logo }>
                            <Link to="/">
                                <img src={ logo } alt="logotipo" title="ERP - SOUL" />
                            </Link>
                        </div>
                    </header>

                    <main className="interna">
                        <div className="central">
                            <h1 className="tituloSenha">Esqueceu sua senha?</h1>
                            <p className="paragrafoCentro">Não tem problema. <br />Basta inserir uma nova :)</p>
                            <div className="box-senha">
                                <div className="formulario">
                                    <form onSubmit={ handleSubmit }>
                                        <div className="row">
                                            <div className="col-12">
                                                <label className="labelSenha">E-mail:</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    placeholder="E-mail"
                                                    maxLength={ 250 }
                                                    onChange={ handleChangeEmail }
                                                    value={ email }
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12" style={{ position: "relative" }}>
                                                <label className="labelSenha">Digite sua nova senha:</label>
                                                <input
                                                    type={ showPassword ? "text" : "password" }
                                                    id="senha"
                                                    name="senha"
                                                    placeholder="Nova Senha*"
                                                    maxLength={ 60 }
                                                    onChange={ handleChangeSenha }
                                                    value={ senha }
                                                    required
                                                />
                                                {senha && (
                                                    <button
                                                        type="button"
                                                        onClick={ handleTogglePassword }
                                                        style={{
                                                            color: "#FFF",
                                                            position: "absolute",
                                                            right: "10px",
                                                            top: "60%",
                                                            transform: "translateY(-50%)",
                                                            background: "none",
                                                            border: "none",
                                                            cursor: "pointer"
                                                        }}
                                                    >
                                                        { showPassword ? "Ocultar" : "Mostrar" }
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12" style={{ position: "relative" }}>
                                                <input
                                                    type={ showConfPassword ? "text" : "password" }
                                                    id="confSenha"
                                                    name="confSenha"
                                                    placeholder="Repita Nova Senha*"
                                                    maxLength={ 60 }
                                                    onChange={ handleChangeConfSenha }
                                                    value={ confSenha }
                                                    required
                                                />
                                                {confSenha && (
                                                    <button
                                                        type="button"
                                                        onClick={ handleToggleConfPassword }
                                                        style={{
                                                            color: "#FFF",
                                                            position: "absolute",
                                                            right: "10px",
                                                            top: "40%",
                                                            transform: "translateY(-50%)",
                                                            background: "none",
                                                            border: "none",
                                                            cursor: "pointer"
                                                        }}
                                                    >
                                                        { showConfPassword ? "Ocultar" : "Mostrar" }
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="btn">
                                            <button className="btn-login" type="submit" id="loginBtn">
                                                Alterar Senha
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <br />
                            </div>
                        </div>
                    </main>

                    <Footers />
                </div>
            </body>
        </>
    );
}

export default NovaSenha;