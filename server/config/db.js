const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

dotenv.config();

let connection = null;

async function connectDB() {
    try {
        if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) { // Por não ter uma senha, !process.env.DB_PASSWORD precisa ser removido
            throw new Error("Faltam variáveis de ambiente para a conexão ao banco de dados!");
        }

        if (!connection || connection.state === "disconnected") {
            connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                waitForConnections: true, // Garante que a pool de conexões aguarde se atingir o limite
                connectionLimit: 10, // Limita o número máximo de conexões simultâneas
                queueLimit: 0, // Limita o número de requisições na fila (0 = sem limite)
            });

            console.log("Conectado ao banco de dados MySQL!");

            connection.on("error", async (err) => {
                if (err.code === "PROTOCOL_CONNECTION_LOST") {
                    console.log("Conexão perdida, reconectando...");
                    connection = await connectDB();
                } else {
                    throw err;
                }
            });
        }
        
        return connection;
    } catch (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        throw err;
    }
}

module.exports = connectDB;