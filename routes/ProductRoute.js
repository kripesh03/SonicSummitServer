const express = require("express");
const {
  save,
  findAll,
  findById,
  updateById,
  deleteById,
} = require("../controller/ProductController");
const router = express.Router();

const multer = require("multer");
const { authenticateToken } = require("../security/Auth");
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "C:/Users/User/Desktop/SonicSummit_Server/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Get all products
router.get("/", findAll);

// Create a new product
router.post("/",authenticateToken, upload.single("file"), save);

// Get product by ID
router.get("/:id",  findById);

// Update product by ID
router.put("/:id",authenticateToken, upload.single("file"), updateById);

// Delete product by ID
router.delete("/:id",authenticateToken, deleteById);

module.exports = router;
