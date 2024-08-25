const { districts, Citizen } = require("../models");

// حساب نسبة الاقتراع لدائرة معينة
const getVotingPercentageByDistrict = async (req, res) => {
  try {
    const { districtName } = req.params; //ياخذ المرر بال url
    console.log("districtName ", districtName);

    // التحقق من صحة districtName
    if (!districtName) {
      return res.status(400).json({ error: "District name is required" });
    }

    // الحصول على بيانات الدائرة باستخدام districtName
    // const district = await districts.findOne({
    //   where: { districtName },
    // });
    // الحصول على بيانات الدائرة باستخدام districtName
    const district = await districts.findOne({
      where: { districtName },
      attributes: ["votingCount", "districtID", "districtName"], // تحديد الأعمدة المراد إرجاعها
    });

    if (!district) {
      return res.status(404).json({ error: "District not found" });
    }

    // الحصول على votingCount من جدول districts
    const votingCount = district.votingCount;

    // الحصول على عدد المواطنين من جدول Citizens حيث district يساوي districtName
    const citizenCount = await Citizen.count({
      where: { district: districtName }, // التأكد من أن جدول Citizen يحتوي على عمود district
    });
    console.log("citizencount", citizenCount);

    if (citizenCount === 0) {
      return res
        .status(400)
        .json({ error: `No citizens found in district ${districtName}` });
    }

    // حساب النسبة
    const votingPercentage = (votingCount / citizenCount) * 100;

    return res.status(200).json({ votingPercentage });
  } catch (error) {
    console.error("Error calculating voting percentage:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getVotingPercentageByDistrict };
