const express = require("express");
const Joi = require('joi');

var app = express();

app.use(express.json());

var genres = [{
        id: 1,
        name: "Action"
    }, {
        id: 2,
        name: "Drama"
    },
    {
        id: 3,
        name: "Horror"
    }
];


//Gets all genres.

app.get("/api/genres", (req, res) => {
    res.send(JSON.stringify(genres));
});

//Get genre by id.

app.get("/api/genre/:id", (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) res.status(404).send("Genre was not found");
    res.send(genre);
});

function ValidateGenre(genre) {

    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}


// Add/Create a new genre
app.post("/api/genres", (req, res) => {

    const { error, value } = ValidateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    var genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
});

//Update
app.put("/api/genres/:id", (req, res) => {

    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("genre was not found");

    const { error, value } = ValidateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    genre.name = req.body.name;
    res.send(genre);
});

// Delete Genre

app.delete("/api/generes/:id", (req,res) => {

    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("genre was not found");

    const index = genres.indexOf(genre);

    genres.slice(index, 1);

    res.send(genre);

});

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`);
});