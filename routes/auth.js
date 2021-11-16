const express = require("express");
const User = require("../model/User");
const router = express.Router();
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

// Register Route

router.post("/register", async (req, res) => {
  // validating the request body wiht joy
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exists");

  // Salting and hasing the password
  const salt = await bycrypt.genSalt(10);
  const hashPassword = await bycrypt.hash(req.body.password, salt);

  // Creating the user object
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  // Saving the user to the database

  try {
    const savedUser = await user.save(console.log("saved new user"));
    res.send({ user: user._id });
  } catch (err) {
    res.statusCode(400).send(err);
  }
});

// Login route

router.post("/login", async (req, res) => {
  // Validating input data from form
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error);

  // Checking if user already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password is wrong");

  // Checking if password if correct
  const validPassword = await bycrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("email or password incorrect");

  // Creating and assigning a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
