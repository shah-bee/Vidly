const winston = require("winston");
require("express-async-errors");
require("winston-mongodb");

/** Configuring winston */
// const logger = createLogger({
//   transports: [new transports.File({ filename: "combined.log" })],
//   exceptionHandlers: [new transports.File({ filename: "error.log" })],
//   exitOnError: false
// });

module.exports = function() {
  winston.handleExceptions(
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", ex => {
      throw ex;
  });

  winston.add(winston.transports.File, { filename: "combined.log" });

  winston.add(winston.transports.MongoDB, {
    db: "mongodb://localhost:27017/Vidly",
    level: "info"
  });
};
