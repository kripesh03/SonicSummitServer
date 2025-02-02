const express = require("express");
const router = express.Router();
const multer = require("multer");
const { login, register, verifyUser, uploadProfilePicture } = require("../controller/AuthController");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C:/Users/User/Desktop/SonicSummit_Server/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Multer instance
const upload = multer({ storage });

// Register user (Verification Required)
router.post("/register", upload.single("profilePicture"), register);

// Email Verification Endpoint (GET request)
router.get("/verify", verifyUser);  // <-- Change this from POST to GET

// Login user
router.post("/login", login);

// Upload profile picture separately
router.post("/uploadImage", upload.single("profilePicture"), uploadProfilePicture);

module.exports = router;
