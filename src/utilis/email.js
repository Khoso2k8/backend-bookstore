const path = require("path");
const express = require("express");
const hbs = require("nodemailer-express-handlebars");
const app = express();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  auth: {
    user: process.env.ELASTIC_MAIL_USERNAME,
    pass: process.env.ELASTIC_MAIL_PASSWORD,
  },
});

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
};

transporter.use("compile", hbs(handlebarOptions));

// const emailOptions = {
//   from: '"Wawar Khoso 👻" <meerkhan2k8@gmail.com>', // sender address
//   to: "khosowaqar@gmail.com", // list of receivers
//   subject: "Hello ✔", // Subject line
//   template: "email",
//   context: {
//     name: "Waqar Ahmed",
//     email: "meerkhan2k8@gmail.com",
//     company: "BookStore",
//   },
// };

async function sendEmail(options) {
  const info = await transporter.sendMail(options);

  console.log("Message sent: %s", info.messageId);
}

// main().catch(console.error);
module.exports = sendEmail;
