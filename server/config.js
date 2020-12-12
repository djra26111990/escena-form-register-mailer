const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const PORT_SMTP_STRING = process.env.EMAIL_SMTP_PORT
const SMTP_PORT = parseInt(PORT_SMTP_STRING)

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: SMTP_PORT,
  secure: true, // use TLS
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
});

module.exports = transporter;
