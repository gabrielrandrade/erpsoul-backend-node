import React from "react";

export default function RelatoriosVendas({ isOpenRelatoriosVendas, setCloseModal }) {
    if (isOpenRelatoriosVendas) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>Relatórios</h1>
                    <br />
                    <div className="rel-clientes">
                        <table id="table-rel-clientes">
                            <tr>
                                <th>Vendas</th>
                                <th>Produtos</th>
                                <th>Pedidos</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td></td>
                                <td></td>

                            </tr>
                            <tr>
                                <td>3</td>
                                <td></td>
                                <td></td>
                            </tr>
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