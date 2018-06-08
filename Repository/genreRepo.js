var mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const genreModel = mongoose.model('genres', genreSchema);
const genreCRUD = {

    async addGenre(params) {
        try {
            const genre = new genreModel({
                name: params.name
            })
            const result =await genre.save();
            return result;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = genreCRUD;