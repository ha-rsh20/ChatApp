const { join } = require("node:path");

const userCon = (req, res) => {
  res.sendFile(join(__dirname, "./index.html"));
};

module.exports = { userCon };
