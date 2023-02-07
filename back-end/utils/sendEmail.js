const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = (emailTo, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    // config mail server
    service: "Gmail",
    auth: {
      user: `${process.env.EMAIL_SERVER}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });
  const mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: `${process.env.EMAIL_SERVER}`,
    to: emailTo,
    subject: subject,
    text: text,
    html: html,
  };
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      // console.log(err);
      // res.redirect("/");
      // res.status(err.responseCode).json({
      //   message: "err mail: " + err.response,
      // });
      return {
        status: err.responseCode,
        message: err.response,
      };
    } else {
      console.log("Message sent: " + info.response);
      // res.redirect("/");
      // res.status(200).json({
      //   message: "sent mail",
      // });
      return {
        status: err.responseCode,
        message: err.response,
      };
    }
  });
};

module.exports = sendEmail;
