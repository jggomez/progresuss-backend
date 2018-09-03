
const nodemailer = require("nodemailer");

class Email {


    constructor(userEmail, passwordEmail) {

        this.mailTransport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            tls: { rejectUnauthorized: false },
            auth: {
                user: userEmail,
                pass: passwordEmail
            }
        });

    }

    sendEmail(from, to, bcc, subject, bodyHTML) {

        const mailOptions = {
            from: from,
            to: to,
            bcc: bcc
        };

        mailOptions.subject = subject;
        mailOptions.html = bodyHTML;

        return this.mailTransport.sendMail(mailOptions);
    }

}

exports.Email = Email;