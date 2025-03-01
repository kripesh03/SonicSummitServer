const Product = require("../model/Product");

// Create a new product
const postAProduct = async (req, res) => {
  try {
    const { title, artistName, description, old_price, new_price, category, trending } = req.body;

    const productImage = req.files["productImage"] 
  ? `/images/${req.files["productImage"][0].filename}`
  : null;


    const productFile = req.files["productFile"] ? req.files["productFile"][0].path : null;

    const newProduct = new Product({
      title,
      artistName,
      description,
      old_price,
      new_price,
      category,
      trending,
      productImage,
      productFile,
    });

    await newProduct.save();
    res.status(200).send({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error creating product", error);
    res.status(500).send({ message: "Failed to create product" });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).send({ message: "Failed to fetch products" });
  }
};

// Get a single product by ID
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found!" });
    }
    res.status(200).send(product);
  } catch (error) {
    console.error("Error fetching product", error);
    res.status(500).send({ message: "Failed to fetch product" });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedFields = { ...req.body };

    if (req.files["productImage"]) {
      updatedFields.productImage = `/images/${req.files["productImage"][0].filename}`;
    }
    
    if (req.files["productFile"]) {
      updatedFields.productFile = req.files["productFile"][0].path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found!" });
    }
    res.status(200).send({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product", error);
    res.status(500).send({ message: "Failed to update product" });
  }
};

// Delete a product by ID
const deleteAProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found!" });
    }
    res.status(200).send({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(500).send({ message: "Failed to delete product" });
  }
};

module.exports = {
  postAProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteAProduct,
};
