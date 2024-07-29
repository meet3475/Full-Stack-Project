const nodemailer = require("nodemailer");

const sentMail = async (req, res) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "meetdobariya480@gmail.com",
            pass: "sqjyjcpbgdjyheit",
        },
    });

    const recevier = {
        from: 'meetdobariya480@gmail.com', // sender address
        to: "vrajd2602@gmail.com", // list of receivers
        subject: "Node Js Mail Testing", // Subject line
        text: "Your registation is Sucessfully", // plain text body
    };

    transporter.sendMail(recevier, (error, emailResponse) => {
        if (error)
            throw error;
        console.log("Sucesss...!");
        res.end();
    })
}

module.exports = sentMail