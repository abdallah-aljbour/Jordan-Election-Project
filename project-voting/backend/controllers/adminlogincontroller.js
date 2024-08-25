// controllers/adminController.js
const { Admin } = require("../models");
const jwt = require("jsonwebtoken");

const adminController = {
  login: async (req, res) => {
    try {
      const { name, password } = req.body;
      const admin = await Admin.findOne({ where: { name } });

      if (!admin || admin.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: admin.id, isAdmin: true },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.json({ token, redirectUrl: "/admin-dashboard" });
    } catch (error) {
      console.error("Error in adminController.login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = adminController;
