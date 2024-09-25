import React from "react";

export default function Integracoes({ isOpenIntegracoes, setCloseModal }) {
    if (isOpenIntegracoes) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>Integrações</h1>
                    <form method="post" action="">
                        <div className="row">
                            <div className="col-6">
                                <select name="categoria" id="categoria">
                                    <option>Layout do sistema contábil</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <select name="categoria" id="categoria">
                                    <option>Período de fechamento</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <select name="categoria" id="categoria">
                                    <option>Email depois de quantos dias depois do fechamento</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="botao-form">
                            <button type="submit" className="botao">
                                <p>Salvar</p>
                            </button>
                        </div>
                        <div className="botao-form">
                            <button type="button" className="botao" onClick={ setCloseModal }>
                                <p>Voltar</p>
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }

    return null;
}