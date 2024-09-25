import React from "react";
import { Link } from "react-router-dom";
import Headers from "../Inc/Headers.js";
import carrinho from "../Assets/carrinho.png";
import logoPequeno from "../Assets/logo-pequeno.png";
import rodape from "../Assets/rodape.png";
import "../Styles/Home-gratuito.css";

class HomeGratuito extends React.Component {
    render() {
        return(
            <>
                <body className="bodyGratuito">
                    <div className="pageGratuito" id="page">
                        <Headers />

                        <main className="mainGratuito">
                            <div className="container">
                                <div className="carrinho">
                                    <p className="para1"><b>Comece a vender mais.</b></p>
                                    <img src={ carrinho } alt="Carrinho" />
                                    <p className="para2">Plataforma que te impulsiona.</p>
                                </div> 
                                <hr />
                                <div id="alterar-usuario">
                                    <div>
                                        <Link className="icon" to="#"><i class="fa-regular fa-circle-user"></i></Link>
                                        <p className="email-usuario"><b>Fulano@gmail.com</b></p>
                                        <p className="plano-usuario">Plano Gratuito</p>
                                        <button className="alterar-dados">
                                            <Link to="#" className="btn-alterar">Alterar</Link>
                                        </button>
                                    </div>
                                </div>
                                <div id="resumo-rapido">
                                    <p><b>Resumo Rápido</b></p>
                                    <div id="resumo">
                                        <p>Vendas Resumo</p>
                                        <div className="dados-vendas"></div>
                                    </div>
                                    <div id="resumo">
                                        <p>Estoque</p>
                                        <div className="dados-estoque"></div>
                                    </div>
                                    <div id="resumo">
                                        <p>Vencimento</p>
                                        <div className="dados-vencimento"></div>
                                    </div>
                                </div>
                                <div id ="busca-rapida">
                                    <p><b>Busca Rápida</b></p>
                                    <ul className="lista-menu-rapido">
                                        <li className="menu-rapido"><Link to="#">NOTA FISCAL</Link></li>
                                        <li className="menu-rapido"><Link to="#">LUCROS E AFINS</Link></li>
                                        <li className="menu-rapido"><Link to="#">PEDIDOS E VENDAS</Link></li>
                                        <li className="menu-rapido"><Link to="#">COBRANÇAS DE FORNECIMENTOS</Link></li>
                                        <li className="menu-rapido"><Link to="#">PRODUTOS</Link></li>
                                        <li className="menu-rapido"><Link to="#">CONFERÊNCIA DE ESTOQUE</Link></li>
                                        <li className="menu-rapido"><Link to="#">FORNECEDORES</Link></li>
                                        <li className="menu-rapido"><Link to="#">ORDEM DE SERVIÇOS DE FORNECEDORES</Link></li>
                                    </ul>
                                </div>
                                <div id="acessar-erp">
                                    <div id="acesso-gratuito">
                                        <p className="demonstracao"><b>Demonstração</b></p>
                                        <p className="restante-gratuito">x dias restante <br />Soul</p>
                                    </div>
                                    <div id="acesso-gratuito-cor">    
                                        <div id="logo-acesso">
                                            <img src={ logoPequeno } title="ERP - SOUL" alt="Logotipo" />
                                        </div>
                                        <p><b>Fulano de tal</b></p>
                                        <button className="assinar-erp">
                                            <Link to="/pagamento" className="btn-assinar">Assinar</Link>
                                        </button>
                                        <button className="acessar-erp">
                                            <Link to="/home-erp" className="btn-acessar">Acessar</Link>
                                        </button>
                                    </div>
                                </div>
                                <div id="resumo-vendas">
                                    <p><b>Resumo de vendas</b></p>
                                    <div className="resumo-cor">
                                        <p className="mes-anterior">Mês anterior</p>
                                        <p className="valor-anterior">R$ xxxx,xx</p>
                                        <p className="porcentual-anterior">X%<i class="fa-solid fa-arrow-up"></i></p>
                                        <div className="linha-horizontal"></div>
                                        <p className="mes-atual">Mês atual</p>
                                        <p className="valor-atual">R$ xxxx,xx</p>
                                        <p className="porcentual-atual">X%<i class="fa-solid fa-arrow-up"></i></p>
                                    </div>
                                </div>
                                <hr />
                                <div className="ajuda">
                                    <p className="para1">
                                        Precisa de ajuda? <b><Link to="#">Clique aqui.</Link></b>
                                    </p>
                                    <img src={ rodape } alt="Rodapé" />
                                    <p className="para2">A Soul está aqui para te ajudar.</p>
                                </div>
                            </div>
                        </main>

                        <footer className="footerIndex">
                            <div className="rodape">
                                <div className="sociais">
                                    <div className="social">
                                        <Link to="#">
                                            <p><i className="fa-brands fa-facebook"></i></p>
                                        </Link>
                                    </div>
                                    <div className="social">
                                        <Link to="#">
                                            <p><i className="fa-brands fa-instagram"></i></p>
                                        </Link>
                                    </div>
                                    <div className="social">
                                        <Link to="#">
                                            <p><i className="fa-brands fa-linkedin"></i></p>
                                        </Link>
                                    </div>
                                </div>
                                <br />
                                <div className="texto-rodape">
                                    <Link to="#"><p>Termos de uso</p></Link>
                                    <Link to="#"><p>Política de privacidade</p></Link>
                                    <br />
                                    <p>© 2024, Right Solution, All Rights Reserved</p>
                                </div>
                            </div>
                        </footer>
                    </div>
                </body>
            </>
        );
    }
}

export default HomeGratuito;