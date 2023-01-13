// const User = require("../models/User");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//Get all users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  // const users = await User.find().select("-password").lean();
  const users = await User.findAll();
  if (!users?.length) {
    res.status(400).json({ message: "No users found." });
  }
  res.json(users);
});

//Create new user
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, email, password, roles } = req.body;

  //confirm data
  if (
    !username ||
    !email ||
    !password ||
    !Array.isArray(roles)
    // !roles.length
  )
    return res.status(400).json({ message: "Tous les champs sont requis." });

  // Check for duplicate
  const duplicate = await User.findOne({ where: { email } }); //TODO check if this works
  if (duplicate)
    return res.status(409).json({ message: "Email déjà utilisé." });

  // Hash the password
  const hashedPwd = await bcrypt.hash(password, 10); //salt rounds

  // Create user object
  const userObj = {
    username,
    email,
    password: hashedPwd,
    roles: roles.length ? roles : ["Customer"],
  };

  // Create & store new user
  const user = await User.create(userObj);
  if (user) {
    res
      .status(201)
      .json({ message: `Utilisateur ${username} créé avec succès.` });
  } else {
    res.status(400).json({
      message: "Une erreur est survenue lors de la création d'un utilisateur.",
    });
  }
});

// Update a user
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { id, firstname, lastname, address, phone_number } = req.body;

  // Confirm data
  if (!id) res.status(400).json({ message: "Identifiant manquant." });

  if (!firstname && !lastname && !address && !phone_number)
    res.status(400).json({ message: "Aucun champ à mettre à jour." });

  const user = await User.findByPk(id);
  if (!user)
    return res.status(404).json({ message: "Utilisateur introuvable." });

  try {
    await user.update({
      firstname,
      lastname,
      address,
      phone_number,
    });
    res.json({ message: `User ${updateUser.username} updated.` });
  } catch (error) {
    res.status(404).json({ message: "Problème lors de la mises à jour des champs." });
  }
});

//delete a user
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID required." });
  }

  const user = User.findByPk(id);
  if (!user) {
    res.status(400).json({ message: "User not found." });
  }

  const result = await user.destroy();

  res.json({
    message: `User ${result.username} with ID ${result.id} deleted.`,
  });
});

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
