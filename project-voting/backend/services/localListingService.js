// services/localListingService.js
const { LocalListing, Citizen, localListingInformation } = require("../models");
const { Op } = require("sequelize");

class LocalListingService {
  async getLocalListingWithStrugglingMembers() {
    try {
      const result = await LocalListing.findAll({
        attributes: ["listingID", "Name"],
        include: [
          {
            model: localListingInformation,
            attributes: ["nationalID"],
            where: {
              localListingID: {
                [Op.between]: [1, 5],
              },
            },
            include: [
              {
                model: Citizen,
                attributes: ["name"],
                where: {
                  [Op.or]: [{ didVoteLocal: false }, { didVoteParty: false }],
                },
              },
            ],
          },
        ],
      });

      return result.map((listing) => ({
        listingName: listing.dataValues.Name,
        strugglingMembers: listing.dataValues.localListingInformations.map(
          (info) => info.Citizen.name
        ),
      }));
    } catch (error) {
      console.error(
        "Error in getLocalListingWithStrugglingMembers service:",
        error
      );
      throw error;
    }
  }
}

module.exports = new LocalListingService();