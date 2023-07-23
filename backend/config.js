const crypto = require("crypto");
const TOKEN_SECRET = crypto.randomBytes(35).toString("hex"); // giving a random string

module.exports = TOKEN_SECRET;