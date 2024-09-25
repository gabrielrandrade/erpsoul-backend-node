import React from "react";
import { Link } from "react-router-dom";
import Headers from "../Inc/Headers.js";
import Footers from "../Inc/Footers.js";
import CadastrarVenda from "../Modals/Cadastrar-venda.js";
import RelatoriosVendas from "../Modals/Relatorios-vendas.js";
import carrinho from "../Assets/carrinho.png";
import ajuda from "../Assets/ajuda.png";
import "../Styles/Geral.css";

class Vendas extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openModal: false };
        this.state = { openModal2: false };
    }

    setOpenModal = (isOpenCadastrarVenda) => {
        this.setState({ openModal: isOpenCadastrarVenda });
    }

    setOpenModal2 = (isOpenRelatoriosVendas) => {
        this.setState({ openModal2: isOpenRelatoriosVendas });
    }

    
    setCloseModal = () => {
        this.setState({ openModal: false });
        this.setState({ openModal2: false });
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
                                <h1>VENDAS</h1>
                                <div className="container-modal">
                                    <button className="modal-btn" onClick={ () => this.setOpenModal(true) } id="btnModal">CADASTRAR VENDA</button>
                                    <button className="modal-btn" onClick={ () => this.setOpenModal2(true) } id="btnModal">RELATÓRIOS</button><br />
                                </div>

                                {this.state.openModal && (
                                    <div className="modal-overlay">
                                        <div className="modal-container">
                                            <CadastrarVenda isOpenCadastrarVenda={ this.state.openModal } setCloseModal={ this.setCloseModal } />
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
                                            <RelatoriosVendas isOpenRelatoriosVendas={ this.state.openModal2 } setCloseModal={ this.setCloseModal } />
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

export default Vendas;