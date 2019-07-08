// let myMobileNet;
// let myVideo;
// var capture;

// let div;

// function preload() {
//  myMobileNet = ml5.imageClassifier('MobileNet');
//  capture = createCapture(VIDEO);

// }

// function setup() {
//   frameRate(2);
//   div = createDiv();
// }

// function draw() {

//   myMobileNet.predict(capture, function(err, results) {
//     console.log(results[0].label);
//     // createDiv(results[0].label)
//     div.html("I am a " + results[0].label)
//   });
// }


let myMobileNet;
let myVideo;
let myDiv;


function preload() {
  myMobileNet = ml5.imageClassifier('MobileNet');
  myVideo = createCapture(VIDEO);
}

function setup() {
  myMobileNet.classify(myVideo, gotResults);
  myDiv = createDiv('...');
}

function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {
    // console.log(results);
    setTimeout(function(){
      myMobileNet.classify(myVideo, gotResults);
    },1000)

    myDiv.html(`Label: ${results[0].label}`);

    
  }
}
