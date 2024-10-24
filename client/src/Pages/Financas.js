import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Headers from "../Inc/Headers.js";
import Footers from "../Inc/Footers.js";
import Contas from "../Modals/Contas.js";
import BaixarContas from "../Modals/Baixar-contas.js";
import GerarNF from "../Modals/Gerar-nota-fiscal.js";
import Integracoes from "../Modals/Integracoes.js";
import carrinho from "../Assets/carrinho.png";
import ajuda from "../Assets/ajuda.png";
import "../Styles/Geral.css";
import Swal from "sweetalert2";

export default function Financas() {
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [openModal3, setOpenModal3] = useState(false);
    const [openModal4, setOpenModal4] = useState(false);

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
            setOpenModal3(false);
            setOpenModal4(false);
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
                            <h1>FINANÇAS</h1>
                            <div className="container-modal">
                                <button
                                    className="modal-btn"
                                    onClick={ () => setOpenModal(true) }
                                    id="btnModal"
                                >
                                    CONTAS
                                </button><br />
                                <button
                                    className="modal-btn"
                                    onClick={ () => setOpenModal2(true) }
                                    id="btnModal"
                                >
                                    BAIXAR CONTAS
                                </button><br />
                                <button
                                    className="modal-btn"
                                    onClick={ () => setOpenModal3(true) }
                                    id="btnModal"
                                >
                                    GERAR NF
                                </button><br />
                                <button
                                    className="modal-btn"
                                    onClick={ () => setOpenModal4(true) }
                                    id="btn-importar-nfs"
                                >
                                    IMPORTAR NFS
                                </button><br />
                            </div>

                            {openModal && (
                                <div className="modal-overlay">
                                    <div className="modal-container">
                                        <Contas
                                            isOpenContas={ openModal }
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
                                        <BaixarContas
                                            isOpenBaixarContas={ openModal2 }
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
                            {openModal3 && (
                                <div className="modal-overlay">
                                    <div className="modal-container">
                                        <GerarNF
                                            isOpenGerarNF={ openModal3 }
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
                            {openModal4 && (
                                <div className="modal-overlay">
                                    <div className="modal-container">
                                        <Integracoes
                                            isOpenIntegracoes={ openModal4 }
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