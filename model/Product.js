const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    artist_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      default: null,
    },
    price: {
      type: mongoose.Types.Decimal128,
      required: true,
      validate: {
        validator: (value) => value >= 0,
        message: "Price must be a positive number.",
      },
    },
    media_url: {
      type: String,
      default: null,
    },
    stock_quantity: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Stock quantity cannot be negative'],
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
);

const Product = mongoose.model("Product", productSchema); 
module.exports = Product;
