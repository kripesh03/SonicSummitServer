const Product = require("../model/Product");

// Search products with filters, sorting, and pagination
const searchProducts = async (req, res) => {
  const { search, minPrice, maxPrice, sortBy, sortOrder, page = 1, limit = 10 } = req.query;

  try {
    // Build query object
    let query = {};

    // Search by name or title
    if (search) {
      query.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice); // Greater than or equal to minPrice
      if (maxPrice) query.price.$lte = parseFloat(maxPrice); // Less than or equal to maxPrice
    }

    // Apply sorting (default: by createdAt descending)
    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1; // 1 for ascending, -1 for descending
    } else {
      sortOptions.createdAt = -1; // Default to newest products first
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    // Total count for pagination metadata
    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      products,
      pagination: {
        totalProducts,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProducts / limit),
      },
    });
  } catch (e) {
    console.error("Error searching products:", e);
    res.status(500).json({ error: "Error searching products", message: e.message });
  }
};

module.exports = { searchProducts };
