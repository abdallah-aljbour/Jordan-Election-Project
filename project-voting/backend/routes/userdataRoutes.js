const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userdataController");
const { updateUserEmail } = require("../controllers/userdataController");
const { getVotingStats } = require("../controllers/userdataController"); //عدد المقترعين محلي وحزبي
const { getnumcandidate } = require("../controllers/userdataController");
const { updateAdStatus } = require("../controllers/dashadvertisingcontroller");
// مسار لجلب جميع المستخدمين
router.get("/users", getAllUsers);

router.get("/users", getAllUsers);

// مسار لتحديث البريد الإلكتروني لمستخدم معين باستخدام nationalID
router.put("/api/users/:nationalID", updateUserEmail); //اول سي بالباث من السيرفر app.use('/test', userdata);//duaa /test
// للحصول على عدد المقترعين محلي وحزبي
router.get("/votingstats", getVotingStats);
//مسار للحصول على  عدد المرشحين
router.get("/candidate", getnumcandidate);

// مسار الحصول على معلومات الاعلانات dashadvertisingcontroller page
const {
  getPaidAdvertisements,
} = require("../controllers/dashadvertisingcontroller");
// مسار لجلب الإعلانات المدفوعة
router.get("/paid-ads", getPaidAdvertisements);
//مسار لتحديث حالة الإعلان
router.put("/advertisements/:advertismentID", updateAdStatus);

module.exports = router;
