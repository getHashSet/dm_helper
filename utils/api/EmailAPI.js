require("dotenv").config();
const nodemailer = require("nodemailer");

let gmailUser = process.env.GMAIL_EMAIL;
let gmailPassword = process.env.GMAIL_PASSWORD;
let companyName = process.env.COMPANY_NAME;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailUser,
        pass: gmailPassword
    }
});

const configMailOptions = function (emailAddrs, subject, body) {
    const toEmailAddrs = process.env.NODE_ENV === "production" ? emailAddrs : process.env.EMAIL_TO_DEV;
    const mailOptions = {
        from: gmailUser, // sender address
        to: toEmailAddrs, // list of receivers
        subject: subject, // Subject line
        html: body// plain text body
    };
    return mailOptions;
};

const sendEmail = function (mailOptions) {
    return transporter.sendMail(mailOptions);
};

const EmailAPI = {
    sendSignupEmail: function (emailAddr, firstName, lastName) {
        const subject = `Thank You for Signing Up for a Quote from ${companyName}`;
        const bodyHtml = `<p>Hello ${firstName} ${lastName},<br><br>Thank you for contacting ${companyName} regarding a quote.  We have received your request and someone will be in contact with you shortly.</p><h5>To unsubscribe from this email click <a target="_blank" href="localhost:3000//crm/unsubscribe/${emailAddr}">here</a> and you will not receive emails in the future.</h5>`;

        const mailOptions = configMailOptions(emailAddr, subject, bodyHtml);
        return sendEmail(mailOptions)
    }
};

module.exports = EmailAPI;