import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footers from "../Inc/Footers.js";
import logo from "../Assets/logo.png";
import "../Styles/Geral.css";

const EsqueciSenha = () => {
    const [email, setEmail] = useState("");
    const [canSendEmail, setCanSendEmail] = useState(true);
    const [timer, setTimer] = useState(0);
    let interval = null;

    useEffect(() => {
        if (timer === 0 && !canSendEmail) {
            setCanSendEmail(true);
            clearInterval(interval);
        }
    }, [timer, canSendEmail, interval]);

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            Swal.fire({
                title: "Preencha o campo!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (email.length > 250) {
            Swal.fire({
                title: "E-mail inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else {
            if (!canSendEmail) {
                return;
            }

            // fetch("https://soulerp.srv-tii.com.br/api/user/forgot-password", {
            fetch("http://localhost:5000/api/user/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.mensagem === "Preencha o campo!") {
                    Swal.fire({
                        title: "Preencha o campo!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "E-mail inválido!") {
                    Swal.fire({
                        title: "E-mail inválido!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "E-mail enviado!") {
                    Swal.fire({
                        title: "E-mail enviado!",
                        text: "Verifique a caixa de entrada do seu E-mail e abra o link que te enviamos!\n\nCaso não tenha recebido, aguarde 2 minutos para enviar outro E-mail.",
                        icon: "success",
                        confirmButtonColor: "#00968F"
                    });

                    setCanSendEmail(false);
                    setTimer(120);

                    interval = setInterval(() => {
                        setTimer(prevTimer => prevTimer - 1);
                    }, 1000);
                } else {
                    Swal.fire({
                        title: "ERRO - não foi possível enviar o E-mail!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                }
            })
            .catch((error) => {
                console.error("Erro ao enviar E-mail:", error);
            });
        }
    }

    useEffect(() => {
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [interval]);

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

    document.body.classList.remove("modal-open");

    return(
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
                        <h1 className="tituloSenha">Precisa recuperar sua senha?</h1>
                        <p className="paragrafoCentro">
                            Primeiro, utilize o E-mail cadastrado para validarmos o seu registro.
                        </p>
                        <div className="box-senha">
                            <div className="formulario">
                                <form onSubmit={ handleSubmit }>
                                    <div className="row">
                                        <div className="col-12">
                                            <label className="labelSenha">Digite o E-mail cadastrado:</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="E-mail"
                                                maxLength={ 250 }
                                                onChange={ handleChange }
                                                value={ email }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="btn">
                                        <button
                                            className="btn-login"
                                            type="submit"
                                            id="loginBtn"
                                            disabled={ !canSendEmail }
                                        >
                                            { canSendEmail ? "Enviar" : `Aguarde ${ timer }s` }
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <br />
                            <p className="paragrafoCentro">
                                Você receberá um link para recuperar a senha. <br /> <b>Fique atento!</b>
                            </p>
                        </div>
                    </div>
                </main>

                <Footers />
            </div>
        </body>
    );
}

export default EsqueciSenha;