const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  oid: {
    type: Number,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

const otp = mongoose.model("otp", otpSchema);

module.exports = otp;
