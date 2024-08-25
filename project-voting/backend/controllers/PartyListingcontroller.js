// const { PartyListing, PartyListingInformation, Citizen } = require("../models");
// const { Op, where, Sequelize } = require("sequelize");

// /****************create partyID Listing****************** */
// exports.createPartyListing = async (req, res) => {
//   try {
//     // 1. إنشاء دائرة جديدة
//     const partylist = await PartyListing.create(req.body);
//     res.status(201).json({
//       message: "party listing created successfully",
//       partyID: partylist.partyID,
//     });
//   } catch (error) {
//     if (error.name === "SequelizeUniqueConstraintError") {
//       res
//         .status(400)
//         .json({ error: "A party listing with this name already exists." });
//     } else {
//       console.error("Error creating party listing :", error);
//       res.status(500).json({ error: "Error creating party listing " });
//     }
//   }
// };

// /****************end create partyID Listing****************** */
// /****************create candidates from party Listing Information****************** */

// exports.createPartyListingInformation = async (req, res) => {
//   try {
//     // التحقق من وجود nationalID في جدول Citizens

//     const citizen = await Citizen.findOne({
//       where: {
//         nationalID: req.body.nationalID,
//         [Op.or]: [{ isCandidate: false }, { isCandidate: null }],
//       },
//     });

//     // إذا لم يتم العثور على المواطن
//     if (!citizen) {
//       return res
//         .status(400)
//         .json({ error: "Citizen with this nationalID does not exist" });
//     }

//     // إنشاء السجل إذا كان nationalID موجودًا
//     const partyListingInformation = await PartyListingInformation.create(
//       req.body
//     );
//     res.status(201).json({
//       message: "party Listing Information created successfully",
//       partyListingInformationId: PartyListingInformation.partyInformationID,
//     });
//   } catch (error) {
//     console.error("Error creating party Listing Information:", error);
//     res.status(500).json({ error: "Error creating party Listing Information" });
//   }
// };
// /****************end create candidates from party Listing Information****************** */

// /****************delete Citizen from party Listing Information****************** */
// exports.deleteCitizenPartyList = async (req, res) => {
//   const { nationalID } = req.params; // الحصول على nationalID من req.params
//   try {
//     const deletedCitizen = await PartyListingInformation.destroy({
//       where: { nationalID: nationalID },
//     });

//     if (deletedCitizen) {
//       res.status(200).json({
//         message: "Citizen information deleted successfully",
//       });
//     } else {
//       res.status(404).json({ error: "Citizen not found" });
//     }
//   } catch (error) {
//     console.error("Error deleting citizen", error);
//     res.status(500).json({ error: "Error deleting citizen" });
//   }
// };
// /****************end delete Citizen from party Listing Information****************** */
const { PartyListing, PartyListingInformation, Citizen } = require("../models");
const { Op, where, Sequelize } = require("sequelize");

/****************create partyID Listing****************** */
exports.createPartyListing = async (req, res) => {
  try {
    // 1. إنشاء دائرة جديدة

    const partylist = await PartyListing.create(req.body);
    res.status(201).json({
      message: "party listing created successfully",
      partyID: partylist.partyID,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res
        .status(400)
        .json({ error: "A party listing with this name already exists." });
    } else {
      console.error("Error creating party listing :", error);
      res.status(500).json({ error: "Error creating party listing " });
    }
  }
};

/****************end create partyID Listing****************** */
/****************create candidates from party Listing Information****************** */

exports.createPartyListingInformation = async (req, res) => {
  try {
    // التحقق من وجود nationalID في جدول Citizens

    const citizen = await Citizen.findOne({
      where: {
        nationalID: req.body.nationalID,
        [Op.or]: [{ isCandidate: false }, { isCandidate: null }],
      },
    });

    // إذا لم يتم العثور على المواطن
    if (!citizen) {
      return res
        .status(400)
        .json({ error: "Citizen with this nationalID does not exist" });
    }

    // إنشاء السجل إذا كان nationalID موجودًا
    const partyListingInformation = await PartyListingInformation.create(
      req.body
    );
    res.status(201).json({
      message: "party Listing Information created successfully",
      partyListingInformationId: partyListingInformation.partyInformationID,
    });
  } catch (error) {
    console.error("Error creating party Listing Information:", error);
    res.status(500).json({ error: "Error creating party Listing Information" });
  }
};
/****************end create candidates from party Listing Information****************** */

/****************delete Citizen from party Listing Information****************** */
exports.deleteCitizenPartyList = async (req, res) => {
  const { nationalID } = req.params; // الحصول على nationalID من req.params
  try {
    const deletedCitizen = await PartyListingInformation.destroy({
      where: { nationalID: nationalID },
    });

    if (deletedCitizen) {
      res.status(200).json({
        message: "Citizen information deleted successfully",
      });
    } else {
      res.status(404).json({ error: "Citizen not found" });
    }
  } catch (error) {
    console.error("Error deleting citizen", error);
    res.status(500).json({ error: "Error deleting citizen" });
  }
};
/****************end delete Citizen from party Listing Information****************** */
/****************get Party Listing****************** */
exports.getPartyListing = async (req, res) => {
  const { partyID } = req.params; // الحصول على listingID من req.params
  try {
    // 1. البحث عن الدائرة بواسطة listingID
    const partyList = await PartyListing.findOne({
      where: { partyID: partyID }, // تحديد الشرط للبحث
    });

    // التأكد من أن هناك بيانات
    if (!partyList) {
      return res
        .status(404)
        .json({ message: "No party listing found for the given ID." });
    }

    // إرجاع البيانات في استجابة JSON
    res.status(200).json({
      message: "Party listing retrieved successfully",
      partyList: partyList,
    });
  } catch (error) {
    console.error("Error retrieving party listing:", error);
    res.status(500).json({ error: "Error retrieving party listing" });
  }
};

/****************end get Party Listing****************** */
/****************get party listing information with counts****************** */
exports.getpartyListingInformation = async (req, res) => {
  const { partyListingID } = req.params;
  try {
    // Fetch the count of all party listings for the given partyListingID
    const partyListingCount = await PartyListingInformation.count({
      where: { partyListingID },
    });

    // Initialize counts object to store candidacy counts
    const counts = {};

    // Fetch counts of each candidacy course for the given partyListingID
    const candidacyCounts = await PartyListingInformation.findAll({
      attributes: [
        [Sequelize.fn("count", Sequelize.col("candidacyCourse")), "count"],
        "candidacyCourse",
      ],
      where: { partyListingID },
      group: ["candidacyCourse"],
      raw: true,
    });

    // Populate the counts object with the retrieved data
    candidacyCounts.forEach(({ candidacyCourse, count }) => {
      counts[candidacyCourse] = parseInt(count, 10);
    });

    res.status(200).json({
      message: "Party Listing Information retrieved successfully",
      partyListingCount,
      counts,
    });
  } catch (error) {
    console.error("Error retrieving party Listing Information:", error);
    res
      .status(500)
      .json({ error: "Error retrieving party Listing Information" });
  }
};

/****************end get party listing information****************** */
/****************get Citizen****************** */
exports.getCitizen = async (req, res) => {
  const { nationalID } = req.params; // الحصول على nationalID من req.params
  try {
    const citizen = await Citizen.findOne({
      where: { nationalID: nationalID }, // تحديد الشرط للبحث
    });

    // التأكد من أن هناك بيانات
    if (!citizen) {
      return res
        .status(404)
        .json({ message: "No citizen found for the given ID." });
    }

    // التحقق من isCandidate
    if (citizen.isCandidate === true) {
      return res.status(400).json({ message: " العضو مرشح بقائمة اخرى" });
    }

    // إذا كان isCandidate غير موجود أو false، أعد المواطن
    res.status(200).json({
      message: "Citizen information retrieved successfully",
      citizen: citizen,
    });
  } catch (error) {
    console.error("Error retrieving citizen", error);
    res.status(500).json({ error: "Error retrieving citizen" });
  }
};

/****************end get Citizen****************** */
/****************edit Citizen****************** */
exports.editCitizen = async (req, res) => {
  const { nationalID } = req.params; // الحصول على nationalID من req.params

  try {
    const citizen = await Citizen.findOne({
      where: { nationalID: nationalID }, // تحديد الشرط للبحث
    });

    // التأكد من أن هناك بيانات
    if (!citizen) {
      return res
        .status(404)
        .json({ message: "No citizen found for the given ID." });
    }

    // التحقق من isCandidate
    if (citizen.isCandidate === true) {
      return res.status(400).json({ message: " العضو مرشح بقائمة اخرى" });
    }

    // تحديث بيانات المواطن
    await Citizen.update(
      {
        isCandidate: true, // تحديث isCandidate إذا كان موجودًا في req.body
      },
      {
        where: { nationalID: nationalID }, // تحديد المواطن باستخدام nationalID
      }
    );

    res.status(200).json({
      message: "Citizen information updated successfully",
      citizen: citizen,
    });
  } catch (error) {
    console.error("Error updating citizen", error);
    res.status(500).json({ error: "Error updating citizen" });
  }
};

/****************end edit Citizen****************** */
