const { DataTypes } = require("sequelize");
const db = require("./index");

const ContactFormEntry = db.sequelize.define(
  "ContactFormEntry",
  {
    // customer_id : FK
    customer_firstname: {
      type: DataTypes.TEXT,
    },
    customer_lastname: {
      type: DataTypes.TEXT,
    },
    customer_email: {
      type: DataTypes.STRING,
    },
    email_header: {
      type: DataTypes.STRING,
    },
    // store_id : FK
    message: {
      type: DataTypes.TEXT,
    },
  },
  {
    // Other model options go here
    tableName: "contact_form_entries",
  }
);

module.exports = ContactFormEntry;
