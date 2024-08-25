const express = require("express");
const router = express.Router();

const {
  calculateTotalVotingPercentage,
} = require("../controllers/partyController1");

// Route to get the total voting percentage
router.get("/total-voting-percentage", calculateTotalVotingPercentage);

module.exports = router;
