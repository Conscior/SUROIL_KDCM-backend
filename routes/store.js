const express = require("express");
const router = express.Router();
const storesController = require("../controllers/storesController");

router.route("/").get(storesController.getStores);

module.exports = router;
