const asyncHandler = require("express-async-handler");

const AfterSaleServiceFormEntry = require("../models/AfterSaleServiceFormEntry");
const User = require("../models/User");

const createAfterSaleServiceFormEntry = asyncHandler(async (req, res) => {
  const {
    customer_id,
    customer_firstname,
    customer_lastname,
    customer_email,
    customer_tel,
    company_name,
    company_rc,
    company_nif,
    machine_serial_number,
    machine_brand,
    is_pro,
    description,
  } = req.body;

  if (is_pro) {
    if (
      !company_name ||
      !company_rc ||
      !company_nif ||
      !customer_email ||
      !customer_tel ||
      !machine_serial_number ||
      !machine_brand ||
      !description
    )
      return res.status(400).json({ message: "Tous les champs sont requis." });
  } else if (!is_pro) {
    if (
      !customer_firstname ||
      !customer_lastname ||
      !customer_email ||
      !customer_tel ||
      !machine_serial_number ||
      !machine_brand ||
      !description
    ) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }
  } else
    return res.status(400).json({
      message:
        "Veuillez préciser si vous êtes une entreprise ou un particulier.",
    });

  const user = await User.findByPk(customer_id);

  if (!user)
    return res.status(400).json({ message: "Utilisateur introuvable." });

  const afterSaleServiceFormEntry = await AfterSaleServiceFormEntry.create({
    customer_id,
    customer_firstname,
    customer_lastname,
    customer_email,
    customer_tel,
    company_name,
    company_rc,
    company_nif,
    machine_serial_number,
    machine_brand,
    is_pro,
    description,
  });

  if (!afterSaleServiceFormEntry) {
    res
      .status(400)
      .json({ message: "Problème lors de l'envoi du formulaire." });
  }

  res.status(201).json({ message: "Formulaire envoyé." });
});

module.exports = {
  createAfterSaleServiceFormEntry,
};
