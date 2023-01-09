const Order = require("../models/Order");
const OrderLine = require("../models/OrderLine");
const Product = require("../models/Product");
const User = require("../models/User");
const Store = require("../models/Store");

const asyncHandler = require("express-async-handler");

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findAll();
  if (!orders.length) {
    return res.status(400).json({ message: "No orders found." });
  }
  res.json(orders);
});

const getUserOrders = asyncHandler(async (req, res) => {
  const { customer_id } = req.params;
  // if (!user_id) {
  //   res.status(400).json({ message: "" });
  // }
  const user = User.findByPk(customer_id);
  if (!user)
    return res.status(400).json({ message: "Utilisateur introuvable.." });

  const orders = Order.findAll({ where: { customer_id: customer_id } });
  if (!orders || !orders.length)
    return res.status(400).json({ message: "No orders found." });

  res.json(orders);
  // res.json(orders);
});

const createOrder = asyncHandler(async (req, res) => {
  const { customer_id, order_lines, store_id, status } = req.body;

  // Check fields
  if (
    !customer_id ||
    !Array.isArray(order_lines) ||
    !order_lines.length ||
    !store_id ||
    !status
  )
    return res.status(400).json({ message: "Tous les champs sont requis." });

  const customer = User.findByPk(customer_id);
  if (!customer)
    return res.status(400).json({ message: "Utilisateur introuvable." });

  const store = Store.findByPk(store_id);
  if (!store) return res.status(400).json({ message: "Magasin introuvable." });

  // Used to compute the total price and quantity to ensure correct amount
  // let total = 0;
  let quantity = 0;

  // Create the order
  const order = await Order.create({
    customer_id,
    quantity,
    store_id,
    // total,
    status,
  });

  if (!order) {
    res.status(400).json({ message: "Problème lors de la creation du devis." });
  }

  // Create the order lines
  for (let i = 0; i < order_lines.length; i++) {
    const order_line = order_lines[i];
    const product = await Product.findByPk(order_line.product_id);

    if (!product)
      return res
        .status(400)
        .json({ message: "L'un des produits est indisponible." });

    const order_line_res = await OrderLine.create({
      ...order_line, // Should set the product_id and product_quantity
      order_id: order.id,
      // product_price: product.price, // Get the price from the product object to ensure correct amount
      // total: order_line.product_quantity * product.price, // Compute the total price to ensure correct amount
    });

    if (!order_line_res) {
      res
        .status(400)
        .json({ message: "Problème lors de la creation du devis." });
    }

    quantity += order_line.product_quantity;
    // total += order_line.product_quantity * product.price;
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
