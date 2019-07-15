let inputBox, button, canvas;
let transferBtn;
let heading;
let myImg;

const url = 'http://localhost:8000/query';

function preload(){
}


function setup() {
  canvas = createCanvas(500,500);
  canvas.parent("#wrapper");
  // background(51);
  heading = createDiv("");
  heading.class("title");
  heading.parent("#wrapper");
  inputBox = createInput();
  button = createButton("Transfer");
  button.mousePressed(txt2img);

  
}

function draw(){
  if (myImg) image(myImg, 0,0, 500, 500);
  if(inputBox.value()) heading.html(inputBox.value());
}

function txt2img() {
  if (inputBox && inputBox.value) {

    const postData = {
      "caption": inputBox.value()
    };

    console.log(inputBox.value());

    fetch(url, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(output => {
        const { caption } = output;
        // use the outputs in your project
        // console.log(output);

        let outputImage = output.result
        // console.log(outputImage);

        myImg = loadImage(outputImage);
        

      })

  }
}
