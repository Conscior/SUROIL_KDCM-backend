require("dotenv").config({ path: __dirname + "/../../.env" });

const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT } = process.env;

const dbConfig = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: "suroil_kdcm_dev",
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    logging: false, // Turn to True if we want sql queries output
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: "suroil_kdcm_test",
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: "suroil_kdcm",
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    logging: false,
  },
};

module.exports = dbConfig;
