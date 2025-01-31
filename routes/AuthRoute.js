const express = require("express");
const router = express.Router();
const multer = require("multer");
const { login, register } = require("../controller/AuthController");
const { authenticateToken } = require("../security/Auth");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    // Change this path to a directory where you want to store user profile pictures
    cb(null, "C:/Users/User/Desktop/SonicSummit_Server/images");
  },
  filename: function (req, file, cb) {
    // Set the filename to original file name
    cb(null, Date.now() + "-" + file.originalname); // Optional: adding timestamp to avoid name conflicts
  },
});

// Create Multer instance
const upload = multer({ storage });

// Register route with profile picture upload
router.post("/register", upload.single("profile_picture"), register); // 'profile_picture' field is handled here

// Login route
router.post("/login", login);

module.exports = router;
