import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Headers from "../Inc/Headers.js";
import carrinho from "../Assets/carrinho.png";
import logoPequeno from "../Assets/logo-pequeno.png";
import rodape from "../Assets/rodape.png";
import "../Styles/Home-gratuito.css";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HomeGratuito() {
    const [clientes, setClientes] = useState([]);
    const [services, setServices] = useState([]);
    const [user, setUser] = useState({ nome: "", email: "" });
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.remove("modal-open");
    
        const token = localStorage.getItem("token");
    
        const fetchData = async () => {
            try {
                // const userResponse = await fetch("https://soulerp.srv-tii.com.br/api/home", {
                const userResponse = await fetch("http://localhost:5000/api/home", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${ token }`,
                        "Content-Type": "application/json"
                    }
                });
    
                if (userResponse.status === 401) {
                    Swal.fire({
                        title: "Sessão expirou!",
                        text: "Faça o login novamente.",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });

                    navigate("/", { state: { showLoginModal: true } });
                    return;
                }
    
                if (userResponse.mensagem === "Usuário não encontrado!") {
                    return setUser("Usuário não encontrado!");
                }
    
                const userData = await userResponse.json();
                setUser(userData);
    
                const [clientesResponse, servicesResponse] = await Promise.all([
                    // fetch("https://soulerp.srv-tii.com.br/api/crm/clientsRegistered", {
                    fetch("http://localhost:5000/api/crm/clientsRegistered", {
                        method: "GET",
                        headers: { "Authorization": `Bearer ${ token }` }
                    }),
                    // fetch("https://soulerp.srv-tii.com.br/api/service/servicesRegistered", {
                    fetch("http://localhost:5000/api/service/servicesRegistered", {
                        method: "GET",
                        headers: { "Authorization": `Bearer ${ token }` }
                    })
                ]);
    
                const clientesData = await clientesResponse.json();
                const servicesData = await servicesResponse.json();
    
                setClientes(clientesData.length === 0 ? [] : clientesData);
                setServices(servicesData.length === 0 ? [] : servicesData);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }
    
        fetchData();
    
        AOS.init();
    }, [navigate]);
    
    return(
        <>
            <body className="bodyGratuito">
                <div className="pageGratuito" id="page">
                    <Headers />

                    <main className="mainGratuito">
                        <div className="container">
                            <div className="carrinho">
                                <p className="para1" data-aos="fade-right"><b>Comece a vender mais.</b></p>
                                <img src={ carrinho } alt="Carrinho" />
                                <p className="para2" data-aos="fade-left">Plataforma que te impulsiona.</p>
                            </div> 
                            <hr />
                            <div id="alterar-usuario" data-aos="fade-right">
                                <div>
                                    <Link className="icon" to="#"><i class="fa-regular fa-circle-user"></i></Link>
                                    <p><b>{ user.nome }</b></p>
                                    <p className="email-usuario">{ user.email }</p>
                                    <button className="alterar-dados">
                                        <Link to="#" className="btn-alterar">Alterar</Link>
                                    </button>
                                </div>
                            </div>
                            <div id="resumo-rapido" data-aos="fade-left">
                                <p><b>Resumo Rápido</b></p>
                                <div id="resumo">
                                    <p>Clientes</p>
                                    <div className="dados-resumo">
                                        {clientes.length === 0 ? (
                                            <tr>
                                                Não há clientes cadastrados.
                                            </tr>
                                        ) : (
                                            clientes.map((cliente, index) => (
                                                <tr key={ index }>
                                                    { cliente.nome }
                                                </tr>
                                            )) 
                                        )}
                                    </div>
                                </div>
                                <div id="resumo">
                                    <p>Serviços</p>
                                    <div className="dados-resumo">
                                        {services.length === 0 ? (
                                            <tr>
                                                Não há serviços cadastrados.
                                            </tr>
                                        ) : (
                                            services.map((service, index) => (
                                                <tr key={ index }>
                                                    { service.servico }
                                                </tr>
                                            )) 
                                        )}
                                    </div>
                                </div>
                                <div id="resumo">
                                    <p>Estoque</p>
                                    <div className="dados-resumo">
                                        {/* {estoque.length === 0 ? ( */}
                                            <tr>
                                                Não há itens no estoque.
                                            </tr>
                                        {/* ) : (
                                            estoque.map((produto, index) => (
                                                <tr key={ index }>
                                                    { produto.nome }
                                                </tr>
                                            )) 
                                        )} */}
                                    </div>
                                </div>
                            </div>
                            <div id ="busca-rapida" data-aos="fade-right">
                                <p><b>Busca Rápida</b></p>
                                <ul className="lista-menu-rapido">
                                    <li className="menu-rapido"><Link to="/crm">CRM</Link></li>
                                    <li className="menu-rapido"><Link to="/vendas">VENDAS E NF's</Link></li>
                                    <li className="menu-rapido"><Link to="/servicos">SERVIÇOS</Link></li>
                                    <li className="menu-rapido"><Link to="/financas">FINANÇAS</Link></li>
                                    <li className="menu-rapido"><Link to="/estoque">ESTOQUE</Link></li>
                                    <li className="menu-rapido"><Link to="/contabilidade">CONTABILIDADE</Link></li>
                                </ul>
                            </div>
                            <div id="acessar-erp" data-aos="fade-right">
                                <div id="acesso-gratuito">
                                    <p className="restante-gratuito">30 dias restantes na Soul</p>
                                </div>
                                <div id="acesso-gratuito-cor">    
                                    <div id="logo-acesso">
                                        <img src={ logoPequeno } title="ERP - SOUL" alt="Logotipo" />
                                    </div>
                                    <p className="plano-usuario"><b>Plano Gratuito</b></p>
                                    <button className="assinar-erp">
                                        <Link to="/pagamento" className="btn-assinar">Assinar</Link>
                                    </button>
                                    <button className="acessar-erp">
                                        <Link to="/home-erp" className="btn-acessar">Acessar</Link>
                                    </button>
                                </div>
                            </div>
                            <div id="resumo-vendas" data-aos="fade-left">
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
                                <p className="para1" data-aos="fade-right">
                                    Precisa de ajuda? <b><Link to="#">Clique aqui.</Link></b>
                                </p>
                                <img src={ rodape } alt="Rodapé" />
                                <p className="para2" data-aos="fade-left">A Soul está aqui para te ajudar.</p>
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