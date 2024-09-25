import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footers from "../Inc/Footers.js";
import logo from "../Assets/logo.png";
import "../Styles/Geral.css";

class EsqueciSenha extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            canSendEmail: true,
            timer: 0
        };
        this.interval = null;
    }

    handleChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { email, canSendEmail } = this.state;

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

            fetch("http://localhost:5000/api/esqueci-senha", {
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

                    this.setState({
                        canSendEmail: false,
                        timer: 120
                    });

                    this.interval = setInterval(() => {
                        this.setState((prevState) => ({
                            timer: prevState.timer - 1
                        }));
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
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.timer === 0 && prevState.timer !== 0) {
            this.setState({ canSendEmail: true });

            if (this.interval) {
                clearInterval(this.interval);
            }
        }
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { email, canSendEmail, timer } = this.state;

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
                                <h1 className="tituloSenha">Precisa recuperar sua senha?</h1>
                                <p className="paragrafoCentro">Primeiro, utilize o E-mail cadastrado para validarmos o seu registro.</p>
                                <div className="box-senha">
                                    <div className="formulario">
                                        <form onSubmit={ this.handleSubmit }>
                                            <div className="row">
                                                <div className="col-12">
                                                    <label className="labelSenha">Digite o E-mail cadastrado:</label>
                                                    <input type="email" name="email" id="email" placeholder="E-mail" maxLength={ 250 } required onChange={ this.handleChange } value={ email } />
                                                </div>
                                            </div>
                                            <div className="btn">
                                                <button className="btn-login" type="submit" id="loginBtn" disabled={ !canSendEmail }>
                                                    { canSendEmail ? "Enviar" : `Aguarde ${ timer }s` }
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <br />
                                    <p className="paragrafoCentro">Você receberá um link para recuperar a senha. <br /> <b>Fique atento!</b></p>
                                </div>
                            </div>
                        </main>

                        <Footers />
                    </div>
                </body>
            </>
        );
    }
}

export default EsqueciSenha;