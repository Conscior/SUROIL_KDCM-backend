const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for fields
  if (!email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  // Check if user exists
  const foundUser = await User.findOne({ where: { email, active: true } });

  if (!foundUser || !foundUser?.active) {
    return res.status(401).json({ message: "Mauvais email ou mot de passe." });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match)
    return res.status(401).json({ message: "Mauvais email ou mot de passe." });

  // Create user obj with info to send
  const userInfo = {
    id: foundUser.id,
    email: foundUser.email,
    username: foundUser.username,
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
    roles: foundUser.roles,
  };

  // Data to be signed through jwt
  const dataToSign = {
    email: foundUser.email,
    roles: foundUser.roles,
  };

  //Create access token
  const accessToken = jwt.sign(dataToSign, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  // Create refresh token
  const refreshToken = jwt.sign(dataToSign, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "10d",
  });

  // Create an httpOnly cookie to stock the refreshToken
  res.cookie("jwt", refreshToken, {
    httpOnly: true, // Accessible only by web browser
    secure: false, // Https (TODO: turn to true)
    sameSite: "none", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //Set to match the refresh token
  });

  // Send access Token with UserInfo
  res.json({ accessToken, userInfo });
});

const refresh = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res
      .status(401)
      .json({ message: "Non autorisé - (No cookie from client)" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Non autorisé." });

      const foundUser = await User.findOne({ where: { email: decoded.email } });

      if (!foundUser) return res.status(401).json({ message: "Non autorisé" });

      const userInfo = {
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        roles: foundUser.roles,
      };

      const dataToSign = {
        email: foundUser.email,
        roles: foundUser.roles,
      };

      const accessToken = jwt.sign(
        dataToSign,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.json({ accessToken, userInfo });
    })
  );
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.json({ message: "Cookie cleared and user signed out." });
};

module.exports = { login, refresh, logout };
