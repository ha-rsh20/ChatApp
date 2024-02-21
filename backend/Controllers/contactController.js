const contact = require("../Schemas/contactSchema");
const user = require("../Schemas/user");

const getContacts = async (id) => {
  let contacts;
  await contact
    .findOne({ uid: id })
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
    cEmail = "";
  for (let i = 0; i < ids.length - 1; i++) {
    for (let j = 0; j < users.length; j++) {
      if (parseInt(users[j].uid) === parseInt(ids[i])) {
        cFNames += users[i].firstname;
        cLNames += users[i].lastname;
        cEmail += users[i].emaail;
      }
    }
  }
  let data = {
    cFNames,
    cLNames,
    cEmail,
  };
  return data;
};

const addContacts = (req, res) => {};

module.exports = { getContacts, addContacts };
