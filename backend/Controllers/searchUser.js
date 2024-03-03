const expressAsyncHandler = require("express-async-handler");
const user = require("../Schemas/user");

const searchU = expressAsyncHandler(async (req, res) => {
  let users;
  await user
    .find()
    .then((data) => {
      users = data;
    })
    .catch((err) => {
      console.log(err);
    });

  users = users.filter(
    (user) =>
      user.firstname.toLowerCase().includes(req.params.input) ||
      user.lastname.toLowerCase().includes(req.params.input) ||
      user.email.toLowerCase().includes(req.params.input)
  );

  // console.log(users);
  res.status(201).send(users);
});

module.exports = { searchU };
