const { DataTypes } = require("sequelize");
const db = require("./index");

const User = db.sequelize.define(
  "User",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    tableName: "users",
  }
);

//Assocations
//Create customerId field in the order table (One To One)
// User.hasMany(Order, {
//   foreignKey: 'customer_id'
// });
// Order.belongsTo(User, {
//   foreignKey: 'customer_id'
// })

module.exports = User;
