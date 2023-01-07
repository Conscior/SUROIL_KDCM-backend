const { DataTypes } = require("sequelize");
const db = require("./index");

const ContactFormEntries = db.sequelize.define(
  "ContactFormEntries",
  {
    // customer_id : FK
    // store_id : FK
    customer_name: {
      type: DataTypes.TEXT,
    },
    customer_email: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.TEXT,
    },
  },
  {
    // Other model options go here
    tableName: "contact_form_entries",
  }
);

module.exports = ContactFormEntries;
