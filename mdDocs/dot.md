Emulates a seven-segment display by grouping pixels into dots.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`dotSize` **Float:** The size of each dot in the display. Default: **`0.0`**

## Example
```javascript
let layer,
  bird,
  dot;

function preload() {
    dot = createShader(fip.defaultVert, fip.dot); // Load the shader
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
    shader(dot);
    
    // Set the shader uniforms
    dot.setUniform("texture", layer.color); // Set the texture to apply the shader to
    dot.setUniform('dotSize', 0.008);
    
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```