const checkDBConnection = (req, res, next) => {
    if (!req.db) {
        return res.status(500).json({ mensagem: "Banco de dados não está conectado!" });
    }
    next();
}

module.exports = checkDBConnection;