const User = require("../models/User.js");
const Token = require("../models/Token.js");

exports.getHomeData = async (req, res) => {
    const id_usuario = req.user.userId;

    try {
        const user = await User.findById(id_usuario);
        if (!user) {
            return res.status(404).json({ mensagem: "Usuário não encontrado!" });
        }
        
        return res.json({ nome: user.nome, email: user.email });
    } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
}