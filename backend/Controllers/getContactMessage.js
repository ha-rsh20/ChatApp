const expressAsyncHandler = require("express-async-handler");
const message = require("../Schemas/messageSchema");

const getContactMessages = expressAsyncHandler(async (req, res) => {
  let messages;

  await message
    .find({ rid: req.params.rid })
    .then((data) => {
      messages = data;
    })
    .catch((err) => {
      console.log(err);
    });

  res.status(201).send(messages);
});

module.exports = { getContactMessages };
