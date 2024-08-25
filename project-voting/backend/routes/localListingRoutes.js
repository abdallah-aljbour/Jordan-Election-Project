// routes/localListingRoutes.js
const express = require("express");
const router = express.Router();
const localListingController = require("../controllers/localListingController");

router.get(
  "/struggling-members",
  localListingController.getLocalListingWithStrugglingMembers
);

module.exports = router;