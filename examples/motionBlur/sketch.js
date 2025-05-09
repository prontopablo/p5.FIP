/* 
   Example sketch demonstrating the motion blur filter in FIP.
*/

let ireland, motionBlur;

function preload() {
  ireland = loadImage("ireland.jpg");
}

function setup() {
  createCanvas(600, 600, WEBGL); // Use WEBGL mode to use the shader
  motionBlur = createFilterShader(fip.motionBlur); // Load the motion blur shader
}
  
function draw() {
  background(255);

  imageMode(CENTER);
  image(ireland, 0, 0, width, height);
    
  // Apply the shader
  filter(motionBlur);
}
