const Product = require("../model/Product");

// Get all products
const findAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products); // Return all products including stock_quantity
  } catch (e) {
    console.error("Error fetching products:", e);
    res.status(500).json({ error: "Error fetching products", message: e.message });
  }
};

// Create a new product
const save = async (req, res) => {
  try {
    const { artist_id, title, description, price, media_url, stock_quantity } = req.body;
    const newProduct = new Product({
      artist_id,
      title,
      description,
      price,
      media_url,
      stock_quantity: stock_quantity || 0, // Default to 0 if not provided
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (e) {
    console.error("Error saving product:", e);
    res.status(500).json({ error: "Error saving product", message: e.message });
  }
};

// Get product by ID
const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product); // Return the product including stock_quantity
  } catch (e) {
    console.error("Error finding product by ID:", e);
    res.status(500).json({ error: "Error fetching product by ID", message: e.message });
  }
};

// Update product by ID
const updateById = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, media_url, stock_quantity } = req.body;

  try {
    if (stock_quantity < 0) {
      return res.status(400).json({ error: "Stock quantity cannot be negative" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        media_url,
        stock_quantity: stock_quantity || 0, // Default to 0 if not provided
      },
      { new: true } // Ensure the updated document is returned
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(updatedProduct); // Return the updated product
  } catch (e) {
    console.error("Error updating product:", e);
    res.status(500).json({ error: "Error updating product", message: e.message });
  }
};

// Delete product by ID
const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (e) {
    console.error("Error deleting product:", e);
    res.status(500).json({ error: "Error deleting product", message: e.message });
  }
};

module.exports = {
  findAll,
  save,
  findById,
  updateById,
  deleteById,
};
