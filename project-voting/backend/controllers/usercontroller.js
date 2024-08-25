const bcrypt = require("bcrypt"); // For hashing passwords
const jwt = require("jsonwebtoken"); // For generating JWTs
const { Citizen } = require('../models');
const { JWT_SECRET } = require("../config/jwtconfig");

// Commented out signup method
// exports.signup = async (req, res) => {
//   try {
//     const { username, password, first_name, last_name, email } = req.body;

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user in the database
//     const newUser = await Citizen.create({
//       NationalID: username, // Assuming username is the NationalID
//       name: `${first_name} ${last_name}`,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({ message: "User created successfully", user: newUser });
//   } catch (error) {
//     console.error('Error in signup:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

exports.login = async (req, res) => {
  try {
    const { nationalID, password } = req.body;
console.log(Citizen);
    // Find the user in the database
    const user = await Citizen.findOne({ where: { nationalID: nationalID } });
   
    if (user) {
      // Compare the provided password with the hashed password
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { id: user.nationalID, username: user.name },
          JWT_SECRET,
          { expiresIn: '1h' }
        );

        res.json({ token });
      } else {
        res.status(400).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: error.message });
  }
};

