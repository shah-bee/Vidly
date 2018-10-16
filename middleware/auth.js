const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.headers["x-auth-token"];

  if (!token)
    return res.status(401).send("Invalid request, token value not provided");

  try {
    const decodedToken = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
};
