const { DataTypes } = require("sequelize");
const db = require("./index");

const AfterSaleServiceFormEntry = db.sequelize.define(
  "AfterSaleServiceFormEntry",
  {
    // customer_id : FK
    customer_firstname: {
      type: DataTypes.STRING,
    },
    customer_lastname: {
      type: DataTypes.STRING,
    },
    company_name: {
      type: DataTypes.STRING,
    },
    company_rc: {
      type: DataTypes.STRING,
    },
    company_nif: {
      type: DataTypes.STRING,
    },
    customer_email: {
      type: DataTypes.STRING,
    },
    customer_tel: {
      type: DataTypes.STRING,
    },
    machine_serial_number: {
      type: DataTypes.STRING,
    },
    machine_brand: {
      type: DataTypes.STRING,
    },
    is_pro: {
      type: DataTypes.BOOLEAN,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    // Other model options go here
    tableName: "after_sale_service_form_entries",
  }
);

module.exports = AfterSaleServiceFormEntry;
