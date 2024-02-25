Local image processing technique used for noise reduction and edge preservation. It divides the image into quadrants, calculates the mean and variance of color values in each quadrant, and selects the quadrant with the minimum color variance. This results in a smoothed version of the original image.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`uTextureSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`(0.0, 0.0)`**

## Example
```javascript
let layer,
  bird,
  kuwahara;

function preload() {
    kuwahara = createShader(fip.defaultVert, fip.kuwahara); // Load the shader
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
    shader(kuwahara);
    
    // Set the shader uniforms
    kuwahara.setUniform("texture", layer.color); // Set the texture to apply the shader to
    kuwahara.setUniform('uTextureSize', [width, height]); // Set the size of the texture used
    
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```