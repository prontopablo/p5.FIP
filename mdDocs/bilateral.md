Blurs while preserving edges based on spatial and intensity (color) differences.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`sigmaSpace` **Float:** Spatial standard deviation for calculating spatial differences. Default: **`0.0`**
<br>
`sigmaColor` **Float:** Intensity (color) standard deviation for calculating color differences. Default: **`0.0`**

## Example
```javascript
let layer,
  bird,
  bilateral;

function preload() {
    bilateral = createShader(fip.defaultVert, fip.bilateral); // Load the shader
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
    shader(bilateral);
    
    // Set the shader uniforms
    bilateral.setUniform("texture", layer.color); // Set the texture to apply the shader to
    bilateral.setUniform('sigmaSpace', 1.0);
    bilateral.setUniform('sigmaColor', 0.8);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```