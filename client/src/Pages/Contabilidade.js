import React from "react";
import { Link } from "react-router-dom";
import Headers from "../Inc/Headers.js";
import Footers from "../Inc/Footers.js";
import CadastrarContador from "../Modals/Cadastrar-contador.js";
import PlanoContas from "../Modals/Plano-contas.js";
import Integracoes from "../Modals/Integracoes.js";
import FormX from "../Modals/FormX.js";
import carrinho from "../Assets/carrinho.png";
import ajuda from "../Assets/ajuda.png";
import "../Styles/Geral.css";

class Contabilidade extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openModal: false };
        this.state = { openModal2: false };
        this.state = { openModal3: false };
        this.state = { openModal4: false };
        this.state = { openModal5: false };
    }
    
    setOpenModal = (isOpenCadastrarContador) => {
        this.setState({ openModal: isOpenCadastrarContador });
    }

    setOpenModal2 = (isOpenPlanoContas) => {
        this.setState({ openModal2: isOpenPlanoContas });
    }

    setOpenModal3 = (isOpenIntegracoes) => {
        this.setState({ openModal3: isOpenIntegracoes });
    }

    setOpenModal4 = (isOpenFormX) => {
        this.setState({ openModal4: isOpenFormX });
    }

    setOpenModal5 = (isOpenFormX) => {
        this.setState({ openModal5: isOpenFormX });
    }

    setCloseModal = () => {
        this.setState({ openModal: false });
        this.setState({ openModal2: false });
        this.setState({ openModal3: false });
        this.setState({ openModal4: false });
        this.setState({ openModal5: false });
        document.body.classList.remove("modal-open");
    }

    render() {
        return(
            <>
                <body className="bodyGeral">
                    <div className="pageGeral" id="page">
                        <Headers />
            
                        <main className="interna">
                            <div className="carrinho">
                                <p className="para1"><b>Comece a vender mais.</b></p>
                                <img src={ carrinho } alt="Carrinho" />
                                <p className="para2">Plataforma que te impulsiona.</p>
                            </div>
                            <br />
                            <br />
                            <hr />
                            <div className="central">
                                <h1>CONTABILIDADE</h1>
                                <div className="container-modal">
                                    <button className="modal-btn" onClick={ () => this.setOpenModal(true) } id="btn-cad-contador">CADASTRAR CONTADOR</button><br />
                                    <button className="modal-btn" onClick={ () => this.setOpenModal2(true) } id="btn-plano-contas">PLANO DE CONTAS</button><br />
                                    <button className="modal-btn" onClick={ () => this.setOpenModal3(true) } id="btn-integracoes">INTEGRAÇÕES</button><br />
                                    <button className="modal-btn" onClick={ () => this.setOpenModal4(true) } id="btn-gerar-arquivo">GERAR ARQUIVO</button><br />
                                    <button className="modal-btn" onClick={ () => this.setOpenModal5(true) } id="btn-fechar-periodo">FECHAR PERÍODO</button><br />
                                </div>

                                {this.state.openModal && (
                                    <div className="modal-overlay">
                                        <div className="modal-container">
                                            <CadastrarContador isOpenCadastrarContador={ this.state.openModal } setCloseModal={ this.setCloseModal } />
                                            <div className="botoes">
                                                <button className="close-btn" onClick={ this.setCloseModal }>
                                                    <i class="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {this.state.openModal2 && (
                                    <div className="modal-overlay">
                                        <div className="modal-container">
                                            <PlanoContas isOpenPlanoContas={ this.state.openModal2 } setCloseModal={ this.setCloseModal } />
                                            <div className="botoes">
                                                <button className="close-btn" onClick={ this.setCloseModal }>
                                                    <i class="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {this.state.openModal3 && (
                                    <div className="modal-overlay">
                                        <div className="modal-container">
                                            <Integracoes isOpenIntegracoes={ this.state.openModal3 } setCloseModal={ this.setCloseModal } />
                                            <div className="botoes">
                                                <button className="close-btn" onClick={ this.setCloseModal }>
                                                    <i class="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {this.state.openModal4 && (
                                    <div className="modal-overlay">
                                        <div className="modal-container">
                                            <FormX isOpenFormX={ this.state.openModal4 } setCloseModal={ this.setCloseModal } />
                                            <div className="botoes">
                                                <button className="close-btn" onClick={ this.setCloseModal }>
                                                    <i class="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {this.state.openModal5 && (
                                    <div className="modal-overlay">
                                        <div className="modal-container">
                                            <FormX isOpenFormX={ this.state.openModal5 } setCloseModal={ this.setCloseModal } />
                                            <div className="botoes">
                                                <button className="close-btn" onClick={ this.setCloseModal }>
                                                    <i class="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <hr />
                                <div className="ajuda">
                                    <p className="para1">
                                        Precisa de ajuda?<br />
                                        <b><Link to="#">Clique aqui.</Link></b>
                                    </p>
                                    <img src={ ajuda } alt="Ajuda" />
                                    <p className="para2">A Soul está aqui <br />para te ajudar.</p>
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

export default Contabilidade;