const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

dotenv.config();

let pool = null;

async function connectDB() {
    try {
        // !process.env.DB_PASSWORD caso não tenha senha, retirar a verificação de senha
        if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
            throw new Error("Faltam variáveis de ambiente para a conexão ao banco de dados!");
        }

        if (!pool) {
            pool = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                waitForConnections: true, // Garante que a pool de conexões aguarde se atingir o limite
                connectionLimit: 10, // Limita o número máximo de conexões simultâneas
                queueLimit: 0, // Limita o número de requisições na fila (0 = sem limite)
            });

            console.log("Conectado ao pool de conexões MySQL!");

            pool.on("error", async (err) => {
                if (err.code === "PROTOCOL_CONNECTION_LOST") {
                    console.log("Conexão perdida, reconectando...");
                    pool = await connectDB();
                } else {
                    throw err;
                }
            });
        }
        
        return pool;
    } catch (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        throw err;
    }
}

module.exports = connectDB;