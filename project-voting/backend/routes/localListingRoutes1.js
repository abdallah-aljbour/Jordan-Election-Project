// routes/localListingRoutes.js
const express = require("express");
const router = express.Router();
const localListingController1 = require("../controllers/localListingController1");

router.get(
  "/struggling-members1",
  localListingController1.getLocalListingWithStrugglingMembers
);

module.exports = router;