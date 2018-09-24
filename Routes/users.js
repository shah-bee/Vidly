const { User, validate } = require("../models/users");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const result = await User.find();
  if (!result) return res.status(400).send("user not found!");
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const result = await User.findOne(req.params.id);
  if (!result) return res.status(400).send("user not found!");
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let result = await User.find(_.pick(req.body, ["username", "email"]));
  if (result) res.status(400).send("Already user exists.");

  let user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  const salt = await bcrypt.genSalt(10);
  user.password =await bcrypt.hash(user.password, salt);

  await user.save();
  res.send(user);
});

module.exports = router;
