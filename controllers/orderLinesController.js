const OrderLine = require("../models/OrderLine");
const Product = require("../models/Product");

// Should be vannilla functions (Won't be called from a request)
// Helper functions

const createOrderLine = (lineObj) => {
  const product = Product.findByPk(lineObj.product_id);

  if (!product) {
    throw Error("Product not found.")
  }

  OrderLine.create(lineObj)
};
