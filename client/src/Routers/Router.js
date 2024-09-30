import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "../Pages/Index.js";
import HomeGratuito from "../Pages/Home-gratuito.js";
import HomeERP from "../Pages/Home-erp.js";
import Crm from "../Pages/Crm.js";
import Vendas from "../Pages/Vendas.js";
import Servicos from "../Pages/Servicos.js";
import Financas from "../Pages/Financas.js";
import Estoque from "../Pages/Estoque.js";
import Contabilidade from "../Pages/Contabilidade.js";
import Pagamento from "../Pages/Pagamento.js";
import EsqueciSenha from "../Pages/Esqueci-senha.js";
import NovaSenha from "../Pages/Nova-senha.js";
import PrivateRoute from "./PrivateRoute.js";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={ <Index /> } path="/" exact />
                <Route 
                    path="/home-gratuito"
                    element={ 
                        <PrivateRoute>
                            <HomeGratuito />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/home-erp"
                    element={
                        <PrivateRoute>
                            <HomeERP />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/crm"
                    element={
                        <PrivateRoute>
                            <Crm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/vendas"
                    element={
                        <PrivateRoute>
                            <Vendas />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/servicos"
                    element={
                        <PrivateRoute>
                            <Servicos />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/financas"
                    element={
                        <PrivateRoute>
                            <Financas />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/estoque"
                    element={
                        <PrivateRoute>
                            <Estoque />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/contabilidade"
                    element={
                        <PrivateRoute>
                            <Contabilidade />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/pagamento"
                    element={
                        <PrivateRoute>
                            <Pagamento />
                        </PrivateRoute>
                    }
                />
                <Route element={ <EsqueciSenha /> } path="/esqueci-senha" />
                <Route element={ <NovaSenha /> } path="/nova-senha" />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;