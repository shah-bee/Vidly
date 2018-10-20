const winston = require("winston");
require("winston-mongodb");
const express = require("express");
require("express-async-errors");
const students = require("./Routes/students");
const users = require("./Routes/users");
const auth = require("./Routes/auth");
const morgan = require("morgan");
const path = require("path");
const config = require("config");
var mongoose = require("mongoose");

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: Private key is not defined");
  process.exit();
}

mongoose
  .connect("mongoDB://localhost:27017/Vidly")
  .then((onfulfilled, onrejected) => {
    if (onfulfilled) {
      console.log("Connected to MongoDB");
    }
    if (onrejected) {
      console.log("Error on connection");
    }
  });

var app = express();

winston.handleExceptions(
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

winston.add(winston.transports.File, { filename: "combined.log" });

winston.add(winston.transports.MongoDB, {
  db: "mongodb://localhost:27017/Vidly",
  level: "info"
});


/** Configuring winston */
// const logger = createLogger({
//   transports: [new transports.File({ filename: "combined.log" })],
//   exceptionHandlers: [new transports.File({ filename: "error.log" })],
//   exitOnError: false
// });

app.use(express.json());
app.use(morgan("tiny"));
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/students", students);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
