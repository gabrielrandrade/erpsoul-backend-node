const jwt = require("jsonwebtoken");
const connectDB = require("../config/db.js");

exports.authenticate = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ mensagem: "Acesso negado!" });
    }

    try {
        const db = await connectDB();
        const [tokenData] = await db.query(
            `SELECT * FROM tb_tokens WHERE token = ? AND expira_em > NOW()`, [token]
        );

        if (!tokenData.length) {
            return res.status(401).json({ mensagem: "Token expirado ou inválido!" });
        }

        const expiresAt = new Date(tokenData[0].expira_em);
        const now = new Date();

        if (now > expiresAt) {
            await db.query(`DELETE FROM tb_tokens WHERE token = ?`, [token]);
            return res.status(401).json({ mensagem: "Token expirado!" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ mensagem: "Token expirado!" });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ mensagem: "Token inválido!" });
        }
        return res.status(401).json({ mensagem: "Erro de autenticação!" });
    }
}