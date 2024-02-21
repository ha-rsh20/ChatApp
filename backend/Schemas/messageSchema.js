const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  mid: {
    type: Number,
    required: true,
  },
  sid: {
    type: Number,
    required: true,
  },
  rid: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const message = mongoose.model("message", messageSchema);
module.exports = message;
