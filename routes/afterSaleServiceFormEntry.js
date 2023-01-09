const express = require("express");
const router = express.Router();
const afterSaleServiceFormEntriesController = require("../controllers/afterSaleServiceFormEntriesController");

router.route("/").post(afterSaleServiceFormEntriesController.createAfterSaleServiceFormEntry);

module.exports = router;
