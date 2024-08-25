// routes/localListingRoutes.js
const express = require("express");
const router = express.Router();
const resultPageController = require("../controllers/resultPageA1");

router.get("/local-listingsA1", resultPageController.getLocalListings);
router.get("/total-voting-countA1", resultPageController.getTotalVotingCount);
router.get("/thresholdA1", resultPageController.getThreshold);
router.get(
  "/votes-above-thresholdA1",
  resultPageController.getVotesAboveThreshold
);

module.exports = router;
