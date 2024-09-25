import React from "react";

export default function BaixarContas({ isOpenBaixarContas, setCloseModal }) {
    if (isOpenBaixarContas) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <form>
                        <h1>Baixar contas</h1>
                        <div className="baixar-conta">
                            <div className="row">
                                <div className="col-6-baixar-contas">
                                    <label>Tipo de conta</label>
                                    <select name="tipo_conta" id="tipo_conta">
                                        <option>Selecione</option>
                                        <option value="1">Pagar</option>
                                        <option value="2">Receber</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="botao-form">
                            <button type="submit" className="botao">
                                <p>Baixar</p>
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