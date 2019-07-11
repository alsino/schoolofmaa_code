let video;
let poseNet;
let poses = [];
let noseX, noseY;
let leftEyeX, leftEyeY;
let rightEyeX, rightEyeY;

var angle = 0;
var radius = 10;
var counter = 1;

function preload(){
  eyeRight = loadImage("img/eye_right.png");
  eyeLeft = loadImage("img/eye_left.png");
}


function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES);
  frameRate(20);

  video = createCapture(VIDEO);
  video.hide();

  // Create a new poseNet methods
  poseNet = ml5.poseNet(video, modelLoaded);

  fill(255, 0, 0);
  stroke(255, 0, 0);
}


function modelLoaded() {
  console.log("Model Loaded!");

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

      // console.log(results[0].pose)

      // noseX = map(noseX, 0, windowWidth / 2,  )
    
      // console.log(noseX, noseY);
    }
  });
}


function draw (){

  image(video, 0, 0);

  if(noseX && noseY){
    ellipse(noseX, noseY, 2,2);

    // line(noseX, noseY, 0, 0);
    // line(noseX, noseY, width, height);
    // line(noseX, noseY, 0, height);
    // line(noseX, noseY, width, 0);   
    
    var radarNose = new CircleBig();
    radarNose.startX = noseX;
    radarNose.startY = noseY;
    radarNose.move();
    radarNose.display();


    var radarLeftEye = new CircleBig();
    radarLeftEye.startX = leftEyeX;
    radarLeftEye.startY = leftEyeY;
    radarLeftEye.move();
    radarLeftEye.display();

    var radarRightEye = new CircleBig();
    radarRightEye.startX = rightEyeX;
    radarRightEye.startY = rightEyeY;
    radarRightEye.move();
    radarRightEye.display();

    // imageMode(CENTER);
    image(eyeRight, rightEyeX, rightEyeY - 50, 200, 100);
    image(eyeLeft, leftEyeX - 200, leftEyeY - 50, 200, 100);

    stroke(59,255,0);
    noFill();
    beginShape();
    vertex(noseX, noseY);
    vertex(leftEyeX, leftEyeY);
    vertex(rightEyeX, rightEyeY);

    endShape(CLOSE);

	  counter++;
  }
}





function CircleBig() {
  stroke(59,255,0);
  noFill(255);

  this.startX;
  this.startY;

  this.angle;
  this.r = radius;
  this.w = 15;
  this.h = 15;
  this.aVel = 0.0;
  this.aAcc = 0.01;
  this.counter = 1;

  this.x = this.r * cos(angle);
  this.y = this.r * sin(angle);
  
  
  this.display = function(){
    line(this.startX, this.startY, this.startX + this.x,this.startY + this.y);
    text(counter,this.startX + this.x + 5,this.startY + this.y + 5);
    fill(255,255,255);
    noStroke();
    // ellipse(this.x,this.y, 5,5);
    // line(0,0, this.x,this.y)
};

  this.move = function(){
    this.angle = angle;
    // angle+=random(3,100);
    angle+=1;

    this.r = radius;
    radius = 100;
    // console.log(radius);
}

};


