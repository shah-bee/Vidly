

module.exports = function(err, req, res, next) {
  if (err) {
    res.status(500).send("Something went wrong!", err.message);
  }
  next();
};
