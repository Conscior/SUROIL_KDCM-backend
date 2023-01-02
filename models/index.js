const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/dbConfig.js")[env];
const db = {};

// Import models
// const User = require("./User");
// const Product = require("./Product");
// const Order = require("./Order");
// const Order_Product = require("./Order_Product");

// Sequelize logic

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// const syncAssociations = () => {
//   // Order table
//   // Add customer_id field in order table (Many2One relationship - One User may have many orders)
//   User.hasMany(Order, {
//     foreignKey: "customer_id",
//   });
//   Order.belongsTo(User, {
//     foreignKey: "customer_id",
//   });

//   // order_product Table
//   // Add order_id field in order_product table (Many2One)
//   Order.hasMany(Order_Product, {
//     foreignKey: "order_id",
//   });
//   Order_Product.belongsTo(Order, {
//     foreignKey: "order_id",
//   });
//   // Add product_id field in order_product table (Many2one)
//   Product.hasMany(Order_Product, {
//     foreignKey: "product_id",
//   });
//   Order_Product.belongsTo(Product, {
//     foreignKey: "product_id",
//   });
// };

// const connectDB = () => {
//   db.sequelize
//     .authenticate()
//     .then(() => console.log("\nConnected to DB ... \n"))
//     .catch((err) => console.log(err));
// };

// const syncDB = () => {
//   try {
//     db.sequelize.sync({ alter: true });
//     syncAssociations();
//   } catch (error) {}
// };

// module.exports = { connectDB };