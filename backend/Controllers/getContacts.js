const expressAsyncHandler = require("express-async-handler");
const contact = require("../Schemas/contactSchema");
const user = require("../Schemas/user");

const getContacts = expressAsyncHandler(async (req, res) => {
  let contacts;
  await contact
    .findOne({ uid: req.params.id })
    .then((data) => {
      contacts = data;
    })
    .catch((err) => console.log(err));

  let users;
  await user
    .find()
    .then((data) => {
      users = data;
    })
    .catch((err) => {
      console.log(err);
    });

  let ids = contacts.cuid;
  if (ids === undefined) {
    ids = "";
  } else {
    ids = ids.split(",");
  }

  //console.log(users.length);
  let cFNames = "",
    cLNames = "",
    cEmail = "",
    cId = "";

  let data = [];

  for (let i = 0; i < ids.length - 1; i++) {
    for (let j = 0; j < users.length; j++) {
      if (parseInt(users[j].uid) === parseInt(ids[i])) {
        cId += users[j].uid + ",";
        cFNames += users[j].firstname + ",";
        cLNames += users[j].lastname + ",";
        cEmail += users[j].email + ",";

        data[i] = {
          id: users[j].uid,
          firstname: users[j].firstname,
          lastname: users[j].lastname,
          email: users[j].email,
        };
        // data[i].id = users[j].uid;
        // data[i].firstname = users[j].firstname;
        // data[i].lastname = users[j].lastname;
        // data[i].email = users[j].email;
      }
    }
  }
  // let data = {
  //   cId,
  //   cFNames,
  //   cLNames,
  //   cEmail,
  // };
  //return data;
  res.status(201).send(data);
});

module.exports = { getContacts };
