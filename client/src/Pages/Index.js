import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../Assets/logo.png";
import TesteGratis from "../Modals/Teste-gratis.js";
import Login from "../Modals/Login.js";
import imgBox1 from "../Assets/img-box1.png";
import imgBox2 from "../Assets/img-box2.png";
import imgBox3 from "../Assets/img-box3.png";
import caixa1 from "../Assets/caixa1.png";
import caixa2 from "../Assets/caixa2.png";
import caixa3 from "../Assets/caixa3.png";
import caixa4 from "../Assets/caixa4.png";
import caixa5 from "../Assets/caixa5.png";
import caixa6 from "../Assets/caixa6.png";
import caixa7 from "../Assets/caixa7.png";
import caixa8 from "../Assets/caixa8.png";
import "../Styles/Index.css";
import AOS from "aos";
import "aos/dist/aos.css";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            openModal: false,
            openModal2: false,
            itsLoggedIn: false
        };
    }
    
    setOpenModal = (isOpenLogin) => {
        this.setState({ openModal: isOpenLogin });
    }

    setOpenModal2 = (isOpenTesteGratis) => {
        this.setState({ openModal2: isOpenTesteGratis });
    }

    setCloseModal = () => {
        document.getElementsByClassName("modal-overlay-index")[0].classList.add("zoom-out");

        setTimeout(() => {
            document.body.classList.remove("modal-open");
            this.setState({ openModal: false });
            this.setState({ openModal2: false });
            document.getElementsByClassName("modal-overlay-index")[0].classList.remove("zoom-out");
        }, 300);
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        if (token) {
            this.setState({ isLoggedIn: true });
        } else {
            this.setState({ isLoggedIn: false });
        }

        const { state } = this.props.location;
        if (state && state.showLoginModal) {
            this.setOpenModal(true);
            this.setState({ isLoggedIn: false });
        }
    }

    linkToHome = () => {
        const navigate = this.props.navigate;
        navigate("/home-gratuito");
    }

    handleLogout = () => {
        Swal.fire({
            title: "Deseja sair?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00968F",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("token");
                // fetch("https://soulerp.srv-tii.com.br/api/user/logout", {
                fetch("http://localhost:5000/api/user/logout", {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${ token }`,
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.mensagem === "Usuário desconectado com sucesso!") {
                        localStorage.removeItem("token");
                        this.setState({ isLoggedIn: false });
                        this.setOpenModal(true);
                    } else {
                        Swal.fire({
                            title: "Erro!",
                            text: "Não foi possível desconectar.",
                            icon: "error",
                            confirmButtonColor: "#00968F"
                        });
                    }
                })
                .catch((error) => console.error("Erro ao desconectar cliente:", error));
            }
        });   
    }

    render() {
        const styles = {
            navBarUl: {
                display: "flex",
                justifyContent: "flex-end",
                listStyle: "none",
                color: "var(--fc-paragraphs)",
                fontSize: "var(--fs-paragraphs)"
            },
    
            navBarUlLi: {
                paddingLeft: "10px",
                cursor: "pointer",
                zIndex: 10
            }
        }

        AOS.init();

        return(
                <>
                    <body className="bodyIndex">
                        <div className="pageIndex" id="page">
                            <header className="headerIndex">
                                <div className="logo">
                                  <Link to="/">
                                      <img src={ logo } alt="logotipo" title="ERP - SOUL" />
                                  </Link>
                                </div>
                                <div className="nav-bar">
                                  <ul>
                                      <a href="#funcionalidades">
                                          <li>Funcionalidades</li>
                                      </a>
                                      <a href="#planosPrecos">
                                          <li>Planos e Preços</li>
                                      </a>
                                      <a href="#faleConosco">
                                          <li>Fale Conosco</li>
                                      </a>
                                  </ul>
                                </div>
                                <div className="container-modal-index">
                                    {this.state.isLoggedIn ? (
                                        <>
                                            <ul style={ styles.navBarUl }>
                                                <li style={ styles.navBarUlLi } onClick= { this.linkToHome }>
                                                    <i class="fa-regular fa-circle-user" title="Home" />
                                                </li>
                                                <li style={ styles.navBarUlLi } onClick={ this.handleLogout }>
                                                    <i className="fa-solid fa-right-from-bracket" title="Desconectar" />
                                                </li>
                                                <li style={ styles.navBarUlLi }>
                                                    <i className="fa-solid fa-gear" title="Configurações" />
                                                </li>
                                            </ul>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="modal-btn-index"
                                                onClick={ () => this.setOpenModal2(true) }
                                            >
                                                TESTE GRÁTIS
                                            </button>
                                            <button
                                                className="modal-btn-index"
                                                onClick={ () => this.setOpenModal(true) }
                                            >
                                                <i className="fa-solid fa-user" /> ENTRAR
                                            </button>
                                        </>
                                    )}
                                </div>
                                
                                {this.state.openModal && (
                                    <div className="modal-overlay-index">
                                        <div className="modal-container-index">
                                            <Login
                                                isOpenLogin={ this.state.openModal }
                                                setCloseModal={ this.setCloseModal }
                                            />
                                            <div className="botoes">
                                                <button className="close-btn-index" onClick={ this.setCloseModal }>
                                                    <i className="fa-solid fa-xmark" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {this.state.openModal2 && (
                                    <div className="modal-overlay-index">
                                        <div className="modal-container-index">
                                            <TesteGratis
                                                isOpenTesteGratis={ this.state.openModal2 }
                                                setCloseModal={ this.setCloseModal }
                                            />
                                            <div className="botoes">
                                                <button className="close-btn-index" onClick={ this.setCloseModal }>
                                                    <i className="fa-solid fa-xmark" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </header>

                            <main className="mainIndex">
                                <div className="box1" data-aos="fade-left">
                                    <div className="text-box1">
                                        <p>
                                            A <b style={{ color: "#00968F" }}>Soul</b> é um sistema de gestão <br />
                                            100% <b style={{ color: "#00968F" }}>on-line</b><br />
                                            que <b style={{ color: "#00968F" }}>descomplica</b> seu e-commerce.
                                        </p>
                                    </div>
                                    <div className="img-box1">
                                        <img src={ imgBox1 } alt="Imagem sobre sistema de gestão" />
                                    </div>
                                </div>
                                <div className="box2" data-aos="fade-right">
                                    <div className="img-box2">
                                        <img src={ imgBox2 } alt="Imagem sobre plataforma de e-commerce" />
                                    </div>
                                    <div className="text-box2">
                                        <p>
                                            <b style={{ color: "#00FFF4" }}>Integração</b> com plataformas de <br />
                                            e-commerce e marketplaces de forma <br />
                                            <b style={{ color: "#00FFF4" }}>fácil</b> e <b style={{ color: "#00FFF4" }}>rápida</b>
                                        </p>
                                    </div>
                                </div>
                                <div className="box3" data-aos="fade-left">
                                    <div className="text-box3">
                                        <p>
                                            Gestão de Estoque como você nunca viu!<br />
                                            <b style={{ color: "#050538" }}>Cadastro</b> de seus fornecedores, <br />
                                            emissão dos <b style={{ color: "#050538" }}>relatórios</b> de estoque, <br /> 
                                            <b style={{ color: "#050538" }}>controle</b> de suas compras e muito mais!
                                        </p>
                                    </div>
                                    <div className="img-box3">
                                        <img src={ imgBox3 } alt="Imagem sobre gestão de estoque" />
                                    </div>
                                </div>
                                <div className="box4" id="funcionalidades" data-aos="fade-up">
                                    <p>Conheça tudo que a <b style={{ color: "#00968F" }}>Soul</b> faz por você</p>
                                    <div className="caixas">
                                        <div className="caixa">
                                            <img src={ caixa5 } alt="Imagem sobre tarefas concluídas" />
                                            <p>100% online, segura e descomplica</p>
                                        </div>
                                        <div className="caixa">
                                            <img src={ caixa2 } alt="Imagem sobre planejamentos" />
                                            <p>Planejamento de fundo de caixa e análises financeiras completas</p>
                                        </div>
                                        <div className="caixa">
                                            <img src={ caixa3 } alt="Imagem sobre monitoramento de capital" />
                                            <p>Monitoramento de vendas e metas</p>
                                        </div>
                                        <div className="caixa">
                                            <img src={ caixa4 } alt="Imagem sobre histórico de vendas" />
                                            <p>Visualização do histórico de vendas, clientes e produtos</p>
                                        </div>
                                        <div className="caixa">
                                            <img src={ caixa1 } alt="Imagem sobre gestão de negócios" />
                                            <p>Gestão de Negócios centralizada para organização de processos operacionais.</p>
                                        </div>
                                        <div className="caixa">
                                            <img src={ caixa6 } alt="Imagem sobre automatização de compras e vendas" />
                                            <p>Automatização de compras e vendas, mantendo o giro de estoque atualizado</p>
                                        </div>
                                        <div className="caixa">
                                            <img src={ caixa7 } alt="Imagem sobre avaliação de relevância" />
                                            <p>
                                                Avaliação de relevância de cada produto com relatórios baseados em lucro/prejuízo, compras/vendas.
                                            </p>
                                        </div>
                                        <div className="caixa">
                                            <img src={ caixa8 } alt="Imagem sobre facilidade das negociações" />
                                            <p>Facilidade na visão das negociações</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="box5" id="planosPrecos" data-aos="fade-up">
                                    <p>Planos e Preços</p>
                                    <div className="plano">
                                        <h2><i className="fa-regular fa-gem" /> Plano Diamante - Anual</h2>
                                        <p>10% OFF</p>
                                        <br />
                                        <div className="lista">
                                            <ul>
                                                <li><i className="fa-solid fa-check" /> R$ xxx,xxx</li>
                                                <li><i className="fa-solid fa-check" /> VENDAS</li>
                                                <li><i className="fa-solid fa-check" /> ESTOQUE</li>
                                                <li><i className="fa-solid fa-check" /> NOTA FISCAL</li>
                                                <li><i className="fa-solid fa-check" /> SERVIÇOS</li>
                                                <li><i className="fa-solid fa-check" /> SUPORTE</li>
                                                <li><i className="fa-solid fa-check" /> COBRANÇAS</li>
                                                <li><i className="fa-solid fa-check" /> FORNECEDORES</li>
                                            </ul>
                                            <button className="btn-login" onClick={ () => this.setOpenModal2(true) } id="loginBtn">
                                                TESTE GRÁTIS
                                            </button>
                                        </div>
                                    </div>
                                    <div className="plano">
                                        <h2><i className="fa-regular fa-gem" /> Plano Diamante - Mensal</h2>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <div className="lista">
                                            <ul>
                                                <li className="lista-valor"><i className="fa-solid fa-check" /> R$ xxx,xxx</li>
                                                <li><i className="fa-solid fa-check" /> VENDAS</li>
                                                <li><i className="fa-solid fa-check" /> ESTOQUE</li>
                                                <li><i className="fa-solid fa-check" /> NOTA FISCAL</li>
                                                <li><i className="fa-solid fa-check" /> SERVIÇOS</li>
                                                <li><i className="fa-solid fa-check" /> SUPORTE</li>
                                                <li><i className="fa-solid fa-check" /> COBRANÇAS</li>
                                                <li><i className="fa-solid fa-check" /> FORNECEDORES</li>
                                            </ul>
                                            <button className="btn-login" onClick={ () => this.setOpenModal2(true) } id="loginBtn">
                                                TESTE GRÁTIS
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="box6" id="faleConosco" data-aos="fade-up">
                                    <p className="ctt">Entre em Contato</p>
                                    <div className="contato">
                                        <div className="central-suporte">
                                            <p className="titulo"><b>É nosso cliente e está precisando de ajuda?</b></p>
                                            <br />
                                            <p><i className="fa-solid fa-book" /> <b>Central de ajuda</b></p>
                                            <button className="btn-login" id="loginBtn">
                                                CONSULTAR MANUAIS
                                            </button>
                                        </div>
                                        <div className="central-suporte">
                                            <p><i className="fa-solid fa-phone" /> <b>Suporte</b></p>
                                            <p>+55 11 99999-9999</p>
                                            <p className="subtitulo">Horário de atendimento: das 8h às 20h</p>
                                            <button className="btn-login" id="loginBtn">
                                                CONSULTAR MANUAIS
                                            </button>
                                        </div>
                                    </div>
                                    <div className="contato">
                                        <div className="central-suporte">
                                            <p className="titulo"><b>Ainda não é nosso cliente?</b></p>
                                            <p className="subtitulo">Fale com nossa equipe comercial.</p>
                                            <br />
                                            <p className="email-central-suporte">
                                                <i className="fa-solid fa-envelope-open-text" /> <b>E-mail</b>
                                            </p>
                                            <p>soul-erp@soul.com.br</p>
                                        </div>
                                        <div className="central-suporte">
                                            <p className="tel-central-suporte">
                                                <i className="fa-solid fa-phone" /> <b>Telefone</b>
                                            </p>
                                            <p>+55 11 88888-8888</p>
                                            <p className="subtitulo" id="hora-central-suporte">
                                                Horário de atendimento: das 8h às 17h
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </main>
                            
                            <footer className="footerIndex">
                                <div className="rodape">
                                    <div className="sociais">
                                        <div className="social">
                                            <Link to="#">
                                                <p><i className="fa-brands fa-facebook" /></p>
                                            </Link>
                                        </div>
                                        <div className="social">
                                            <Link to="#">
                                                <p><i className="fa-brands fa-instagram" /></p>
                                            </Link>
                                        </div>
                                        <div className="social">
                                            <Link to="#">
                                                <p><i className="fa-brands fa-linkedin" /></p>
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

export default function IndexWithLocation(props) {
    const location = useLocation();
    const navigate = useNavigate();
    return <Index {...props} location={ location } navigate={ navigate } />;
}