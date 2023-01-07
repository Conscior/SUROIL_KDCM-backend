const Product = require("../models/Product");

const asyncHandler = require("express-async-handler");

//Get all active products
// @access Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll({ where: { active: true } });
  if (!products.length) {
    res.status(400).json({ message: "No product found." });
  }
  res.json(products);
});

module.exports = { getProducts };
