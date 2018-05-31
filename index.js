const express = require("express");
const genre = require("./Route/genre");
const morgan = require("morgan");
const path = require("path");
const config = require("config");
var mongoose = require('mongoose');

mongoose.connect("mongoDB://localhost:27017/Vidly").then((onfulfilled,onrejected) => {
    if(onfulfilled){
        console.log('Connected to MongoDB');
    }

    if(onrejected){
        console.log('Error on connection');
    }
});

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type:Date, default: Date.now },
    isPublished: Boolean
})

const Courses = mongoose.model('Courses', courseSchema);
const course = new Courses({
 name: "nodeJs learning",
 author: "Mr Shah",
 tags: ["node","backend"],
 isPublished: true
});

course.save((err,course)=> {
    if(err) return console.error(err);
    return console.log(course);
});

var app = express();
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', genre);

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`);
});