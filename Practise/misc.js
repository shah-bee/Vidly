function Circle(radius) {

    this.radius = radius;

    let defaultLocation = {
        x: 1,
        y: 1
    };
    this.draw = function () {

    }

}



















// const nums = [1, -1, 2, 3];

// const filtered = nums.filter(n => n >=0);
// filtered.sort();

// var mapped = filtered.map(m => ({ value: m}));

// console.log(mapped);

// // function varletexample(){

// //     for(let i=1;i<5;i++){
// //         console.log(i);
// //     }
// //     console.log(i);
// // }

// // varletexample();
// // const video = {
// //     title: 'a',
// //     tags: ['t1','t2','t3'],
// //     play(){
// //         console.log(this);
// //     },
// //     showTags(){
// //         this.tags.forEach((tag) => {
// //             console.log(tag);
// //         })
// //     }
// // }

// // // video.stop = function(){
// // //     console.log(this);
// // // }

// // // //video.play();
// // // video.stop();

// // function playVideo(){
// //     console.log(this);
// // }

// // const vide = playVideo();




// const circle = {

//     radius = 1,

//     draw(){
//         console.log('draw');
//     }
// }

// //cloning

// // const another = {};

// // for(let key in circle){
// //     another[key] = circle[key];
// // }

// const another = Object.assign({
//     color:"Yellow"
// },circle,circle);


// console.log(another);