import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../Assets/logo.png";

function Headers() {    
    const navigate = useNavigate();

    const handleLogout = () => {
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
                        navigate("/", { state: { showLoginModal: true } });
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

    const styles = {
        headerGeral: {
            width: "100%",
            height: "125px",
            display: "flex",
            alignItems: "center",
            position: "relative",
            backgroundColor: "var(--bc)"
        },

        logo: {
            left: "50%",
            position: "absolute",
            transform: "translateX(-50%)"
        },

        navBar: { marginLeft: "auto" },

        navBarUl: {
            display: "flex",
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

    return(
        <>
            <header style={ styles.headerGeral }>
                <div style={ styles.logo }>
                    <Link to="/home-erp">
                        <img src={ logo } alt="logotipo" title="ERP - SOUL" />
                    </Link>
                </div>
                <div style={ styles.navBar }>
                    <ul style={ styles.navBarUl }>
                        <li style={ styles.navBarUlLi } onClick={ handleLogout }>
                            <i className="fa-solid fa-right-from-bracket" title="Desconectar" />
                        </li>
                        <li style={ styles.navBarUlLi }>
                            <i className="fa-solid fa-gear" title="Configurações" />
                        </li>
                    </ul>
                </div>
            </header>
        </>
    );
}

export default Headers;