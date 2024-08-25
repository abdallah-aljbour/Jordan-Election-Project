const { Advertisment, Citizen } = require("../models");

const getPaidAdvertisements = async (req, res) => {
  try {
    const paidAds = await Advertisment.findAll({
      where: { isPaid: true },
      attributes: [
        "advertismentID",
        "pictuer",
        "title",
        "description",
        "isApproved",
      ],
      include: {
        model: Citizen,
        as: "advertiser",
        attributes: ["name"],
      },
    });

    res.status(200).json(paidAds);
  } catch (error) {
    console.error("Error fetching paid advertisements:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// دالة لتحديث حالة الإعلان
const updateAdStatus = async (req, res) => {
  const { advertismentID } = req.params;
  const { isApproved } = req.body;

  try {
    const ad = await Advertisment.findByPk(advertismentID);

    if (!ad) {
      return res.status(404).json({ error: "Advertisement not found" });
    }

    ad.isApproved = isApproved;
    await ad.save();

    res.status(200).json(ad);
  } catch (error) {
    console.error("Error updating advertisement status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getPaidAdvertisements,
  updateAdStatus,
};
