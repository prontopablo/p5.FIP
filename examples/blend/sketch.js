/* 
   Example sketch demonstrating the blend filter in FIP. 
   Press any key to cycle through blending modes.
*/

let layer1, layer2,
  ireland,
  bird,
  blend,
  blendingModeIndex = 0;

function preload() {
    blend = createFilterShader(fip.blend); // Load the blend shader
    ireland = loadImage("ireland.jpg");
    bird = loadImage("bird.jpg");
}

function setup() {
    createCanvas(600, 600, WEBGL); // Enable WEBGL mode for shaders
    layer1 = createFramebuffer();
    layer2 = createFramebuffer();
    
    console.log("Press any key to cycle through blending modes.");
}
  
function draw() {
    background(0);
    
    // Draw the first image onto layer1
    layer1.begin();
    scale(1, -1); // Flip Y-axis for framebuffer consistency
    image(ireland, -width / 2, -height / 2, width, height);
    layer1.end();

    // Draw the second image onto layer2
    layer2.begin();
    scale(1, -1);
    image(bird, -width / 2, -height / 2, width, height);
    layer2.end();
    
    // Apply the blend shader
    filter(blend);
    
    // Set the shader uniforms
    blend.setUniform('blendingMode', blendingModeIndex);
    // Set the textures to apply the shader to
    blend.setUniform("texture1", layer1.color);
    blend.setUniform("texture2", layer2.color); 
    blend.setUniform("mixFactor", 0.5); // 50% mix of both textures

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
  
function keyPressed() {
    // Cycle through blending modes when a key is pressed
    blendingModeIndex = (blendingModeIndex + 1) % 14; // 14 types of blending
    console.log("Blending Mode: " + blendingModeIndex);
}