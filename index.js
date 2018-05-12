const express = require("express");
const genre = require("./Route/genre");
const morgan = require("morgan");
const debug = require("config");

var app = express();
app.use(express.json());


app.use('/',genre);

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`);
});