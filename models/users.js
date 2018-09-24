const mongoose = require("mongoose");
const joi = require("joi");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
  username: { type: String, minlength: 5, maxlength: 1024, required: true },
  email: { type: String, minlength: 5, maxlength: 1024, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model("user", userSchema);

function Validate(user) {
  const schema = {
    username: joi
      .string()
      .min(5)
      .max(255)
      .required(),
    email: joi
      .string()
      .email()
      .required(true),
    password: joi
      .string()
      .min(5)
      .max(255)
      .required(true)
  };
  return joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = Validate;
