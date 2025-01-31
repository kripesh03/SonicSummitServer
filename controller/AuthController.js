const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Credential = require("../model/Credentials");
const SECRET_KEY = "8261ba19898d0dcefe6c0c411df74b587b2e54538f5f451633b71e39f957cf01";

const register = async (req, res) => {
    try {
        const { username, email, password, bio } = req.body;
        const profilePicture = req.file ? req.file.filename : ""; // Store only the filename

        // Check if user exists
        const existingUser = await Credential.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to DB
        const cred = new Credential({
            username,
            email,
            password: hashedPassword,
            profilePicture, // Use correct field name
            bio: bio || "",
        });

        await cred.save();

        res.status(201).json({ message: "User registered successfully", user: cred });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const cred = await Credential.findOne({ username });
        if (!cred) {
            return res.status(403).json({ message: "Invalid username or password" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, cred.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: "Invalid username or password" });
        }

        // Generate token
        const token = jwt.sign({ username: cred.username }, SECRET_KEY, { expiresIn: "2h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

// Upload profile picture separately
const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const filePath = req.file.filename; // Store only the filename

        res.json({ message: "Image uploaded successfully", data: filePath });
    } catch (error) {
        res.status(500).json({ message: "Error uploading image", error: error.message });
    }
};

module.exports = { register, login, uploadProfilePicture };
