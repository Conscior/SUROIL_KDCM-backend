const { DataTypes } = require("sequelize");
const db = require('./index')


const OrderLine = db.sequelize.define(
  "OrderLine",
  {
    // Model attributes are defined here
    product_quantity: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    tableName: "order_lines",
  }
);

module.exports = OrderLine;
