let canvas;
let img;
let voice;
let button;
let bullshitBtn;
let review;

let fileInput;
let sentence;

let sizeFactor = 0.6;

var phrases = new Array();

phrases[0] = new Array();

phrases[0][0] = "I'm troubled by how";
phrases[0][1] = "With regard to the issue of content,";
phrases[0][2] = "I find this work menacing/playful because of the way";
phrases[0][3] = "It should be added that";
phrases[0][4] = "I agree/disagree with some of the things that have just been said, but";
phrases[0][5] = "Although I am not a painter, I think that";
phrases[0][6] = "Umm...";
phrases[0][7] = "I'm surprised that no one's mentioned yet that";
phrases[0][8] = "It's difficult to enter into this work because of how";
phrases[0][9] = "As an advocate of the Big Mac Aesthetic, I feel that";

phrases[1] = new Array();

phrases[1][0] = "the internal dynamic";
phrases[1][1] = "the sublime beauty";
phrases[1][2] = "the disjunctive perturbation";
phrases[1][3] = "the optical suggestions";
phrases[1][4] = "the reductive quality";
phrases[1][5] = "the subaqueous qualities";
phrases[1][6] = "the iconicity";
phrases[1][7] = "the aura";
phrases[1][8] = "the mechanical mark-making";
phrases[1][9] = "the metaphorical resonance";

phrases[2] = new Array();
phrases[2][0] = "of the biomorphic forms";
phrases[2][1] = "of the sexual signifier";
phrases[2][2] = "of the negative space";
phrases[2][3] = "of the spatial relationships";
phrases[2][4] = "of the facture";
phrases[2][5] = "of the purity of line";
phrases[2][6] = "of the Egyptian motifs";
phrases[2][7] = "of the gesture";
phrases[2][8] = "of the figurative-narrative line-space matrix";
phrases[2][9] = "of the sexy fish";

phrases[3] = new Array();

phrases[3][0] = "verges on codifying";
phrases[3][1] = "seems very disturbing in light of";
phrases[3][2] = "contextualize";
phrases[3][3] = "endangers the devious simplicity of";
phrases[3][4] = "brings within the realm of discourse";
phrases[3][5] = "makes resonant";
phrases[3][6] = "visually and conceptually activates";
phrases[3][7] = "notates";
phrases[3][8] = "spatially undermines";
phrases[3][9] = "threatens to penetrate";


phrases[4] = new Array();

phrases[4][0] = "the accessibility of the work.";
phrases[4][1] = "a participation in the critical dialogue of the 90s.";
phrases[4][2] = "the eloquence of these pieces.";
phrases[4][3] = "the remarkable handling of light.";
phrases[4][4] = "the inherent overspecificity.";
phrases[4][5] = "the distinctive formal juxtapositions.";
phrases[4][6] = "the essentially transitional quality.";
phrases[4][7] = "the larger carcass.";
phrases[4][8] = "the substructure of critical thinking.";
phrases[4][9] = "the exploration of montage elements.";




function preload() {
 myMobileNet = ml5.imageClassifier('MobileNet', function(){
   console.log("model loaded");
 } );
 voice = new p5.Speech("Google US English");
 voice.setRate(0.8);
 voice.setLang('en-US');
}


function setup() {
  fileInput = createFileInput(handleFile);
  fileInput.parent('wrapper');
  fileInput.class('fileSelector');

  bullshitBtn = createButton("Generate AI art critique");
  bullshitBtn.parent('wrapper');
  bullshitBtn.class('aiText');
  bullshitBtn.style('display', 'none');
  
  canvas = createCanvas(windowWidth,600);
  // canvas.parent('wrapper');
  background("#fefefe");
  // translate(width/2, height/ 2);

  bullshitBtn.style('display', 'block');
  bullshitBtn.mousePressed(() => {
    console.log("Ready");
    generateAIReview();
  });

  console.log("Ready");
}

function draw(){
  if (img) {
    image(img, width/2 - img.width/2 , 0, img.width, img.height);
  }
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data);
    img.hide();
  } else {
    img = null;
  }
}

function generateAIReview(){
  console.log("generate review");
  //myMobileNet.classify(img, gotResult);
}



function gotResult(error, result) {
  if (error) {
    console.error(error);
  }

  // console.log(result);
  let string = `"This piece is a very interesting collage of a ${result[0].label} and a ${result[1].label} and a ${result[2].label}`;

  sentence = string + ". " + generateBullshit() + " ";

  review = createDiv(sentence);
  review.parent('wrapper');
  // textSize(20);
  // text(sentence, 200, 10, 70);

  console.log("Call me");

  button = createButton("Read text");
  button.parent('wrapper');
  button.mousePressed(buttonIsPressed);

  function buttonIsPressed(){
    console.log("Button is pressed");
    voice.speak(sentence); // say something
  }

}




function generateBullshit() {

  let crapPhrase = "";

  let part1 = phrases[0];
  let part2 = phrases[1];
  let part3 = phrases[2];
  let part4 = phrases[3];
  let part5 = phrases[4];

  let randomPart1 = part1[floor(random(1,9))];
  let randomPart2 = part2[floor(random(1,9))];
  let randomPart3 = part3[floor(random(1,9))];
  let randomPart4 = part4[floor(random(1,9))];
  let randomPart5 = part5[floor(random(1,9))];

  crapPhrase = randomPart1 + " " + randomPart2 + " " + randomPart3 + " " + randomPart4 + " " + randomPart5 + '"' ;

  return crapPhrase;
}





