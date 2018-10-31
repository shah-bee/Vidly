



const auth = require("../middleware/auth");
const { User, Validate } = require("../models/users");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.get("/", auth, async (req, res) => {
  const result = await User.find();
  if (!result) return res.status(400).send("user not found!");
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const result = await User.findOne(req.params.id);
  if (!result) return res.status(400).send("user not found!");
  res.send(result);
});

router.post("/",  async (req, res) => {
  const { error, value } = Validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let result = await User.findOne(_.pick(req.body, ["username", "email"]));
  if (result) return res.status(400).send("Already user exists.");

  let user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  //jwt.verify()
  res.header("x-auth-token", token).send(_.pick(user, ["username", "email"]));
});

module.exports = router;
