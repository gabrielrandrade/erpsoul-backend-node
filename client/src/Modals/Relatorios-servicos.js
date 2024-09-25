import React from "react";

export default function RelatoriosServicos({ isOpenRelatoriosServicos, setCloseModal }) {
    if (isOpenRelatoriosServicos) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>Relatórios</h1>
                    <h3>Para gerar seu relatório, é necessário que pelo menos um dos campos esteja preenchido. </h3>
                    <form method="post" action="">
                        <div className="row">
                            <div className="col-6">
                                <input type="text" placeholder="Nome do Cliente" />
                                <input type="text" placeholder="Número da NF" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" placeholder="Código do Serviço" />
                                <input type="text" placeholder="Serviço Prestado" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label for="dt_servico"> Data do Serviço</label>
                                <input type="date"  placeholder="Data do Serviço" />
                                <label>Status do Serviço</label>
                                <select name="forma_pgto" id="forma_pgto">
                                    <option>Selecione</option>
                                    <option value="1">CONCLUÍDO</option>
                                    <option value="2">EM ANDAMENTO</option>
                                    <option value="3">Forma 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="botao-form">
                            <button type="submit" className="botao">
                                <p>Gerar</p>
                            </button>
                        </div>
                    </form>
                    <div className="relatorios">
                        <table id="table-relatorios-crm">
                            <tr>
                                <th>No Cliente</th>
                                <th>Nome</th>
                                <th>CPF/CNPJ</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Alfreds Futterkiste</td>
                                <td>123456789-11</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Maria Anders</td>
                                <td>321456987-22</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Germany</td>
                                <td>222123645/0001-30</td>
                            </tr>
                        </table>
                    </div>
                    <div className="botao-form">
                        <button type="button" className="botao">
                            <p>Imprimir</p>
                        </button>
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