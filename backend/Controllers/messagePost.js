const message = require("../Schemas/messageSchema");

const postMessage = async (msg, sid, rid) => {
  let messages = [];

  await message
    .find()
    .then((data) => {
      messages = data;
    })
    .catch((err) => {
      console.log(err);
    });
  let lastId = messages.length === 0 ? 0 : messages[messages.length - 1].mid;

  let newMessage = new message({
    mid: lastId + 1,
    sid: sid,
    rid: rid,
    message: msg,
  });
  newMessage.save().catch((err) => {
    console.log(err);
  });

  return newMessage;
};

module.exports = { postMessage };
