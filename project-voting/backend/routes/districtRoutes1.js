const express = require("express");
const router = express.Router();
const {
  getVotingPercentageByDistrict,
} = require("../controllers/districtController1");

// مسار لحساب نسبة الاقتراع على مستوى الدائرة
// router.get('/districts/:districtID', getVotingPercentageByDistrict);
// تأكد من أن المسار يستخدم districtName إذا كان هذا هو المطلوب
router.get("/districts/:districtName", getVotingPercentageByDistrict);

module.exports = router;
