import React from "react";
import { Link } from "react-router-dom";
import Footers from "../Inc/Footers.js";
import logo from "../Assets/logo.png";
import "../Styles/Geral.css";

class SenhaSucesso extends React.Component {
    render() {
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
                                <div className="senha-sucesso">
                                    <i className="fa-regular fa-circle-check"></i>
                                    <div className="bloco-sucesso">
                                        <h1>Senha Alterada com Sucesso!</h1><br />
                                    </div>
                                    <div className="btn-sucesso">
                                        <Link to="/" className="inicio-btn">INÍCIO</Link>
                                    </div>
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

export default SenhaSucesso;