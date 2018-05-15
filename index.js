const express = require("express");
const genre = require("./Route/genre");
const morgan = require("morgan");
const path = require("path");
const config = require("config");

var app = express();
app.use(express.json());
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', genre);

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`);
});