const User = require("../models/User.js");

exports.getHomeData = async (req, res) => {
    // const id_usuario = req.user.id_usuario;

    try {
        const user = await User.findById(id_usuario);
        if (user && user.length > 0) {
            return res.json({
                nome: user[0].nome,
                email: user[0].email
            });
        } else {
            return res.status(404).json({ mensagem: "Usuário não encontrado!" });
        }
    } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
}