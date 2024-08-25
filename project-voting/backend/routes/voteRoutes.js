// routes/voteRoutes.js
const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteController");

router.post("/submit-vote", voteController.submitVote);

//
router.get("/check-vote/:nationalID", voteController.checkVoteStatus);
router.post("/update-vote-status/:nationalID", voteController.updateVoteStatus);

module.exports = router;
