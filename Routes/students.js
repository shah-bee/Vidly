const express = require("express");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
const mongoose = require("mongoose");
const Joi = require("joi");
const router = express.Router();
const studentSchema = require("../models/students");
const studentModel = mongoose.model("student", studentSchema);
const _ = require("lodash");

router.get("/", async (req, res) => {
  const result = await studentModel.find();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const student = await studentModel.findById(req.params.id);
  if (!student) res.status(404).send("student was not found");
  res.send(student);
});

function ValidateStudent(student) {
  const schema = {
    firstname: Joi.string()
      .min(3)
      .required(),
    lastname: Joi.string().required()
  };
  return Joi.validate(student, schema);
}

// Add/Create a new student
router.post("/", auth,
 async (req, res) => {
  const { error, value } = ValidateStudent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  var student = new studentModel(
    _.pick(req.body, ["firstname", "lastname", "class"])
  );

  await student.save();
  res.send(student);
});

//Update
router.put("/:id", async (req, res) => {
  const student = await studentModel.findByIdAndUpdate(req.params.id, {
    $set: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: null
    },
    new: true
  });

  if (!student) return res.status(404).send("student was not found");

  const { error, value } = ValidateStudent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  res.send(student);
});

// Delete student

router.delete("/:id", async (req, res) => {
  const student = await studentModel.findByIdAndRemove(req.params.id);
  if (!student) return res.status(404).send("student was not found");
  res.send(student);
});

module.exports = router;
