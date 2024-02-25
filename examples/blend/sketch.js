/* 
   Example sketch to show how the blend filter works in FIP. 
   Key presses cycle through blending modes.
*/

let layer1, layer2,
  ireland,
  bird,
  blend,
  blendingModeIndex = 0;

function preload() {
    blend = createShader(fip.defaultVert, fip.blend); // Load the blend shader
    ireland = loadImage("../images/ireland.jpg");
    bird = loadImage("../images/bird.jpg");
}

function setup() {
    createCanvas(600, 600, WEBGL); // Use WEBGL mode to use the shader
    layer1 = createFramebuffer(); // Create 2 framebuffer to draw the images onto (faster p5.js version of createGraphics())
    layer2 = createFramebuffer();
}
  
function draw() {
    background(0);
    
    // Draw the first image to a framebuffer 
    layer1.begin();
    clear();
    scale(1, -1); // Flip the Y-axis to match the canvas (different coordinate system in framebuffer)
    image(ireland, -width / 2, -height / 2, width, height);
    layer1.end();

    // Draw the second image to a framebuffer
    layer2.begin();
    clear();
    scale(1, -1);
    image(bird, -width / 2, -height / 2, width, height);
    layer2.end();
    
    // Apply the shader
    shader(blend);
    
    // Set the shader uniforms
    blend.setUniform('blendingMode', blendingModeIndex); // Set the blending mode
    // Set the textures to apply the shader to
    blend.setUniform("texture1", layer1.color);
    blend.setUniform("texture2", layer2.color); 
    // Blend the textures evenly
    blend.setUniform("mixFactor", 0.5);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
  
function keyPressed() {
    // Cycle through blending modes when a key is pressed
    blendingModeIndex = (blendingModeIndex + 1) % 14; // 14 types of blending
    blend.setUniform("blendingMode", blendingModeIndex);
    console.log("Blending Mode: " + blendingModeIndex);
}