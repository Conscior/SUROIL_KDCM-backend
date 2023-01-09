const db = require("./index");
const User = require("./User");
const Product = require("./Product");
const Category = require("./Category");
const Order = require("./Order");
const OrderLine = require("./OrderLine");
const Store = require("./Store");
const ContactFormEntry = require("./ContactFormEntry");
const AfterSaleServiceFormEntry = require("./AfterSaleServiceFormEntry");

const syncAssociation = () => {
  /*
    orders table
    Add customer_id field in order table (Many2one relationship)
    Add store_id field in order table (Many2one relationship)
  */
  User.hasMany(Order, {
    foreignKey: "customer_id",
  });
  Order.belongsTo(User, {
    foreignKey: "customer_id",
  });

  Store.hasMany(Order, {
    foreignKey: "store_id",
  });
  Order.belongsTo(Store, {
    foreignKey: "store_id",
  });

  /* 
    order_lines Table
    Add order_id field in order_lines table (Many2one relationship)
    Add product_id field in order_lines table (Many2one relationship)
  */
  Order.hasMany(OrderLine, {
    foreignKey: "order_id",
  });
  OrderLine.belongsTo(Order, {
    foreignKey: "order_id",
  });

  Product.hasMany(OrderLine, {
    foreignKey: "product_id",
  });
  OrderLine.belongsTo(Product, {
    foreignKey: "product_id",
  });

  /* 
    products Table
    Add category_id field in products table (Many2one relationship)
  */
  Category.hasMany(Product, {
    foreignKey: "category_id",
  });
  Product.belongsTo(Category, {
    foreignKey: "category_id",
  });

  /*
    categories table
    Add parent field in categories table (Many2one relationship)
  */
  Category.hasMany(Category, {
    foreignKey: "parent",
  });
  Category.belongsTo(Category, {
    foreignKey: "parent",
  });

  /*
    contact_form_entries table
    Add store_id field (Many2one relationship)
  */
  Store.hasMany(ContactFormEntry, {
    foreignKey: "store_id",
  });
  ContactFormEntry.belongsTo(Store, {
    foreignKey: "store_id",
  });

  /*
    after_sale_service_form_entries table
    Add customer_id field (Many2one relationship)
  */
  User.hasMany(ContactFormEntry, {
    foreignKey: "customer_id",
  });
  AfterSaleServiceFormEntry.belongsTo(User, {
    foreignKey: "customer_id",
  });
};

module.exports = syncAssociation;
