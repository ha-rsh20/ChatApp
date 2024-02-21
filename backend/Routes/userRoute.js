const express = require("express");
const { userCon } = require("../Controllers/userController");
const { addContacts } = require("../Controllers/contactController");
const { getContacts } = require("../Controllers/getContacts");
const { getMessages } = require("../Controllers/getMessage");
const { getContactMessages } = require("../Controllers/getContactMessage");
const router = express.Router();

// router.route("/").get(userCon);
router.route("/getContact/:id").get(getContacts);
router.route("/getMessage/:id").get(getMessages);
router.route("/getContactMessage/:sid/:rid").get(getContactMessages);
router.route("/addContact/:id").post(addContacts);

module.exports = router;
