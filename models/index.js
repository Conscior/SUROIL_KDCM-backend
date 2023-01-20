const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const node_env = process.env.NODE_ENV || "development";
const dbParams =
  process.env.DB_URL || require(__dirname + "/../config/dbConfig.js")[node_env];
const db = {};

let sequelize = new Sequelize(dbParams); // Connect to databse either through an url or parameters

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
