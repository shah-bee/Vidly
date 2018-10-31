const express = require("express");
const morgan = require("morgan");
const path = require("path");

var app = express();
require("./Startup/routes")(app);
require("./Startup/logging")();
require("./Startup/db")();
require("./Startup/config")();

app.use(morgan("tiny"));
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.static(path.join(__dirname, "public")));

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
