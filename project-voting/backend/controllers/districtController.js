
const { Citizen } = require("../models"); // Import Citizen model properly

exports.checkId = async (req, res) => {
  const { nationalID } = req.body;
  console.log("debugging:", req.body);

  try {
    // Query for citizen with the provided nationalID
    const citizen = await Citizen.findOne({
      where: { nationalID: nationalID },
    });

    // If citizen not found, send a 404 response
    if (!citizen) {
      return res.status(404).json({ error: "Citizen not found" });
    }

    // Send the district of the found citizen
    res.json({ district: citizen.district }); // Use citizen.district, not Citizen.district
  } catch (error) {
    console.error("Error checking ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};