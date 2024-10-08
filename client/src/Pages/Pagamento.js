import React from "react";
import Headers from "../Inc/Headers.js";
import Footers from "../Inc/Footers.js";
import "../Styles/Geral.css";

class Pagamento extends React.Component {
    render() {
        return(
            <>
                <body className="bodyGeral">
                    <div className="pageGeral" id="page">
                        <Headers />

                        <main className="interna">
                            <div className="central">
                                <div className="bem-vindo">
                                    <div className="bem-vindo-txt">
                                        <h1>Seja bem-vindo!</h1>
                                        <p>Preencha os dados abaixo para finalizar sua assinatura.</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="escolha">
                                    <p>Selecione seu plano:</p>
                                    <div className="planinho">Mensal</div>
                                    <div className="planinho">Anual</div>
                                </div>
                                <div className="pagamento">
                                    <p style={{ fontSize: "25px" }}>Dados do cartão<br />
                                        <i className="fa-brands fa-cc-visa"></i>
                                        <i className="fa-brands fa-cc-mastercard" style={{ marginLeft: "5px" }}></i>
                                        <i className="fa-brands fa-cc-paypal" style={{ marginLeft: "5px" }}></i> 
                                    </p>
                                    <div className="formulario">
                                        <form method="POST" action="">
                                            <div className="row">
                                                <div className="col-12">
                                                    <input
                                                        type="text"
                                                        name="nome_cartao"
                                                        id="nome_cartao"
                                                        placeholder="Nome impresso no cartão"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <input
                                                        type="text"
                                                        name="num_cartao"
                                                        id="num_cartao"
                                                        placeholder="Número do cartão"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <input
                                                        type="text"
                                                        name="ccv"
                                                        id="ccv"
                                                        placeholder="CCV"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <input
                                                        type="text"
                                                        name="cpf_tit"
                                                        id="cpf_tit"
                                                        placeholder="CPF titular"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <input
                                                        type="text"
                                                        name="validade"
                                                        id="validade"
                                                        placeholder="Validade"
                                                    />
                                                </div>
                                            </div>
                                            <div className="btn">
                                                <button className="btn-login" type="submit" id="loginBtn">
                                                    SALVAR
                                                </button>
                                            </div>
                                        </form>
                                        <p>
                                            Você receberá um e-mail confirmando sua assinatura. <br />
                                            <b>Fique atento</b>
                                        </p>
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

export default Pagamento;