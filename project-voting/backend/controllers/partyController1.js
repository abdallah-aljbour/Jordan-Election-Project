const { PartyListing, Citizen } = require("../models");

// دالة لحساب نسبة التصويت لجميع الأحزاب مجتمعة
const calculateTotalVotingPercentage = async (req, res) => {
  try {
    // حساب إجمالي المواطنين الذين يحق لهم التصويت
    const totalVoters = await Citizen.count();
    console.log(totalVoters);

    // حساب إجمالي عدد الأصوات المدلى بها لجميع الأحزاب
    const totalVotes = await PartyListing.sum("votingCount");

    // حساب نسبة التصويت الإجمالية
    const votingPercentage = (totalVotes / totalVoters) * 100;

    // إرجاع البيانات كـ JSON
    return res.json({ totalVotingPercentage: votingPercentage.toFixed(2) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = {
  calculateTotalVotingPercentage,
};
