const nodemailer = require("nodemailer");
const logger = require("./log");

const sendEmailToken = (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'chill.eservices@gmail.com',
            pass: process.env.googleEmailPass
        }
    });

    const mailData = {
        from: 'chill.eservices@gmail.com',
        to: email,
        subject: 'Email verification',
        text: `Please follow the following link to validate your email and proceed with account creation: ${process.env.origin}/enter/validate?email=${email}&token=${token}`
    };

    transporter.sendMail(mailData, (err, data) => {
        if(err)
        return logger.error("Can't send email: " + err);
        logger.info("Email is sent: " + JSON.stringify(data));
    });
};

module.exports = {
    sendEmailToken
}