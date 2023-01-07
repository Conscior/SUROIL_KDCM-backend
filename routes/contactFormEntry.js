const express = require("express");
const router = express.Router();
const contactFormEntriesController = require("../controllers/contactFormEntriesController");

router.route("/").post(contactFormEntriesController.createContactFormEntry);

module.exports = router;
