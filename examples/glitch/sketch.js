/* 
   Example sketch demonstrating the glitch filter in FIP. 
*/

let bird, glitch;

function preload() {
  bird = loadImage("bird.jpg"); // *** ADD YOUR IMAGE HERE ***
}

function setup() {
  createCanvas(600, 600, WEBGL); // Use WEBGL mode to use the shader
  glitch = createFilterShader(fip.glitch); // Load the glitch shader
}
  
function draw() {
  background(0);
  imageMode(CENTER);
  image(bird, 0, 0, width, height);
  
  // Set the shader uniforms
  glitch.setUniform('glitchIntensity', 0.8); // Set the intensity of the glitch effect
    
  // Apply the shader
  filter(glitch);
}  
