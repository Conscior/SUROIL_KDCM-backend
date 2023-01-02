const db = require("./index");
const User = require("./User");
const Product = require("./Product");
const Category = require("./Category");
const Order = require("./Order");
const OrderLine = require("./OrderLine");

const syncAssociation = () => {
  // Order table
  // Add customer_id field in order table (Many2One relationship - One User may have many orders)
  User.hasMany(Order, {
    foreignKey: "customer_id",
  });
  Order.belongsTo(User, {
    foreignKey: "customer_id",
  });

  // order_lines Table
  // Add order_id field in order_lines table (Many2One)
  Order.hasMany(OrderLine, {
    foreignKey: "order_id",
  });
  OrderLine.belongsTo(Order, {
    foreignKey: "order_id",
  });
  // Add product_id field in order_lines table (Many2one)
  Product.hasMany(OrderLine, {
    foreignKey: "product_id",
  });
  OrderLine.belongsTo(Product, {
    foreignKey: "product_id",
  });

  // products table
  // Add category_id field in products table ()
  Category.hasMany(Product, {
    foreignKey: "category_id",
  });
  Product.belongsTo(Category, {
    foreignKey: "category_id",
  });

  // categories table
  // Add parent field in categories table ()
  Category.hasMany(Category, {
    foreignKey: "parent",
  });
  Category.belongsTo(Category, {
    foreignKey: "parent",
  });
};

module.exports = syncAssociation;
