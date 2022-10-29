const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

app.post("/sendmail", async (req, res) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.YOUR_MAIL_ADDRESS,
                pass: process.env.PASS,
            },
        });

        let info = await transporter.sendMail({
            from: process.env.YOUR_MAIL_ADDRESS,
            to: process.env.CLIENT_MAIL_ADDRESS,
            subject: "yes",
            html: "<b>Hello world?</b>",
        });

        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});
