const { DataTypes } = require("sequelize");
const db = require("./index");

// const User = require("./User");

const Category = db.sequelize.define(
  "Category",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    // Other model options go here
    tableName: "categories",
  }
);

module.exports = Category;
