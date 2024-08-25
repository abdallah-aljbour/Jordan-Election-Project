const express = require("express");
const router = express.Router();
const localListingController2 = require("../controllers/localListingController2");

router.get(
  "/struggling-members2",
  localListingController2.getLocalListingWithStrugglingMembers
);

module.exports = router;