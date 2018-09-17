var mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  surname: String,
  dateofbirth: { type: Date, default: Date.now() },
  Address: {
    street: String,
    housenumber: String,
    zipcode: Number,
    landmark: String,
    city: String,
    state: String
  },
  mobile: Number,
  previousinstitution: String,
  section: String,
  class: String,
  });

module.exports = studentSchema;
