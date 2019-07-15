let video, canvas;
let transferBtn;
let heading;

const url = 'http://localhost:8000/query';


function preload(){
  video = createCapture(VIDEO);
}


function setup() {
  canvas = createCanvas(600, 400);
  video.size(600, 400);
  video.hide();  

  transferBtn = createButton("Transfer");
  transferBtn.mousePressed(image2Txt);

  heading = createDiv("");

  
}

function draw(){
  image(video, 0,0);  
}


function image2Txt() {
  if (canvas && canvas.elt) {
    const canvasElt = canvas.elt;
    const imageData = canvasElt.toDataURL('image/jpeg', 1.0);
    const postData = {
      "image": imageData
    };

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
        console.log(output);

        captionNew = caption.replace(" .", ".");

        heading.html(captionNew);
      })


     // Send HTTP Post request to Runway with text, runway will return the output image src
    // httpPost(url, 'json', postData, (output) => {
    //   if (output && output.results && output.results[0]) {
    //     console.log('results: ', output.results[0].caption)
    //     // createElement('h2', output.results[0].caption);

    //     // Call image2Txt again
    //     // image2Txt();
    //   }
    // })





  }
}
