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
  const { userName, email, password, roles } = req.body;

  //confirm data
  if (
    !userName ||
    !email ||
    !password ||
    !Array.isArray(roles)
    // !roles.length
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ where: { email } }); //TODO check if this works
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate email." });
  }

  // Hash the password
  const hashedPwd = await bcrypt.hash(password, 10); //salt rounds

  // Create user object
  const userObj = {
    userName,
    email,
    password: hashedPwd,
    roles: roles.length ? roles : ["Customer"],
  };

  // Create & store new user
  const user = await User.create(userObj);
  if (user) {
    res.status(201).json({ message: `New user ${userName} created.` });
  } else {
    res.status(400).json({ message: "Invalid user data received." });
  }
});

// Update a user
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, email, password, roles, active } = req.body;

  // Confirm data
  if (
    !id ||
    !username ||
    !email ||
    Array.isArray(!roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    res.status(400).json({ message: "All fields are required." });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  //check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username." }); // add email
  }

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    //hash password
    user.password = await bcrypt.hash(password, 10);
  }

  const updateUser = await user.save();

  res.json({ message: `User ${updateUser.username} updated.` });
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
