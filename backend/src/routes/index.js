const express = require("express");
const useragent = require("express-useragent");
const linkRoutes = require("./link");
const { HttpError } = require("../utils/helper");
const { isAuthenticated } = require("../middlewares/auth");
const Validator = require("../middlewares/validator");
const validationHandler = require("../middlewares/validationHandler");
const router = express.Router();

const ShortController = require("../controllers/short");

// Every request at the base will be redirected to frontend
router.get("/", (_, res) => res.redirect(process.env.FRONTEND_BASE_URL));

router.post(
  "/shorten",
  Validator.shortenRoute,
  validationHandler,
  isAuthenticated,
  ShortController.shorten
);
//router.post("/custom-shortcode");

router.use("/links", isAuthenticated, linkRoutes);

router.get("/:shortCode", useragent.express(), ShortController.redirect);

// catch 404 and forward to error handler
router.use((req, res, next) => {
  const err = new HttpError(404, "Not Found");
  next(err);
});

module.exports = router;
