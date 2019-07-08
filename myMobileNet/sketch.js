let myMobileNet;
let yolo;

let img;

function preload() {
 myMobileNet = ml5.imageClassifier('MobileNet');
//  myMobileNet = ml5.imageClassifier('Darknet');
 img = loadImage('picasso.jpg');
}

function setup() {
  // createCanvas(500,500);
  // background(51);
  console.log("myMobileNet: ", myMobileNet)
  myMobileNet.classify(img, gotResult);
}

function gotResult(error, result) {
  if (error) {
    console.error(error);
  }

  console.log(result);
  createDiv('This piece is a mix of a ' + result[0].label + ' and a ' + result[1].label + ' and a ' + result[2].label );
}

function draw() {


}