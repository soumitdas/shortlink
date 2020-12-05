const { check } = require("express-validator");
const { APP_BASE_URL } = require("../config");

const shortenRoute = [
  check("longUrl")
    .exists()
    .bail()
    .isURL({
      require_protocol: true,
      host_blacklist: [APP_BASE_URL],
    })
    .withMessage("invalid URL"),
  check("customShortCode")
    .optional({ checkFalsy: true })
    .isAlphanumeric()
    .isLength({ min: 5, max: 20 })
    .withMessage("invalid shortcode"),
];

module.exports = {
  shortenRoute,
};
