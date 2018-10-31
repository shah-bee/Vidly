const config = require("config");

module.exports = function() {
  if (!config.get("jwtPrivateKey")) {
    console.log("FATAL ERROR: Private key is not defined");
    process.exit();
  }
};
