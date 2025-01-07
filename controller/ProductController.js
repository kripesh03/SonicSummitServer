const Product = require("../model/Product");
const path = require("path");

// Create a new product
const save = async (req, res) => {
  try {
    const file = req.file; // Get the uploaded file
    const media_url = file ? `/product_images/${file.originalname}` : null; // Store file path in media_url

    const product = new Product({
      ...req.body, // Take all other body fields
      media_url, // Assign the media_url with the file path
    });

    await product.save();
    res.status(201).json(product);
  } catch (e) {
    console.error("Error saving product:", e);
    res.status(500).json({ error: "Error saving product", message: e.message });
  }
};

// Find all products
const findAll = async (req, res) => {
  try {
    const products = await Product.find().populate("artist_id");
    res.status(200).json(products);
  } catch (e) {
    res
      .status(500)
      .json({ error: "Error fetching products", message: e.message });
  }
};

// Find product by ID
const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("artist_id");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (e) {
    console.error("Error finding product by ID:", e);
    res
      .status(500)
      .json({ error: "Error fetching product by ID", message: e.message });
  }
};

// Update product by ID
const updateById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const file = req.file; // Get the uploaded file, if any
  if (file) {
    updateData.media_url = `/product_images/${file.originalname}`; // Update media_url with new file path
  }

  try {
    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("artist_id");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (e) {
    console.error("Error updating product:", e);
    res
      .status(500)
      .json({ error: "Error updating product", message: e.message });
  }
};

// Delete product by ID
const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (e) {
    console.error("Error deleting product:", e);
    res
      .status(500)
      .json({ error: "Error deleting product", message: e.message });
  }
};

module.exports = {
  save,
  findAll,
  findById,
  updateById,
  deleteById,
};
