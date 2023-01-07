require("dotenv").config();
const path = require("path");
const express = require("express");
const { logger, logEvent } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const helmet = require("helmet");

const db = require("./models/index");
const syncAssociation = require("./models/association");

const PORT = process.env.PORT || 3500;

// Connecting to the database - test the connection - Sync all models and associations
// (Sequelize will keep the connection open by default)
// connectDB();
try {
  db.sequelize.authenticate();
  db.sequelize.sync({ alter: true });
  syncAssociation();
  console.log("\nConnected to db ...");
} catch (error) {
  console.log("Error while connecting to db");
}

// Initialize express app
const app = express();

// Middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use("/", express.static(path.join(__dirname, "public")));

// Routers
app.use("/", require("./routes/root"));
app.use("/users", require("./routes/user.js"));
app.use("/auth", require("./routes/auth.js"));
app.use("/products", require("./routes/product.js"));
app.use("/categories", require("./routes/category.js"));
app.use("/orders", require("./routes/order.js"));
app.use("/stores", require("./routes/store"));
app.use("/contactFormEntries", require("./routes/contactFormEntry"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
