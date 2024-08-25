// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const districtCheck = require("../controllers/districtController");
router.post("/check-id", districtCheck.checkId);

module.exports = router;