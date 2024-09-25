import React from "react";
import { Link } from "react-router-dom";
import Headers from "../Inc/Headers.js";
import Footers from "../Inc/Footers.js";
import Contas from "../Modals/Contas.js";
import BaixarContas from "../Modals/Baixar-contas.js";
import GerarNF from "../Modals/Gerar-nota-fiscal.js";
import Integracoes from "../Modals/Integracoes.js";
import carrinho from "../Assets/carrinho.png";
import ajuda from "../Assets/ajuda.png";
import "../Styles/Geral.css";

class Financas extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openModal: false };
        this.state = { openModal2: false };
        this.state = { openModal3: false };
        this.state = { openModal4: false };
    }
    
    setOpenModal = (isOpenContas) => {
        this.setState({ openModal: isOpenContas });
    }

    setOpenModal2 = (isOpenBaixarContas) => {
        this.setState({ openModal2: isOpenBaixarContas });
    }

    setOpenModal3 = (isOpenGerarNF) => {
        this.setState({ openModal3: isOpenGerarNF });
    }

    setOpenModal4 = (isOpenIntegracoes) => {
        this.setState({ openModal4: isOpenIntegracoes });
    }

    setCloseModal = () => {
        this.setState({ openModal: false });
        this.setState({ openModal2: false });
        this.setState({ openModal3: false });
        this.setState({ openModal4: false });
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
                                <h1>FINANÇAS</h1>
                                <div className="container-modal">
                                    <button className="modal-btn" onClick={ () => this.setOpenModal(true) } id="btnModal">CONTAS</button><br />
                                    <button className="modal-btn" onClick={ () => this.setOpenModal2(true) } id="btnModal">BAIXAR CONTAS</button><br />
                                    <button className="modal-btn" onClick={ () => this.setOpenModal3(true) } id="btnModal">GERAR NF</button><br />
                                    <button className="modal-btn" onClick={ () => this.setOpenModal4(true) } id="btn-importar-nfs">IMPORTAR NFS</button><br />
                                </div>

                                {this.state.openModal && (
                                    <div className="modal-overlay">
                                        <div className="modal-container">
                                            <Contas isOpenContas={ this.state.openModal } setCloseModal={ this.setCloseModal } />
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
                                            <BaixarContas isOpenBaixarContas={ this.state.openModal2 } setCloseModal={ this.setCloseModal } />
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
                                            <GerarNF isOpenGerarNF={ this.state.openModal3 } setCloseModal={ this.setCloseModal } />
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
                                            <Integracoes isOpenIntegracoes={ this.state.openModal4 } setCloseModal={ this.setCloseModal } />
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

export default Financas;