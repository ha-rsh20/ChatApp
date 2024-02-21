const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const user = require("../Schemas/user");
const otp = require("../Schemas/otpSchema");
const otpGenerator = require("./generateOTP");

dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const verifyOTP = async (req, res) => {
  let votp;
  await otp
    .findOne({ oid: 1 })
    .then((data) => (votp = data))
    .catch((err) => console.log(err));

  if (req.body.otp === votp.otp) {
    res.status(200).send();
  } else {
    res.status(500).send();
  }
};

const sendEmail = expressAsyncHandler(async (req, res) => {
  const mail = process.env.SMTP_MAIL;
  const mail_to = req.params.mail;
  const reset = req.params.reset;
  let votp = otpGenerator();

  var mailOptions = {
    from: mail,
    to: mail_to,
    subject:
      reset === undefined
        ? "OTP for email authentication"
        : "OTP to reset password",
    text: `Your OTP is ${votp}`,
  };

  if (reset !== undefined) {
    user
      .findOne({ email: req.params.mail })
      .then((data) => {
        if (data) {
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              res.status(500).send();
            } else {
              res.status(200).send();
            }
          });
        } else {
          res.status(204).send();
        }
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).send();
      } else {
        res.status(200).send();
      }
    });
  }

  const newOtp = { otp: votp };

  otp.updateOne({ oid: 1 }, { $set: newOtp }).catch((err) => {
    console.log(err);
  });
});

module.exports = { sendEmail, verifyOTP };
