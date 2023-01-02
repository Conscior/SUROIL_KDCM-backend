const { DataTypes } = require("sequelize");
const db = require("./index");

// const User = require("./User");

const Order = db.sequelize.define(
  "Order",
  {
    // Model attributes are defined here
    quantity: {
      type: DataTypes.INTEGER,
      // allowNull defaults to true
    },
    status: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    tableName: "orders",
  }
);

module.exports = Order;
