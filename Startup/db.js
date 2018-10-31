var mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function() {
  mongoose.connect(
    config.get("db"),
    { },
    err => {
      if (err) console.log("Error connecting to DB");
      else{
          console.log(`DB connected to ${config.get("db")}`)
      }
    }
  )
};
