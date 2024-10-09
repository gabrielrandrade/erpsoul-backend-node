const nodemailer = require("nodemailer");

const createEmailTransporter = () => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });
}

exports.sendEmail = async (email, idRec) => {
    const url = `http://localhost:3000/nova-senha?idRec=${ idRec }`;
    const transporter = createEmailTransporter();
    const mailOptions = {
        from: "suportesoulerp@gmail.com",
        to: email,
        subject: "Recuperação de Senha",
        text: `
            Solicitação de alteração de senha para o E-mail: ${ email }\n
            Clique no link abaixo para redefinir sua senha:\n\n
            ${ url }
        `
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        if (info.accepted.length > 0) {
            return info;
        } else {
            console.error("Erro - não foi possível enviar o E-mail!");
            throw new Error("Erro - não foi possível enviar o E-mail.");
        }
    } catch {error} {
        console.error("Erro ao enviar o E-mail:", error);
        throw new Error("Erro ao enviar o E-mail.");
    }
}

exports.confirmationEmail = async (email) => {
    const transporter = createEmailTransporter();
    const mailOptions = {
        from: "suportesoulerp@gmail.com",
        to: email,
        subject: "Senha Alterada",
        text: `A senha da sua conta no ERP Soul foi alterada. Se você não solicitou essa alteração, sugerimos mudar sua senha imediatamente e ativar verificações adicionais de segurança.`
    }

    try {
        return await transporter.sendMail(mailOptions);
    } catch {error} {
        console.error("Erro ao enviar o E-mail:", error);
        throw new Error("Erro ao enviar o E-mail.");
    }
}