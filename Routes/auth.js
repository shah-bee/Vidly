const { User } = require("../models/users");
const config = require("config");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let user = await User.findOne(_.pick(req.body, ["email"]));
  if (!user) res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["username", "email"]));
});

function validate(req) {
  return Joi.validate(req, {
    email: Joi.string()
      .email()
      .required(true),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(true)
  });
}

module.exports = router;
