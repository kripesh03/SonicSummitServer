const mongoose = require("mongoose");
const Review = require("../model/Review");
const Product = require("../model/Product");

const addReview = async (req, res) => {
  try {
    const { product_id, rating, comment, user_id } = req.body;

    // Check if the product exists
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the user_id is provided
    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Create the new review with the user_id from the request body
    const review = new Review({
      user_id, // Use the user_id from the request body
      product_id,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error("Error adding review:", error);
    res
      .status(500)
      .json({ error: "Error adding review", message: error.message });
  }
};

// Get all reviews for a specific product
const getReviews = async (req, res) => {
  const { product_id } = req.params;

  // Validate the product ID format
  if (!mongoose.Types.ObjectId.isValid(product_id)) {
    return res.status(400).json({ error: "Invalid product ID format" });
  }

  try {
    // Get all reviews for the specific product
    const reviews = await Review.find({ product_id })
      .populate("user_id", "username") // Populate with user information (username)
      .exec();

    if (!reviews || reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this product" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res
      .status(500)
      .json({ error: "Error fetching reviews", message: error.message });
  }
};

// Get all reviews (for all products)
const getAllReviews = async (req, res) => {
  try {
    // Get all reviews from the database
    const reviews = await Review.find()
      .populate("user_id", "username") // Populate with user information (username)
      .exec();

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    res
      .status(500)
      .json({ error: "Error fetching all reviews", message: error.message });
  }
};

// Delete a review (without authentication)
const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the review exists
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Delete the review using deleteOne instead of remove
    await Review.deleteOne({ _id: id });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res
      .status(500)
      .json({ error: "Error deleting review", message: error.message });
  }
};

module.exports = {
  addReview,
  getReviews,
  deleteReview,
  getAllReviews,
};
