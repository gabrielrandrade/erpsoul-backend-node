import React from "react";
import { Link } from "react-router-dom";
import Headers from "../Inc/Headers.js";
import Footers from "../Inc/Footers.js";
import CadastrarContador from "../Modals/Cadastrar-contador.js";
import CadastrarProduto from "../Modals/Cadastrar-produto.js";
import PlanoContas from "../Modals/Plano-contas.js";
import RelatoriosEstoque from "../Modals/Relatorios-estoque.js";
import carrinho from "../Assets/carrinho.png";
import ajuda from "../Assets/ajuda.png";
import "../Styles/Geral.css";

class Estoque extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openModal: false };
        this.state = { openModal2: false };
        this.state = { openModal3: false };
        this.state = { openModal4: false };
    }
    
    setOpenModal = (isOpenCadastrarContador) => {
        this.setState({ openModal: isOpenCadastrarContador });
    }

    setOpenModal2 = (isOpenCadastrarProduto) => {
        this.setState({ openModal2: isOpenCadastrarProduto });
    }

    setOpenModal3 = (isOpenPlanoContas) => {
        this.setState({ openModal3: isOpenPlanoContas });
    }
    
    setOpenModal4 = (isOpenRelatoriosEstoque) => {
        this.setState({ openModal4: isOpenRelatoriosEstoque });
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
                            <div class="central">
                                <h1>ESTOQUE</h1>
                                <div className="container-modal">
                                    <button className="modal-btn" onClick={ () => this.setOpenModal(true) } id="btn-cadastrar-fornecedores">CADASTRAR FORNECEDORES</button><br />
                                    <button className="modal-btn" onClick={ () => this.setOpenModal2(true) } id="btnModal">CADASTRAR PRODUTOS</button><br />
                                    <button className="modal-btn" onClick={ () => this.setOpenModal3(true) } id="btn-cadastrar-reabastecimento">CADASTRAR REABASTECIMENTO</button><br />
                                    <button className="modal-btn" onClick={ () => this.setOpenModal4(true) } id="btn-relatorios-estoque">RELATÓRIOS</button><br />
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
                                            <CadastrarProduto isOpenCadastrarProduto={ this.state.openModal2 } setCloseModal={ this.setCloseModal } />
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
                                            <PlanoContas isOpenPlanoContas={ this.state.openModal3 } setCloseModal={ this.setCloseModal } />
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
                                            <RelatoriosEstoque isOpenRelatoriosEstoque={ this.state.openModal4 } setCloseModal={ this.setCloseModal } />
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

export default Estoque;