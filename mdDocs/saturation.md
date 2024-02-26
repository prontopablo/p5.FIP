Adjusts the saturation of an input texture. It operates by converting the original color to grayscale (luminance) and then interpolating between the grayscale version and the original color based on the saturation parameter.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`saturation` **Float:** Controls the saturation of the image. A value of 0.0 results in a grayscale image, while higher values increase saturation. Default: **`0.0`**

## Example
```javascript
let layer,
  bird,
  saturation;

function preload() {
    saturation = createShader(fip.defaultVert, fip.saturation); // Load the shader
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
    shader(saturation);
    
    // Set the shader uniforms
    saturation.setUniform("texture", layer.color); // Set the texture to apply the shader to
    saturation.setUniform("saturation", 5.5);
    
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```