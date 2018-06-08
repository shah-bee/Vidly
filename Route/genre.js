const express = require('express');
const Joi = require('joi');
const router = express.Router();
const genreDB = require('../Repository/genreRepo');

//Gets all genres.
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

router.get("/api/genres", (req, res) => {
    res.send(JSON.stringify(genres));
});

//Get genre by id.

router.get("/api/genre/:id", (req, res) => {
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
router.post("/api/genres", (req, res) => {

    const { error, value } = ValidateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    var genre = {
        name: req.body.name
    }
    genreDB.addGenre(genre);
//    genres.push(genre);
    res.send(genre);
});

//Update
router.put("/api/genres/:id", (req, res) => {

    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("genre was not found");

    const { error, value } = ValidateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    genre.name = req.body.name;
    res.send(genre);
});

// Delete Genre

router.delete("/api/generes/:id", (req, res) => {

    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("genre was not found");

    const index = genres.indexOf(genre);

    genres.slice(index, 1);

    res.send(genre);

});

module.exports = router;