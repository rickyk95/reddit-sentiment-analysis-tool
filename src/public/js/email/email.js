const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });




  module.exports = transporter
    