/* 
   Example sketch to show how the motion blur filter works in FIP. 
*/

let layer,
  ireland,
  motionBlur;

function preload() {
    motionBlur = createShader(fip.defaultVert, fip.motionBlur); // Load the  motion blur shader
    ireland = loadImage("../images/ireland.jpg");
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
    image(ireland, -width / 2, -height / 2, width, height);
    layer.end();
    
    // Apply the shader
    shader(motionBlur);
    
    // Set the shader uniforms
    motionBlur.setUniform("texture", layer.color); // Set the texture to apply the shader to
    motionBlur.setUniform('uTextureSize', [width, height]); // Set the size of the texture

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
  
