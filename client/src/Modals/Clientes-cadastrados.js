import React, { useEffect, useState } from "react";
import mask from "../Inc/MaskCpfCnpj.js";
import Swal from "sweetalert2";

export default function ClientesCadastrados({ isOpenClientesCadastrados, setCloseModal }) {
    const [clientes, setClientes] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [editandoDados, setEditandoDados] = useState({ nome: "", cpfOuCnpj: "" });

    useEffect(() => {
        if (isOpenClientesCadastrados) {
            const token = localStorage.getItem("token");

            // fetch("https://soulerp.srv-tii.com.br/api/crm/clientsRegistered", {
            fetch("http://localhost:5000/api/crm/clientsRegistered", {
                method: "GET",
                headers: { "Authorization": `Bearer ${ token }` }
            })
            .then((response) => response.json())
            .then((data) => {
                setClientes(data.length === 0 ? [] : data);
            })
            .catch((error) => console.error("Erro ao buscar dados:", error));
        }
    }, [isOpenClientesCadastrados]);

    const formatCpfCnpj = (cpfOuCnpj) => { return mask(cpfOuCnpj) }

    const startEdit = (cliente) => {
        setEditandoId(cliente.id_cliente);
        const cpfOuCnpj = formatCpfCnpj(cliente.cpf || cliente.cnpj);
        setEditandoDados({ nome: cliente.nome, cpfOuCnpj });
    }

    const cancelEdit = () => {
        setEditandoId(null);
        setEditandoDados({ nome: "", cpfOuCnpj: "" });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "cpfOuCnpj") {
            const valorMascarado = mask(value);
            setEditandoDados({
                ...editandoDados,
                [name]: valorMascarado
            });
        } else {
            setEditandoDados({
                ...editandoDados,
                [name]: value
            });
        }
    }

    const saveEdit = (id_cliente) => {
       editandoDados.cpfOuCnpj = editandoDados.cpfOuCnpj.replace(/\D/g, "");

       const { nome, cpfOuCnpj } = editandoDados;

        if (!nome || !cpfOuCnpj) {
            Swal.fire({
                title: "Erro!",
                text: "Os campos não podem ficar vazios!",
                icon: "error",
                confirmButtonColor: "#00968F"
            });
        } else if (nome.length > 50 || nome.length < 1) {
            Swal.fire({
                title: "Nome inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else if (cpfOuCnpj.length < 11   ||
                   cpfOuCnpj.length > 14   ||
                   cpfOuCnpj.length === 12 ||
                   cpfOuCnpj.length === 13
        ) {
            Swal.fire({
                title: "CPF ou CNPJ inválido!",
                color: "#050538",
                confirmButtonColor: "#00968F"
            });
        } else {
            // fetch(`https://soulerp.srv-tii.com.br/api/crm/clientsRegistered/${ id_cliente }/edit`, {
            fetch(`http://localhost:5000/api/crm/clientsRegistered/${ id_cliente }/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editandoDados)
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.mensagem === "Os campos não podem ficar vazios!") {
                    Swal.fire({
                        title: "Erro!",
                        text: "Os campos não podem ficar vazios!",
                        icon: "error",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "Nome inválido!") {
                    Swal.fire({
                        title: "Nome inválido!",
                        color: "#050538",
                        confirmButtonColor: "#00968F"
                    });
                } else if (data.mensagem === "CPF ou CNPJ inválido!") {
                    Swal.fire({
                    title: "CPF ou CNPJ inválido!",
                    color: "#050538",
                    confirmButtonColor: "#00968F"
                });
                } else if (data.mensagem === "Cliente atualizado com sucesso!") {
                    Swal.fire({
                        title: "Sucesso!",
                        text: "O cliente foi atualizado com sucesso.",
                        icon: "success",
                        confirmButtonColor: "#00968F"
                    });

                    setClientes(clientes.map(cliente => 
                        cliente.id_cliente === id_cliente ? { 
                            ...cliente, 
                            nome: editandoDados.nome, 
                            cpf: editandoDados.cpfOuCnpj 
                        } : cliente
                    ));
                    
                    cancelEdit();
                } else {
                    Swal.fire({
                        title: "Erro!",
                        text: "Não foi possível atualizar o cliente.",
                        icon: "error",
                        confirmButtonColor: "#00968F"
                    });
                }
            })
            .catch((error) => console.error("Erro ao atualizar cliente:", error));
        }
    }

    const updateToInactive = (id_cliente) => {
        Swal.fire({
            title: "Tem certeza?",
            text: "Esta ação excluirá o cliente!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00968F",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        })
        .then((result) => {
            if (result.isConfirmed) {
                // fetch(`https://soulerp.srv-tii.com.br/api/crm/clientsRegistered/${ id_cliente }/delete`, {
                fetch(`http://localhost:5000/api/crm/clientsRegistered/${ id_cliente }/delete`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.mensagem === "Cliente excluído com sucesso!") {
                        Swal.fire({
                            title: "Excluído!",
                            text: "O cliente foi excluído com sucesso.",
                            icon: "success",
                            confirmButtonColor: "#00968F"
                        });

                        setClientes(clientes.filter(cliente => cliente.id_cliente !== id_cliente));
                    } else {
                        Swal.fire({
                            title: "Erro!",
                            text: "Não foi possível excluir o cliente.",
                            icon: "error",
                            confirmButtonColor: "#00968F"
                        });
                    }
                })
                .catch((error) => console.error("Erro ao excluir cliente:", error));
            }
        });
    }

    if (isOpenClientesCadastrados) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>CLIENTES CADASTRADOS</h1>
                    <br />
                    <div className="rel-clientes">
                        <table id="table-rel-clientes">
                            <tr>
                                <th>N° Cliente</th>
                                <th>Nome</th>
                                <th>CPF/CNPJ</th>
                            </tr>

                            {clientes.length === 0 ? (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: "center" }}>
                                        Não há clientes cadastrados.
                                    </td>
                                </tr>
                            ) : (
                                clientes.map((cliente, index) => (
                                    <tr key={ index }>
                                        <td>{ cliente.id_cliente }</td>
                                        {editandoId === cliente.id_cliente ? (
                                            <>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="nome"
                                                        name="nome"
                                                        value={ editandoDados.nome }
                                                        maxLength={ 50 }
                                                        required
                                                        onChange={ handleInputChange }
                                                        style={{
                                                            height: "25px",
                                                            color: "#040438"
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <input 
                                                        type="text"
                                                        id="cpfOuCnpj"
                                                        name="cpfOuCnpj" 
                                                        minLength={ 14 }
                                                        maxLength={ 18 }
                                                        value={ editandoDados.cpfOuCnpj } 
                                                        onChange={ handleInputChange }
                                                        required
                                                        style={{
                                                            height: "25px",
                                                            color: "#040438"
                                                        }}
                                                    />
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{ cliente.nome }</td>
                                                <td>{ formatCpfCnpj(cliente.cpf || cliente.cnpj) }</td>
                                            </>
                                        )}
                                        {editandoId === cliente.id_cliente ? (
                                            <>
                                                <button
                                                        onClick={ () => saveEdit(cliente.id_cliente) }
                                                        style={{
                                                            padding: "2px",
                                                            marginTop: "10px",
                                                            marginLeft: "3px",
                                                            color: "#040438"
                                                        }}
                                                >
                                                    Salvar
                                                </button>
                                                <button
                                                        onClick={ cancelEdit }
                                                        style={{
                                                            padding: "2px",
                                                            marginTop: "10px",
                                                            marginLeft: "3px",
                                                            color: "#040438"
                                                        }}
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <td>
                                                    <i 
                                                        className="fa-solid fa-pen"
                                                        onClick={ () => startEdit(cliente) } 
                                                        style={{ cursor: "pointer" }}>
                                                    </i>
                                                </td>
                                                <td>
                                                    <i 
                                                        className="fa-solid fa-trash" 
                                                        onClick={ () => updateToInactive(cliente.id_cliente) } 
                                                        style={{ cursor: "pointer" }}>
                                                    </i>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))
                            )}
                        </table>
                    </div>  
                    <div className="botao-form">
                        <button type="button" className="botao" onClick={ setCloseModal }>
                            <p>Voltar</p>
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return null;
}