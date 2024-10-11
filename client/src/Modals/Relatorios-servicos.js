import React from "react";

export default function RelatoriosServicos({ isOpenRelatoriosServicos, setCloseModal }) {
    if (isOpenRelatoriosServicos) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>Relatórios</h1>
                    <h3>
                        Para gerar seu relatório, é necessário que pelo menos um dos campos esteja preenchido. 
                    </h3>
                    <form method="post" action="">
                        <div className="row">
                            <div className="col-6">
                                <input type="text" name="nome_cliente" id="nome_cliente" placeholder="Nome do Cliente" />
                                <input type="text" name="cod_servico" id="cod_servico" placeholder="Código do Serviço" />
                                <input type="text" name="servico" id="servico" placeholder="Serviço Prestado" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>Data de Vencimento</label>
                                <input type="date" name="dt_venc" id="dt_venc" />
                
                                <label>Status do Serviço</label>
                                <select name="status_serv" id="status_serv">
                                    <option>Selecione</option>
                                    <option value="1">CONCLUÍDO</option>
                                    <option value="2">EM ANDAMENTO</option>
                                    <option value="3">VENCIDO</option>
                                    <option value="4">CANCELADO</option>
                                </select>
                            </div>
                        </div>
                        <div className="botao-form">
                            <button type="submit" className="botao">
                                <p>Gerar</p>
                            </button>
                        </div>
                    </form>
                    <div className="rel-clientes">
                        <table id="table-rel-clientes">
                            <tr>
                                <th>Cliente</th>
                                <th>Serviço</th> 
                                <th>Valor Serviço</th>
                                <th>Alíquota ISS</th>
                                <th>Natureza</th>
                                <th>Data de Vencimento</th>
                                <th>Status</th>
                            </tr>
                            <tr>
                                <td>Alfreds Futterkiste</td>
                                <td>Consultoria Fiscal</td>
                                <td>R$ 150,00</td>
                                <td>10,8%</td>
                                <td>PF</td>
                                <td>09/10/2033</td>
                                <td>Em Andamento</td>
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