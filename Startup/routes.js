const students = require("../Routes/students");
const users = require("../Routes/users");
const auth = require("../Routes/auth");
const express = require("express");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/students", students);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
