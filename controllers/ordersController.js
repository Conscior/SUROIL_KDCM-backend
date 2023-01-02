const Order = require("../models/Order");
const OrderLine = require("../models/OrderLine");
const Product = require("../models/Product");
const User = require("../models/User");

const {} = require("./orderLinesController");

const asyncHandler = require("express-async-handler");

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findAll();
  if (!orders.length) {
    return res.status(400).json({ message: "No orders found." });
  }
  res.json(orders);
});

const getUserOrders = asyncHandler(async (req, res) => {
  const { user_id } = req.params;
  // if (!user_id) {
  //   res.status(400).json({ message: "" });
  // }
  const user = User.findByPk(user_id);
  if (!user) return res.status(400).json({ message: "User not found." });

  const orders = Order.findAll({ where: { customer_id: user_id } });
  if (!orders || !orders.length)
    return res.status(400).json({ message: "No orders found." });

  res.json(orders);
  // res.json(orders);
});

const createOrder = asyncHandler(async (req, res) => {
  const { customer_id, order_lines, status } = req.body;

  // Check fields
  if (
    !customer_id ||
    !Array.isArray(order_lines) ||
    !order_lines.length ||
    !status
  )
    return res.status(400).json({ message: "All fields are required." });

  // Used to compute the total price and quantity to ensure correct amount
  // let total = 0;
  let quantity = 0;

  // Create the order
  const order = await Order.create({
    customer_id,
    quantity,
    // total,
    status,
  });

  // Create the order lines
  for (let i = 0; i < order_lines.length; i++) {
    const line = order_lines[i];
    const product = await Product.findByPk(line.product_id);

    if (!product)
      return res
        .status(400)
        .json({ message: "One of the products aren't available" });

    await OrderLine.create({
      ...line, // Should set the product_id and product_quantity
      order_id: order.id,
      // product_price: product.price, // Get the price from the product object to ensure correct amount
      // total: line.product_quantity * product.price, // Compute the total price to ensure correct amount
    });
    quantity += line.product_quantity;
    // total += line.product_quantity * product.price;
  }

  // Update Order with the calculated total and quantity
  order.update({
    quantity: quantity,
    // total: total,
  });
  await order.save();

  res.status(201).json({ message: `Order created.` });
});

const updateOrder = asyncHandler(async (req, res) => {});

const deleteOrder = asyncHandler(async (req, res) => {
  const { order_id } = req.params;

  if (!order_id)
    return res.status(400).json({ message: "Order ID is required." });

  const order = await Order.findByPk(order_id);

  if (!order) return res.status(400).json({ message: "Order not found." });

  await order.Destroy(); // Try this
});

module.exports = {
  getOrders,
  getUserOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
