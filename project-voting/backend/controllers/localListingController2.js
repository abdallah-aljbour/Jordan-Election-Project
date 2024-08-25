const localListingService = require("../services/localListingService2");

class LocalListingController {
  async getLocalListingWithStrugglingMembers(req, res) {
    try {
      const result =
        await localListingService.getLocalListingWithStrugglingMembers();
      res.json(result);
    } catch (error) {
      console.error("Error in getLocalListingWithStrugglingMembers:", error);
      res.status(500).json(error);
    }
  }
}

module.exports = new LocalListingController();