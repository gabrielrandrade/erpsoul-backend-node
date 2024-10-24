require("dotenv").config();
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const express = require("express");
const connectDB = require("./config/db.js");
const rateLimit = require("express-rate-limit");
const apiRoutes = require("./routes/apiRoutes.js");
const checkDBConnection = require("./middlewares/checkDBConnection.js");

const app = express();
const PORT = process.env.PORT;

app.use(helmet()); // Proteção básica de cabeçalhos HTTP
app.use(xss()); // Prevenção contra ataques de cross-site scripting (XSS)
app.use(cors());
app.use(express.json());

// Limitar requisições (para evitar DoS)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    message: "Muitas requisições deste IP, tente novamente mais tarde"
});

app.use(limiter);

// Conexão com o banco de dados e inicialização do servidor
(async () => {
    try {
        const db = await connectDB();

        // Middleware para associar a conexão do banco de dados a cada requisição
        app.use((req, res, next) => {
            req.db = db;
            next();
        });

        // Endpoint básico para verificar status do backend
        app.get("/", (req, res) => {
            res.send("Backend do ERP Soul está funcionando!");
        });

        // Verificar se a conexão com o banco está ativa para as rotas da API
        app.use("/api", checkDBConnection, apiRoutes);

        // Tratamento de rotas não encontradas
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
        process.exit(1); // Encerrar o processo caso a conexão falhe
    }
})();