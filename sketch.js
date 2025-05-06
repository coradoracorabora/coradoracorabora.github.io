//this is what creates the molds
let molds = [];
let num = 10000;

//this is pixel density
let d;

function setup() {
  createCanvas(displayWidth, displayHeight);
  
  //bc apparently js defaults to radians
  angleMode(DEGREES);

  //declaration that helps us sense pixel density 
  d = pixelDensity();

  //for loop to create an array of molds
  for (let i=0; i<num; i++) {
    molds[i] = new Mold();
  }  
}

function draw() {
  //black background with a transparency of 5
  background(0, 5);

  //getting the pixel array data
  loadPixels();
  //calling update BEFORE display
  //inside of a for loop because we need it yknow updating over and over
  for (let i=0; i<num; i++) {
    molds[i].update();
    molds[i].display();
  }

}

//so the size of it can follow the window size
function windowResized() {
  resizeCanvas(displayWidth, displayHeight);
}
