import React from "react";
import { Link } from "react-router-dom";
import Headers from "../Inc/Headers.js";
import crm from "../Assets/crm.png";
import vendas from "../Assets/vendas.png";
import servicos from "../Assets/servicos.png";
import financas from "../Assets/financas.png";
import estoque from "../Assets/estoque.png";
import contab from "../Assets/contab.png";
import ajuda from "../Assets/ajuda.png";
import "../Styles/Home-erp.css";

class HomeERP extends React.Component {
    render() {
        return(
            <>
                <body className="bodyGeral">
                    <div className="pageGeral" id="page">
                        <Headers />

                        <main className="mainGeral">
                            <div className="pai">
                                <div className="boxes">
                                    <div className="box">
                                        <Link to="/crm" className="links">
                                            <img src={ crm } alt="CRM" />
                                            <p>CRM</p>
                                        </Link>
                                    </div>
                                    <div className="box">
                                        <Link to="/vendas" className="links">
                                            <img src={ vendas } alt="VENDAS E NF's" />
                                            <p>VENDAS E NF's</p>
                                        </Link>
                                    </div>
                                    <div className="box">
                                        <Link to="/servicos" className="links">
                                            <img src={ servicos } alt="SERVIÇOS" />
                                            <p>SERVIÇOS</p>
                                        </Link>
                                    </div>
                                    <div className="box">
                                        <Link to="/financas" className="links">
                                            <img src={ financas } alt="FINANÇAS" />
                                            <p>FINANÇAS</p>
                                        </Link>
                                    </div>
                                    <div className="box">
                                        <Link to="/estoque" className="links">
                                            <img src={ estoque } alt="ESTOQUE" />
                                            <p>ESTOQUE</p>
                                        </Link>
                                    </div>
                                    <div className="box">
                                        <Link to="/contabilidade" className="links">
                                            <img src={ contab } alt="CONTABILIDADE" />
                                            <p>CONTABILIDADE</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="ajuda">
                                <p className="para1">
                                    Precisa de ajuda?<br />
                                    <b><Link to="#">Clique aqui.</Link></b>
                                </p>
                                <img src={ ajuda } alt="Ajuda" />
                                <p className="para2">A Soul está aqui <br />para te ajudar.</p>
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

export default HomeERP;