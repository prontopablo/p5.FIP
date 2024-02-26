Blurs an image by simulating motion in a specified direction.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`uTextureSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`(0.0, 0.0)`**

## Example
```javascript hl_lines="29 30"
let layer,
  bird,
  motionBlur;

function preload() {
    motionBlur = createShader(fip.defaultVert, fip.motionBlur); // Load the shader
    bird = loadImage("bird.jpg");
}

function setup() {
    createCanvas(600, 600, WEBGL); // Use WEBGL mode to use the shader
    layer = createFramebuffer(); // Create a framebuffer to draw the image onto
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
    shader(motionBlur);
    
    // Set the shader uniforms
    motionBlur.setUniform("texture", layer.color); // Set the texture to apply the shader to
    motionBlur.setUniform('uTextureSize', [width, height]); // Set the size of the texture used
    
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```