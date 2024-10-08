import React from "react";

export default function Contas({ isOpenContas, setCloseModal }) {
    if (isOpenContas) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>Contas</h1>
                    <form method="post" action="">
                            <p className="titulo-financas">Selecionar tipo de conta</p>
                            <div className="row">
                                <div className="col-6-financas" id="tipo-conta-financas">
                                    <label className="label-financas">A pagar</label>
                                    <input
                                        className="radio-financas"
                                        type="radio"
                                        id="tipo-contas-pagar"
                                        name="tipo-contas"
                                        value="1"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6-financas">
                                    <label className="label-financas">A receber</label>
                                    <input
                                        className="radio-financas"
                                        type="radio"
                                        id="tipo-contas-receber"
                                        name="tipo-contas"
                                        value="2"
                                    />
                                </div>
                            </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <input
                                    type="text"
                                    id="fornecedor"
                                    name="fornecedor"
                                    placeholder="Fornecedor"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <input
                                    type="text"
                                    id="venci-original"
                                    name="venci-original"
                                    placeholder="Vencimento original"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <input
                                    type="text"
                                    id="venci"
                                    name="venci"
                                    placeholder="Vencimento"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <input
                                    type="text"
                                    id="valor"
                                    name="valor"
                                    placeholder="Valor"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <input
                                    type="text"
                                    id="n-docu"
                                    name="n-docu"
                                    placeholder="Nº documento"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <input
                                    type="text"
                                    id="compe"
                                    name="compe"
                                    placeholder="Competência"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <select name="form-pagamento" id="form-pagamento" required>
                                    <option>Selecione forma de pagamento</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <select name="portador" id="portador">
                                    <option>Selecione portador</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <select name="categoria" id="categoria">
                                    <option>Selecione categoria</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <select name="ocorrencia" id="ocorrencia">
                                    <option>Selecione ocorrência</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="row-textarea">
                            <label for="historico">Histórico:</label>
                            <textarea id="historico" name="historico" rows="4" cols="50"></textarea>
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