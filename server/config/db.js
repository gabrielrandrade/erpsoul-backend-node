const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

dotenv.config();

async function connectDB() {
    try {
        if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) { // Por não ter uma senha, !process.env.DB_PASSWORD precisa ser removido
            throw new Error("Faltam variáveis de ambiente para a conexão ao banco de dados!");
        }

        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true, // Garante que a pool de conexões aguarde se atingir o limite
            connectionLimit: 10, // Limita o número máximo de conexões simultâneas
            queueLimit: 0, // Limita o número de requisições na fila (0 = sem limite)
        });

        console.log("Conectado ao banco de dados MySQL!");

        // Reconexão automática caso a conexão seja perdida
        db.on("error", async (err) => {
            console.error("Erro na conexão com o banco de dados:", err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.log("Tentando reconectar ao banco de dados...");
                await connectDB();
            } else {
                throw err;
            }
        });

        return db;
    } catch (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        throw err;
    }
}

module.exports = connectDB;