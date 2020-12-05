// ShortCode Gen Setup
const { customAlphabet } = require("nanoid");
const customChars =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const charLength = 6;
const nanoid = customAlphabet(customChars, charLength);

module.exports = { nanoid };
