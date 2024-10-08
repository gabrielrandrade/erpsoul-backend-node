import React from "react";

export default function CadastrarFaturamento({ isOpenCadastrarFaturamento, setCloseModal }) {
    if (isOpenCadastrarFaturamento) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>Cadastrar Faturamento</h1>
                    <form method="post" action="">
                        <div className="cliente">
                            <div className="row">
                                <div className="col-12">
                                    <input
                                        className="input-cliente"
                                        type="text"
                                        id="cliente"
                                        name="cliente"
                                        placeholder="Cliente*"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="servico"
                                    name="servico"
                                    placeholder="Serviço*"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="val_servico"
                                    name="val_servico"
                                    placeholder="Valor do Serviço*"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    id="qnt_parcelas"
                                    name="qnt_parcelas"
                                    placeholder="Nº de Parcelas*"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <select name="forma_pgto" id="forma_pgto">
                                    <option>Selecione Forma</option>
                                    <option value="1">Forma 1</option>
                                    <option value="2">Forma 2</option>
                                    <option value="3">Forma 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="parcelamento">
                            <div className="row">
                                <label>Parcelado?</label>
                                <div className="col-12">
                                    <input
                                        className="radio"
                                        type="radio"
                                        id="parcelamento"
                                        name="parcelamento"
                                        value="1"
                                    />
                                    <label for="parcelamento">Sim</label>
                                </div>
                                <div className="col-12">
                                    <input
                                        className="radio"
                                        type="radio"
                                        id="parcelamento"
                                        name="parcelamento"
                                        value="2"
                                    />
                                    <label for="parcelamento">Não</label>
                                </div>
                            </div>
                            <div className="row">
                                <label>Data do Faturamento</label>
                                <div className="col-6">
                                    <input
                                        type="date"
                                        id="dt_faturamento"
                                        name="dt_faturamento"
                                        placeholder="Data Faturamento*"
                                        required
                                    />
                                </div>
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