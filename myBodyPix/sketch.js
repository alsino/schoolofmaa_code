let canvas;
let songText;
let video;
// let bodyPix;
let mouthIsOpen = true;
let songIsPlaying = false;
let maskIsDrawn = true;
let maskButton;

let poses;
let noseX, noseY;
let leftEyeX, leftEyeY;
let rightEyeX, rightEyeY;
let rightWristX, rightWristY;

let bodypixOptions = {
  "multiplier": 0.25, // 1.0, 0.75, or 0.50, 0.25
  "outputStride": 8, // 8, 16, or 32, default is 16
  "segmentationThreshold": 0.5 // 0 - 1, defaults to 0.5 
}

let poseNetOptions = {
    "imageScaleFactor": 0.3,
    "outputStride": 8,
    "flipHorizontal": false,
    "minConfidence": 0.5,
    "maxPoseDetections": 5,
    "scoreThreshold": 0.5,
    "nmsRadius": 20,
    "detectionType": 'single',
    "multiplier": 0.75
   }

function preload(){
  eyeRight = loadImage("img/eye_right.png");
  eyeLeft = loadImage("img/eye_left.png");
  nose = loadImage("img/nose.png");
  mouth = loadImage("img/mouth.png");
  mouthClosed = loadImage("img/mouth_closed.png");

  eyeBrowRight = loadImage("img/eyebrow_right.png");
  eyeBrowLeft = loadImage("img/eyebrow_left.png");

  song = loadSound('sound/1.mp3');

  jayZ = loadImage("img/jay.png");
  songJay = loadSound('sound/hardknocklife.mp3');

  
}



function setup() {
  canvas = createCanvas(600, 400);
  canvas.parent("#wrapper")
  canvas.elt.style.transform = "scaleX(-1)";

  angleMode(DEGREES);

  video = createCapture(VIDEO);
  video.size(600,400);
  video.parent("#wrapper");
  // video.hide();

  video.elt.style.transform = "scaleX(-1)";

  songText = createDiv("");
  songText.class("songText");
  songText.parent("#wrapper");

  const songsongText = `Say my name, say my name \<br>
  If no one is around you \<br>
  Say baby I love you \<br>
  If you ain't runnin' game \<br>
  Say my name, say my name \<br>
  You actin' kinda shady \<br>
  Ain't callin' me baby`;

  // songText.html(songsongText);

  // bodypix = ml5.bodyPix(video, bodypixOptions,  modelLoaded);

  poseNet = ml5.poseNet(video, poseNetOptions, modelLoaded);

  maskButton = createButton("Toggle mask");
  maskButton.mousePressed(toggleMask);

}

function toggleMask(){
  maskIsDrawn = !maskIsDrawn;
}

function modelLoaded() {
  console.log("Model Loaded!");
  // bodypix.segment(gotResults);


  poseNet.on('pose', function(results) {
    poses = results;
    // console.log(results);

    if (results && results[0] && results[0].pose && results[0].pose.nose) {

      noseX = results[0].pose.nose.x;
      noseY = results[0].pose.nose.y;
  
      leftEyeX = results[0].pose.leftEye.x;
      leftEyeY = results[0].pose.leftEye.y;

      rightEyeX = results[0].pose.rightEye.x;
      rightEyeY = results[0].pose.rightEye.y;

      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y;

      if (rightWristY < height/2) {

        if (songJay.isPlaying()) {
          console.log("song is ALREADY playing")
        } else {
          console.log("song SHOULD be played")
          songJay.play();
        }
      } else {
        songJay.stop();
      }


    }
  });


   
  
}


function gotResults (error, results){
  if(error){
    console.error(error);
    return
  }
  if (results && results.maskPerson) {
    // console.log(results);
    background(0,0,255);

    let img = results.maskPerson;

    img.loadPixels();

    for (let i = 0; i < img.width; i++) {
      for (let j = 0; j < img.height; j++) {

        const pixelColor = img.get(i, j);
        // console.log(pixelColor);

        if(pixelColor[3] == 255){

          // mask color
          img.set(i, j, color(i, j, j));
        } else {
          // background color
          img.set(i, j, color(j,i, 6));
        }
      }
    }
    img.updatePixels();


    image(img, 0, 0);

    // bodypix.segment(gotResults)

  }
}



function draw (){
  // clear();
  image(video, 0,0)
  drawFace();
}


function drawFace(){

  if (maskIsDrawn) {

    push();
    imageMode(CENTER);

    // image(eyeRight, rightEyeX, rightEyeY + 20, 80, 40);
    // image(eyeLeft, leftEyeX, leftEyeY + 20, 80, 40);

    // image(eyeBrowRight, rightEyeX, rightEyeY, 80, 20);
    // image(eyeBrowLeft, leftEyeX, leftEyeY, 80, 20);

    // image(nose, noseX, noseY, 60,80);

    // if (mouthIsOpen) {
    //   image(mouth, noseX, noseY + 70, 100,50);
    //   // mouthIsOpen = false;
    // } else {
    //   image(mouthClosed, noseX, noseY + 70, 100,50);
    //   // mouthIsOpen = true;
    // }

    fill(255,0,0);
    // image(nose, rightWristX,rightWristY);

    fill(0);
    textSize(26);
    // scale(-1);
    ellipse(rightWristX,rightWristY, 50,50)
    // text("test",rightWristX,rightWristY - 100)

    let jayWidth = 180;
    let jayHeight = jayWidth * 1.56
    image(jayZ, noseX, noseY, jayWidth, jayHeight )
    
  pop();

  } else {}
  
}