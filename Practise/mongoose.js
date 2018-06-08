var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/mongoose-excercies").then(() => { console.log("DB connected") }).catch((err) => {
    console.log(err);
});

const courseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        author: String,
        date: { type: Date, default: Date.now },
        tags: {
            type: Array,
            validate:
                {
                    isAsync: true,
                    validator: function (v,Callback) {
                       setTimeout(() => {
                        var result = v &&  v.length > 0;
                        Callback(result);
                       }, 3000); 
                    },
                    message: 'Á course should have atleast one tag'

                }
        },
        isPublished: { type: Boolean },
        price: {
            type: Number, required: function () {
                return this.isPublished;
            }
        },
        category: {
            type: String,
            required: true,
            enum: ['web', 'mobile', 'network']
        }
    });

const Course = mongoose.model('course', courseSchema);

// async function getCourses() {
//     try {
//         const courses = await Course.find({ isPublished: true }).
//             or([{ name: /.*by.*/i }, { price: { $gte: 15 } }])
//             .limit(10)
//             .sort({ price: -1 });

//         console.log("Async await" + courses);
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// getCourses();

async function createCourse() {
    try {
        const newCourse = new Course({
            name: 'Taher',
            title: 'Bootstrap',
            author: 'Amera Firdaus',
            isPublished: true,
            tags: [],
            DurationInMonths: 7,
            category: 'web',
            price: 25
        });

        const result = await newCourse.save();
        console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
    }

}

createCourse();

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


