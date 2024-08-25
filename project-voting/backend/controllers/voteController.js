// voteController.js
const {
  sequelize,
  LocalListing,
  localListingInformation,
  Citizen,
} = require("../models");

exports.submitVote = async (req, res) => {
  const { selectedListing, selectedMembers } = req.body;
  const t = await sequelize.transaction();

  try {
    // Update LocalListing
    await LocalListing.increment("votingCount", {
      by: 1,
      where: { Name: selectedListing },
      transaction: t,
    });

    // Fetch the listingID and nationalIDs in a single query
    const listing = await LocalListing.findOne({
      attributes: ["listingID"],
      where: { Name: selectedListing },
      transaction: t,
    });

    if (!listing) {
      throw new Error("Listing not found");
    }

    const listingID = listing.listingID;

    for (const member of selectedMembers) {
      const citizen = await Citizen.findOne({
        attributes: ["nationalID"],
        where: { name: member },
        transaction: t,
      });

      if (!citizen) {
        throw new Error(`Citizen ${member} not found`);
      }

      const nationalID = citizen.nationalID;

      await localListingInformation.increment("votingCount", {
        by: 1,
        where: {
          localListingID: listingID,
          nationalID: nationalID,
        },
        transaction: t,
      });
    }

    await t.commit();
    res.json({ success: true, message: "Vote submitted successfully" });
  } catch (error) {
    await t.rollback();
    console.error("Error submitting vote:", error);
    res.status(500).json({ success: false, message: "Error submitting vote" });
  }
};

exports.checkVoteStatus = async (req, res) => {
  const { nationalID } = req.params;
  try {
    const citizen = await Citizen.findOne({
      where: { nationalID },
    });
    if (!citizen) {
      return res.status(404).json({ hasVoted: false });
    }
    res.json({ hasVoted: citizen.didVoteLocal });
  } catch (error) {
    console.error("Error checking vote status:", error);
    res.status(500).json({ message: "Error checking vote status" });
  }
};

exports.updateVoteStatus = async (req, res) => {
  const { nationalID } = req.params;
  try {
    await Citizen.update(
      { didVoteLocal: true },
      {
        where: { nationalID },
      }
    );
    res.json({ success: true, message: "Vote status updated" });
  } catch (error) {
    console.error("Error updating vote status:", error);
    res.status(500).json({ message: "Error updating vote status" });
  }
};
