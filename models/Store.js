const { DataTypes } = require("sequelize");
const db = require("./index");

const Store = db.sequelize.define(
  "Store",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.STRING,
    },
    fax: {
      type: DataTypes.STRING,
    },
    mobile: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: "stores",
  }
);

module.exports = Store;
