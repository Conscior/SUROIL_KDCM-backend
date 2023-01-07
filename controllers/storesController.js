const Store = require("../models/Store");

const asyncHandler = require("express-async-handler");

//Get all active stores
// @access Private
const getStores = asyncHandler(async (req, res) => {
  const stores = await Store.findAll({ where: { active: true } });
  if (!stores.length) {
    res.status(400).json({ message: "Aucun magasin trouvé" });
  }
  res.json(stores);
});

module.exports = { getStores };
