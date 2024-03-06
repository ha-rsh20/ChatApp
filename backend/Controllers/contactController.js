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

const addContacts = async (req, res) => {
  let con = null;
  let flag = true;
  if (req.params.uid !== null) {
    await contact
      .findOne({ uid: req.params.uid })
      .then((data) => {
        con = data;
      })
      .catch((err) => {
        flag = false;
        //error code 201 for error in finding user
        res.sendStatus(401);
      });

    if (con != null) {
      con.cuid += req.params.cid + ",";

      contact
        .updateOne({ uid: req.params.uid }, { $set: con })
        .then(() => {})
        .catch((err) => {
          flag = false;
          //error code 202 for error in adding target user in contact for user
          res.sendStatus(402);
        });
    }

    await contact
      .findOne({ uid: req.params.cid })
      .then((data) => {
        con = data;
      })
      .catch((err) => {
        flag = false;
        //error code 203 for error in finding target user
        res.sendStatus(403);
      });

    if (con != null) {
      con.cuid += req.params.uid + ",";

      contact
        .updateOne({ uid: req.params.cid }, { $set: con })
        .then(() => {})
        .catch((err) => {
          flag = false;
          //error code 204 for error in adding user in contact for target user
          res.sendStatus(404);
        });
    }
    if (flag) {
      res.sendStatus(205);
    }
  } else {
    //error code 500 for not logged in
    res.status(500).send();
  }
};

module.exports = { getContacts, addContacts };
