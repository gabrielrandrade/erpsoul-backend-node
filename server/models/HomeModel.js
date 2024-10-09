const connectDB = require("../config/db.js");

exports.findById = async (id) => {
    const db = await connectDB();
    const [rows] = await db.query(`SELECT * FROM tb_usuario WHERE id_usuario = ?`, [id]);
    
    return rows;
}