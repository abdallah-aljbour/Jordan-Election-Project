// routes/adminroutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminlogincontroller");

router.post("/login", adminController.login);

module.exports = router;
