const Product = require("../models/Product");

const asyncHandler = require("express-async-handler");

//Get all users
// @access Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll();
  // console.log(products);
  if (!products.length) {
    res.status(400).json({ message: "No product found." });
  }
  res.json(products);
});

module.exports = { getProducts };
