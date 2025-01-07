const express = require("express");
const { addReview, getReviews, deleteReview, getAllReviews } = require("../controller/ReviewController");
const router = express.Router();

// Add a review
router.post("/add", addReview);

// Get all reviews for a specific product
router.get("/:product_id", getReviews);

// Get all reviews (for all products)
router.get("/", getAllReviews);  // New route to get all reviews

// Delete a review
router.delete("/:id", deleteReview);

module.exports = router;
