const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "8261ba19898d0dcefe6c0c411df74b587b2e54538f5f451633b71e39f957cf01";
const Credential = require("../model/Credentials");

const register = async (req, res) => {
    try {
        const { username, email, password, bio } = req.body;
        const profile_picture = req.file ? req.file.path : ""; // Save the file path to the database

        // Check if username or email already exists
        const existingUser = await Credential.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new credential
        const cred = new Credential({
            username,
            email,
            password: hashedPassword,
            profile_picture: profile_picture, // Save profile picture path
            bio: bio || "" // Default empty string for bio
        });

        await cred.save(); // Save user to the database

        res.status(201).json({ message: "User registered successfully", cred });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};


const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const cred = await Credential.findOne({ username });
    if (!cred) {
      return res.status(403).json({ message: "Invalid username or password" });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, cred.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ username: cred.username }, SECRET_KEY, {
      expiresIn: "2h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

module.exports = {
  register,
  login,
};
