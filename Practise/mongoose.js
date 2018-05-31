var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/mongoose-excercies").then(() => { console.log("DB connected") }).catch((err) => {
    console.log(err);
});

const courseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        author: String,
        date: { type: Date, default: Date.now },
        tags: [String],
        isPublished: Boolean,
        price: Number
    });

const Course = mongoose.model('course', courseSchema);

async function getCourses() {
    try {
        const courses = await Course.find({ isPublished: true }).
            or([{ name: /.*by.*/i }, { price: { $gte: 15 } }])
            .limit(10)
            .sort({ price: -1 });

        console.log("Async await" + courses);
    }
    catch (err) {
        console.log(err);
    }
}

getCourses();

// async function createCourse() {
// const newCourse = new Course({
//     title: 'Bootstrap',
//     author: 'Amera Firdaus',
//     DurationInMonths: 7,
//     price: 25
// });

// const result = await newCourse.save();
// console.log(result);
// }

// createCourse();

// function getCourseById() {
//     try {
//         const courses = Course.findById({
//             _id: "5b0e6bd4940d2a79fcad2439"
//         }, (err, res) => {
//             if (err) {
//                 console.log(err);
//                 return;
//             }
//             console.log("Callback" + res);
//         });
//         console.log("Async await" + courses);
//     }
//     catch (err) {
//         //console.log(err);
//     }
// }

// getCourseById();


