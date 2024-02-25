Adds a cartoon effect by emphasizing edges and darkening them.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`edgeThreshold` **Float:** The threshold value that determines whether a pixel is considered an edge pixel based on the difference between the center pixel and its neighbors. Default: **`0.0`**

## Example
```javascript
let layer,
  bird,
  cartoon;

function preload() {
    cartoon = createShader(fip.defaultVert, fip.cartoon); // Load the shader
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
    shader(cartoon);
    
    // Set the shader uniforms
    cartoon.setUniform("texture", layer.color); // Set the texture to apply the shader to
    cartoon.setUniform('edgeThreshold', 0.1);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```