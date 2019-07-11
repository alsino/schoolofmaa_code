let video;
let bodyPix;
let noseX, noseY;
let leftEyeX, leftEyeY;
let rightEyeX, rightEyeY;

let options = {
  "multiplier": 0.75, // 1.0, 0.75, or 0.50, 0.25
  "outputStride": 16, // 8, 16, or 32, default is 16
  "segmentationThreshold": 0.5 // 0 - 1, defaults to 0.5 
}


function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES);

  video = createCapture(VIDEO);
  video.size(600,400);
  video.hide();

  bodypix = ml5.bodyPix(video,options,  modelLoaded);
}

function modelLoaded() {
  console.log("Model Loaded!");
  bodypix.segment(gotResults);
}


function gotResults (error, results){
  if(error){
    console.error(error);
    return
  }
  if (results && results.maskPerson) {
    // console.log(results);
    // fill(0);
    // image(video, 0,0);
    background(0,0,255);
    // image(results.maskBackground, 0, 0, width, height)
    // let img = image(results.maskPerson, 0, 0, width, height)

    let img = results.maskPerson;

    img.loadPixels();

    for (let i = 0; i < img.width; i++) {
      for (let j = 0; j < img.height; j++) {

        const pixelColor = img.get(i, j);
        // console.log(pixelColor);

        if(pixelColor[3] == 255){

          // mask color
          img.set(i, j, color(i, j, 102));
          // console.log("this is white")
        } else {
          
          // background color
          img.set(i, j, color(j,i, 6));
          // console.log("this is black")
        }
      }
    }
    img.updatePixels();


    image(img, 0, 0);

    bodypix.segment(gotResults)

  }
}


function draw (){
  

}