const express = require("express");
const { requiredAuth } = require("../middlewares/auth");
const LinkController = require("../controllers/link");

const router = express.Router();

router.get("/", requiredAuth, LinkController.getAll);
router.get("/:shortCode", LinkController.getById);
//router.patch("/:shortCode");
router.get(
  "/:shortCode/analytics",
  requiredAuth,
  LinkController.getByIdAnalytics
);

module.exports = router;
