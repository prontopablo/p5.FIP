/* 
   Example sketch to show how the glitch filter works in FIP. 
*/

let layer,
  bird,
  glitch;

function preload() {
    glitch = createShader(fip.defaultVert, fip.glitch); // Load the glitch shader
    bird = loadImage("../images/bird.jpg");
}

function setup() {
    createCanvas(600, 600, WEBGL); // Use WEBGL mode to use the shader
    layer = createFramebuffer(); // Create a framebuffer to draw the image onto (faster p5.js version of createGraphics())
}
  
function draw() {
    background(0);
    
    // Draw an image to a framebuffer 
    layer.begin();
    clear();
    scale(1, -1); // Flip the Y-axis to match the canvas (different coordinate system in framebuffer)
    image(bird, -width / 2, -height / 2, width, height);
    layer.end();
    
    // Apply the shader
    shader(glitch);
    
    // Set the shader uniforms
    glitch.setUniform('glitchIntensity', 0.8); // Set the intensity of the glitch effect
    glitch.setUniform("texture", layer.color); // Set the texture to apply the shader to

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
  
