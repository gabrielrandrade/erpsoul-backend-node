import React from "react";

export default function GerarNF({ isOpenGerarNF, setCloseModal }) {
    if (isOpenGerarNF) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>Gerar nota fiscal</h1>
                    <form method="post" action="">
                        <div className="info">
                            <p>Gerar nota fiscal</p>
                            <div className="row">
                                <div className="col-6">
                                    <select name="saida" id="saida" required>
                                        <option>Selecione tipo de saída</option>
                                        <option value="1">1 </option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="serie" name="serie" placeholder="Série" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="numero" name="numero" placeholder="Número" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <select name="loja" id="loja" required>
                                        <option>Selecione loja</option>
                                        <option value="1">1 </option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <select name="uni-negocio" id="uni-negocio" required>
                                        <option>Selecione unidade de negócio</option>
                                        <option value="1">1 </option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input
                                        type="text"
                                        id="dt-emissao"
                                        name="dt-emissao"
                                        placeholder="Data de emissão"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input
                                        type="text"
                                        id="hr-emissao"
                                        name="hr-emissao"
                                        placeholder="Hora de emissão"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="dt-saida" name="dt-saida" placeholder="Data de saída" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="hr-saida" name="hr-saida" placeholder="Hora da saída" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="codigo" name="codigo" placeholder="Código tributário" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <select name="finalidade" id="finalidade" required>
                                        <option>Selecione finalidade</option>
                                        <option value="1">NF-E normal</option>
                                        <option value="2">Devolução de mercadoria</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="numero" name="numero" placeholder="Número" />
                                </div>
                            </div>
                        </div>
                        <div className="info">
                            <p>Destinatário</p>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="nome-cont" name="nome-cont" placeholder="Nome do contato" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <select name="tipo-pessoa" id="tipo-pessoa" required>
                                        <option>Selecione tipo de pessoa</option>
                                        <option value="1">Física</option>
                                        <option value="2">Jurídica</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="cnpj" name="cnpj" placeholder="CNJP" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="vendedor" name="vendedor" placeholder="Vendedor" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="cep" name="cep" placeholder="CEP" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="uf" name="uf" placeholder="UF" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <select name="municipio" id="municipio" required>
                                        <option>Selecione município</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="complemento" name="complemento" placeholder="Complemento" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="email" name="email" placeholder="E-mail" />
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