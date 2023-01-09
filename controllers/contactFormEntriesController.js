const ContactFormEntry = require("../models/ContactFormEntry");

const asyncHandler = require("express-async-handler");

const createContactFormEntry = asyncHandler(async (req, res) => {
  const { customer_name, customer_email, store_id, message } = req.body;

  if (!customer_name || !customer_email || !store_id || !message) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  const contactFormEntry = await ContactFormEntry.create({
    customer_name,
    customer_email,
    store_id,
    message,
  });

  if (!contactFormEntry) {
    res
      .status(400)
      .json({ message: "Problème lors de l'envoi du formulaire." });
  }

  res.status(201).json({ message: "Formulaire envoyé." });
});

module.exports = {
  createContactFormEntry,
};
