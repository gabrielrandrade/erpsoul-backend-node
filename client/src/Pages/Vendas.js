import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Headers from "../Inc/Headers.js";
import Footers from "../Inc/Footers.js";
import CadastrarVenda from "../Modals/Cadastrar-venda.js";
import RelatoriosVendas from "../Modals/Relatorios-vendas.js";
import carrinho from "../Assets/carrinho.png";
import ajuda from "../Assets/ajuda.png";
import "../Styles/Geral.css";
import Swal from "sweetalert2";

export default function Vendas() {
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchUserData = async () => {
            try {
                // let response = await fetch("https://soulerp.srv-tii.com.br/api/private-route", {
                let response = await fetch("http://localhost:5000/api/private-route", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${ token }`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.status === 401) {
                    Swal.fire({
                        title: "Sessão expirou!",
                        text: "Faça o login novamente.",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                    navigate("/", { state: { showLoginModal: true } });
                    return;
                }
            } catch (error) {
                console.error("Erro ao verificar token:", error);
            }
        }

        fetchUserData();
    }, [navigate]);

    const setCloseModal = () => {
        document.getElementsByClassName("modal-overlay")[0].classList.add("zoom-out");

        setTimeout(() => {
            document.body.classList.remove("modal-open");
            setOpenModal(false);
            setOpenModal2(false);
            document.getElementsByClassName("modal-overlay")[0].classList.remove("zoom-out");
        }, 300);
    }

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
                                <button className="modal-btn" onClick={ () => setOpenModal(true) } id="btnModal">
                                    CADASTRAR VENDA
                                </button>
                                <button className="modal-btn" onClick={ () => setOpenModal2(true) } id="btnModal">
                                    RELATÓRIOS
                                </button><br />
                            </div>

                            {openModal && (
                                <div className="modal-overlay">
                                    <div className="modal-container">
                                        <CadastrarVenda
                                            isOpenCadastrarVenda={ openModal }
                                            setCloseModal={ setCloseModal }
                                        />
                                        <div className="botoes">
                                            <button className="close-btn" onClick={ setCloseModal }>
                                                <i class="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {openModal2 && (
                                <div className="modal-overlay">
                                    <div className="modal-container">
                                        <RelatoriosVendas
                                            isOpenRelatoriosVendas={ openModal2 }
                                            setCloseModal={ setCloseModal }
                                        />
                                        <div className="botoes">
                                            <button className="close-btn" onClick={ setCloseModal }>
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