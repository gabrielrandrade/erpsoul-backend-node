import React from "react";

export default function CadastrarProduto({ isOpenCadastrarProduto, setCloseModal }) {
    if (isOpenCadastrarProduto) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>Cadastrar novo produto</h1>
                    <form method="post" action="">
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    placeholder="Nome"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="marca"
                                    name="marca"
                                    placeholder="Marca"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="preco-venda"
                                    name="preco-venda"
                                    placeholder="Preço de venda"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="unidade"
                                    name="unidade"
                                    placeholder="Unidade"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <select name="tipo" id="tipo" required>
                                    <option>Tipo</option>
                                    <option value="1">Produto</option>
                                    <option value="2">Serviço</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <select name="formato" id="formato" required>
                                    <option>Formato</option>
                                    <option value="1">Simples</option>
                                    <option value="2">Com variação</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <select name="producao" id="producao" required>
                                    <option>Produção</option>
                                    <option value="1">Própria</option>
                                    <option value="2">Terceiros</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="codigo"
                                    name="codigo"
                                    placeholder="Código(SKU)"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="dt-validade"
                                    name="dt-validade"
                                    placeholder="Data de validade"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <select name="frete-gratis" id="frete-gratis" required>
                                    <option>Frete grátis</option>
                                    <option value="1">Sim</option>
                                    <option value="2">Não</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="peso-liquido"
                                    name="peso-liquido"
                                    placeholder="Peso líquido"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="peso-bruto"
                                    name="peso-bruto"
                                    placeholder="Peso bruto"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="largura"
                                    name="largura"
                                    placeholder="Largura"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="altura"
                                    name="altura"
                                    placeholder="Altura"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="itens-caixa"
                                    name="itens-caixa"
                                    placeholder="Itens por caixa"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="unidade-medida"
                                    name="unidade-medida"
                                    placeholder="Unidade de medida"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="gtin"
                                    name="gtin"
                                    placeholder="GTIN/EAN"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="text"
                                    id="gtin-ean"
                                    name="gtin-ean"
                                    placeholder="GTIN/EAN tributário"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row-textarea">
                            <label for="historico">Histórico:</label>
                            <textarea id="historico" name="historico" rows="4" cols="50"></textarea>
                        </div>

                        <div className="row-textarea">
                            <label for="desc-produto">Descrição do produto:</label>
                            <textarea id="desc-produto" name="desc-produto" rows="4" cols="50"></textarea>
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