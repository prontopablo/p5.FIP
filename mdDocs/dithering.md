Applies dithering to an image, a technique commonly used to simulate additional colors and reduce banding in lower bit-depth images.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`threshold` **Float:** Threshold to determine if pixel will be set to white or black. Default: **`0.0`**

## Example
```javascript
let layer,
  bird,
  dithering;

function preload() {
    dithering = createShader(fip.defaultVert, fip.dithering); // Load the shader
    bird = loadImage("bird.jpg");
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
    shader(dithering);
    
    // Set the shader uniforms
    dithering.setUniform("texture", layer.color); // Set the texture to apply the shader to
    dithering.setUniform('threshold', 1.0);
    
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```