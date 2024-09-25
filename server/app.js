const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const apiRoutes = require("./routes/api");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(helmet()); // Proteção básica de cabeçalhos HTTP
app.use(xss()); // Prevenção contra ataques de cross-site scripting (XSS)
app.use(cors());
app.use(express.json());

// Limite de requisições (evitar ataques DoS)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,
    message: "Muitas requisições deste IP, tente novamente mais tarde"
});

app.use(limiter);

const checkDBConnection = (req, res, next) => {
    if (!req.db) {
        return res.status(500).json({ mensagem: "Banco de dados não está conectado!" });
    }
    next();
};

// Função principal que se conecta ao banco de dados e inicia o servidor
(async () => {
    try {
        const db = await connectDB();
        console.log("Conexão com o banco de dados estabelecida!");

        // Middleware para associar a conexão do banco de dados a cada requisição
        app.use((req, res, next) => {
            req.db = db;
            next();
        });

        // Endpoint para verificação do status do backend
        app.get("/", (req, res) => {
            res.send("Backend do ERP Soul está funcionando!");
        });

        // Rotas da API, protegidas pela verificação de conexão com o banco
        app.use("/api", checkDBConnection, apiRoutes);

        // Tratamento de erros para rotas não encontradas
        app.use((req, res, next) => {
            res.status(404).json({ mensagem: "Recurso não encontrado!" });
        });

        // Tratamento global de erros
        app.use((err, req, res, next) => {
            console.error("Erro no servidor:", err);
            res.status(500).json({ mensagem: "Erro interno do servidor" });
        });

        // Iniciar o servidor
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${ PORT }`);
        });

    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        process.exit(1); // Encerrar o processo se a conexão ao banco falhar
    }
})();