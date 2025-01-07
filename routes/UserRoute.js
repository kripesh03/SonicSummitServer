const express = require("express");
const { findAll, save, findById, deleteById, updateById } = require("../controller/UserController");
const router = express.Router();

router.get("/", findAll); // Get all users
router.post("/", save); // Save a new user
router.get("/:id", findById); // Get a user by ID
router.delete("/:id", deleteById); // Delete a user by ID
router.put("/:id", updateById); // Update a user by ID (use PUT for full update)

module.exports = router;
