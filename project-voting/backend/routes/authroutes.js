const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');

router.post('/check-id', (req, res, next) => {
  console.log('Received request to /check-id:', req.body);
  authController.checkNationalId(req, res, next);
});

router.post('/verify-otp', (req, res, next) => {
  console.log('Received request to /verify-otp:', req.body);
  authController.verifyOTP(req, res, next);
});

router.post('/set-password', (req, res, next) => {
  console.log('Received request to /set-password:', req.body);
  authController.setNewPassword(req, res, next);
});

module.exports = router;