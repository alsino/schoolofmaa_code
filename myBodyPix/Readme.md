## Making a mask - w/ bodyPix and poseNet

This demo uses the ML algorithms bodypix and poseNet in combination using [ml5.js](https://ml5js.org/) and [p5.js](http://p5js.org/). 

First bodyPix is used to create a segmentation between the body and background from a webcam image. The pixels in the segmentation images are then individually accessed and colored.

Secondly, poseNet is used to get the coordinates of the face markers (i.e. eyes, mouth, nose, etc.). Then for each marker images of cropped bodyparts are added on top, which can be switched on and off as a mask. 

This demo is a test to see how poseNet and bodyPix can be used in combination.


## Demo

Try the [demo](https://alsino.github.io/schoolofmaa_code/myBodyPix/).
