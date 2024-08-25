// routes/localListingRoutes.js
const express = require("express");
const router = express.Router();
const resultPageController = require("../controllers/resultPageA2");

router.get("/local-listingsA2", resultPageController.getLocalListings);
router.get("/total-voting-countA2", resultPageController.getTotalVotingCount);
router.get("/thresholdA2", resultPageController.getThreshold);
router.get(
  "/votes-above-thresholdA2",
  resultPageController.getVotesAboveThreshold
);

module.exports = router;
