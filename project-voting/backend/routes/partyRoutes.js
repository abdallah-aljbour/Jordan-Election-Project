const express = require("express");
const router = express.Router();
const partyController = require("../controllers/partyController");

router.get("/parties", partyController.getParties);
router.post("/vote/:partyID", partyController.recordVote);

module.exports = router;
