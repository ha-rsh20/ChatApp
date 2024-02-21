const expressAsyncHandler = require("express-async-handler");
const message = require("../Schemas/messageSchema");

const getMessages = expressAsyncHandler(async (req, res) => {
  let messages;

  await message
    .find({ sid: req.params.id })
    .then((data) => {
      messages = data;
    })
    .catch((err) => {
      console.log(err);
    });

  res.status(201).send(messages);
});

module.exports = { getMessages };
