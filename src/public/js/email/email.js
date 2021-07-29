const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
      auth: {
        user: 'reddit.sentiment.tool@gmail.com',
        pass: 'nodeJS2021'
      }
    });




  module.exports = transporter
    