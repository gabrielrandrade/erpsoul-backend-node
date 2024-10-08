import React from "react";

export default function CadastrarContador({ isOpenCadastrarContador, setCloseModal }) {
    if (isOpenCadastrarContador) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>Cadastrar contador</h1>
                    <form method="post" action="">
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="cnpj-contabilidade"
                                    name="cnpj-contabilidade"
                                    placeholder="CNPJ empresa contábil*"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="nm-contabilidade"
                                    name="nm-contabilidade"
                                    placeholder="Nome ou URL de empresa contábil*"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="tel-contabilidade"
                                    name="tel-contabilidade"
                                    placeholder="Telefone*"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="email-contabilidade"
                                    name="email-contabilidade"
                                    placeholder="E-mail*"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="nm-resposavel-contabilidade"
                                    name="nm-responsavel-contabilidade"
                                    placeholder="Nome do responsável da empresa"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="email-outros-contabilidade" 
                                    name="email-outros-contabilidade"
                                    placeholder="Outros e-mails"
                                    required
                                />
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