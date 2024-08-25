const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { Citizen } = require("../models");
const twilio = require("twilio");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "bn7bkn@gmail.com",
    pass: "eohi lche vyaz kufz",
  },
});

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.checkNationalId = async (req, res, next) => {
  const { nationalID, verificationType } = req.body;
  console.log("verificationType , nationalID :", verificationType);
  try {
    console.log("Checking national ID:", nationalID);

    const user = await Citizen.findOne({ where: { nationalID: nationalID } });
    console.log(
      "Phone number to send OTP hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh:",
      user
    );

    if (user) {
      if (user.password) {
        console.log("User already has a password");
        return res.json({
          success: false,
          message: "You have already signed up",
          alreadySignedUp: true,
        });
      }

      const OTP = Math.floor(100000 + Math.random() * 900000).toString();
      console.log("User found, generating OTP");

      await user.update({ OTP });

      console.log("OTP stored in database");

      if (verificationType === "email") {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "Your One-Time Password",
          text: `Your OTP is: ${OTP}`,
        });
        console.log("Email sent");
        console.log("Phone number to send OTP:", user.phoneNumber);
      } else if (verificationType === "phone") {
        await twilioClient.messages.create({
          body: `Your OTP is: ${OTP}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: user.phoneNumber,
        });
        console.log("SMS sent");
      }

      res.json({
        success: true,
        message: `OTP sent to your ${verificationType}`,
      });
    } else {
      console.log("National ID not found");
      res
        .status(404)
        .json({ success: false, message: "National ID not found" });
    }
  } catch (error) {
    console.error("Server error:", error);
    next(error);
  }
};

exports.verifyOTP = async (req, res, next) => {
  const { nationalID, OTP } = req.body;

  try {
    console.log("Verifying OTP for national ID:", nationalID);

    const user = await Citizen.findOne({
      where: { nationalID: nationalID, OTP },
    });

    if (user) {
      console.log("OTP verified successfully");
      res.json({ success: true, user });
    } else {
      console.log("Invalid OTP");
      res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Server error:", error);
    next(error);
  }
};

exports.setNewPassword = async (req, res, next) => {
  const { nationalID, newPassword } = req.body;

  try {
    console.log("Setting new password for national ID:", nationalID);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await Citizen.findOne({ where: { nationalID: nationalID } });

    if (user) {
      await user.update({ password: hashedPassword, OTP: null });
      console.log("Password updated successfully");
      res.json({ success: true, message: "Password updated successfully" });
    } else {
      console.log("National ID not found");
      res
        .status(404)
        .json({ success: false, message: "National ID not found" });
    }
  } catch (error) {
    console.error("Server error:", error);
    next(error);
  }
};
