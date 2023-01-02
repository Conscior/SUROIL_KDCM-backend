const { DataTypes } = require("sequelize");
const db = require('./index')

const Product = db.sequelize.define(
  "Product",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      // allowNull defaults to true
    },
    imgURL: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    tableName: "products",
  }
);

module.exports = Product;
