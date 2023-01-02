const Category = require("../models/Category");

const asyncHandler = require("express-async-handler");

//Get all active categories
// @access Private
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.findAll();
  if (!categories.length) {
    res.status(400).json({ message: "No category found." });
  }
  res.json(categories);
});

module.exports = { getCategories };
