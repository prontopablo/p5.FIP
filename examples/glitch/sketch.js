/* 
   Example sketch demonstrating the glitch filter in FIP. 
*/

let ireland, glitch;

function setup() {
  createCanvas(600, 600, WEBGL); // Use WEBGL mode to use the shader
  glitch = createFilterShader(fip.glitch); // Load the glitch shader
  ireland = loadImage("ireland.jpg");
}
  
function draw() {
  background(255);

  imageMode(CENTER);
  image(ireland, 0, 0, width, height);
    
  // Apply the shader
  filter(glitch);

  glitch.setUniform('glitchIntensity', 0.8); // Set the intensity of the glitch effect
}  
