const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  cid: {
    type: Number,
    required: true,
  },
  uid: {
    type: Number,
    required: true,
  },
  cuid: {
    type: String,
    required: true,
  },
});

const contact = mongoose.model("contact", contactSchema);
module.exports = contact;
