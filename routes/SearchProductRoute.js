const express = require("express");
const { searchProducts } = require("../controller/SearchProductController");
const router = express.Router();

// Search products route
router.get("/", searchProducts);

module.exports = router;
