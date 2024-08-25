const { LocalListing, localListingInformation, Citizen } = require("../models");
const { Op, where, Sequelize } = require("sequelize");

/****************create Local Listing****************** */
exports.createLocalListing = async (req, res) => {
  try {
    // 1. إنشاء دائرة جديدة
    const localList = await LocalListing.create(req.body);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", req.body);
    res.status(201).json({
      message: "Local listing created successfully",
      localListId: localList.listingID,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res
        .status(400)
        .json({ error: "A local listing with this name already exists." });
    } else {
      console.error("Error creating local listing :", error);
      res.status(500).json({ error: "Error creating local listing " });
    }
  }
};

/****************end create Local Listing****************** */
/****************create candidates from local Listing Information****************** */

exports.createlocalListingInformation = async (req, res) => {
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
    const LocalListingInformation = await localListingInformation.create(
      req.body
    );
    res.status(201).json({
      message: "local Listing Information created successfully",
      localListingInformationId: LocalListingInformation.listingInformationID,
    });
  } catch (error) {
    console.error("Error creating local Listing Information:", error);
    res.status(500).json({ error: "Error creating local Listing Information" });
  }
};
/****************end create candidates from local Listing Information****************** */
/****************get local listing information with counts****************** */

exports.getlocalListingInformation = async (req, res) => {
  const { localListingID } = req.params;
  try {
    // Fetch the count of all local listings for the given localListingID
    const localListingCount = await localListingInformation.count({
      where: { localListingID },
    });

    // Fetch counts of each candidacy course for the given localListingID
    const candidacyCounts = await localListingInformation.findAll({
      attributes: [
        [Sequelize.fn("count", Sequelize.col("candidacyCourse")), "count"],
        "candidacyCourse",
      ],
      where: { localListingID },
      group: ["candidacyCourse"],
      raw: true,
    });

    // Process the candidacy counts
    const counts = {
      Female: 0,
      Christian: 0,
      Chechen: 0,
      Muslim: 0,
    };

    candidacyCounts.forEach(({ candidacyCourse, count }) => {
      if (counts.hasOwnProperty(candidacyCourse)) {
        counts[candidacyCourse] = parseInt(count, 10);
      }
    });

    res.status(200).json({
      message: "Local Listing Information retrieved successfully",
      localListingCount,
      counts,
    });
  } catch (error) {
    console.error("Error retrieving local Listing Information:", error);
    res
      .status(500)
      .json({ error: "Error retrieving local Listing Information" });
  }
};
/****************end get local listing information****************** */

/****************get Local Listing****************** */
exports.getLocalListing = async (req, res) => {
  const { listingID } = req.params; // الحصول على listingID من req.params
  try {
    // 1. البحث عن الدائرة بواسطة listingID
    const localList = await LocalListing.findOne({
      where: { listingID: listingID }, // تحديد الشرط للبحث
    });

    // التأكد من أن هناك بيانات
    if (!localList) {
      return res
        .status(404)
        .json({ message: "No local listing found for the given ID." });
    }

    // إرجاع البيانات في استجابة JSON
    res.status(200).json({
      message: "Local listing retrieved successfully",
      localList: localList,
    });
  } catch (error) {
    console.error("Error retrieving local listing:", error);
    res.status(500).json({ error: "Error retrieving local listing" });
  }
};

/****************end get Local Listing****************** */

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

/****************delete Citizen from local Listing Information****************** */
exports.deleteCitizenLocaList = async (req, res) => {
  const { nationalID } = req.params; // الحصول على nationalID من req.params
  try {
    const deletedCitizen = await localListingInformation.destroy({
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
/****************end delete Citizen from local Listing Information****************** */

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
