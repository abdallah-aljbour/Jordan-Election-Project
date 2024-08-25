const { PartyListing } = require("../models");

exports.getParties = async (req, res) => {
  try {
    console.log("hello");
    const parties = await PartyListing.findAll({
      attributes: ["partyID", "Name"],
    });
    console.log(parties);
    res.json(parties);
  } catch (error) {
    console.error("Error fetching parties:", error);
    res.status(500).json({ error: "Failed to fetch parties" });
  }
};

exports.recordVote = async (req, res) => {
  try {
    const { partyID } = req.params;
    await PartyListing.increment("votingCount", { where: { partyID } });
    res.json({ message: "Vote recorded successfully" });
  } catch (error) {
    console.error("Error recording vote:", error);
    res.status(500).json({ error: "Failed to record vote" });
  }
};
