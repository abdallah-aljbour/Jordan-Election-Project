// controllers/localListingController.js
const { LocalListing, localListingInformation, Citizen } = require("../models");
const { Op } = require("sequelize");
exports.getLocalListings = async (req, res) => {
  try {
    const localListings = await LocalListing.findAll({
      attributes: ["Name", "votingCount"],
      where: {
        listingID: [6, 7, 8],
      },
    });

    res.json(localListings);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getTotalVotingCount = async (req, res) => {
  try {
    const totalVotingCount = await LocalListing.sum("votingCount", {
      where: {
        listingID: [6, 7, 8],
      },
    });

    res.json({ totalVotingCount });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getThreshold = async (req, res) => {
  try {
    const totalVotingCount = await LocalListing.sum("votingCount", {
      where: {
        listingID: [6, 7, 8],
      },
    });

    const threshold = 0.07 * totalVotingCount;

    res.json({ threshold });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getVotesAboveThreshold = async (req, res) => {
  try {
    // Calculate the total voting count
    const totalVotingCount = await LocalListing.sum("votingCount", {
      where: {
        listingID: [1, 2, 3, 4, 5],
      },
    });

    if (totalVotingCount === null) {
      return res
        .status(404)
        .json({ error: "No voting data found for the specified listings." });
    }

    // Calculate the threshold
    const threshold = 0.07 * totalVotingCount;

    // Fetch local listings where votingCount is greater than the threshold
    const localListings = await LocalListing.findAll({
      attributes: ["listingID", "Name", "votingCount"],
      where: {
        listingID: [6, 7, 8],
        votingCount: {
          [Op.gt]: threshold,
        },
      },
    });

    // Calculate the total sum of votingCount for listings above the threshold
    const totalVotesAboveThreshold = localListings.reduce(
      (sum, listing) => sum + listing.votingCount,
      0
    );

    // Calculate the result for each listing and retrieve citizens
    const results = await Promise.all(
      localListings.map(async (listing) => {
        const result =
          ((listing.votingCount / totalVotesAboveThreshold) * 100 * 10) / 100;
        const seatsWon = Math.floor(result);

        // Retrieve top citizens for this listing based on votingCount
        const topCitizens = await localListingInformation.findAll({
          where: { localListingID: listing.listingID },
          include: [
            {
              model: Citizen,
              attributes: ["nationalID", "name"],
            },
          ],
          order: [["votingCount", "DESC"]],
          limit: seatsWon,
        });

        return {
          ...listing.toJSON(),
          result,
          seatsWon,
          citizens: topCitizens.map((info) => ({
            nationalID: info.Citizen.nationalID,
            name: info.Citizen.name,
            votingCount: info.votingCount,
          })),
        };
      })
    );

    // Respond with listings, total votes above threshold, and citizens
    res.json({
      listings: results,
      totalVotesAboveThreshold,
    });
  } catch (error) {
    console.error("Error retrieving local listings above threshold:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
