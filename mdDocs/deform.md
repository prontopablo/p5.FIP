Uses sine waves to deform.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`deformationAmount` **Float:** The amount of deformation to apply based on a sine wave. Default: **`0.0`**

## Example
```javascript
let layer,
  bird,
  deform;

function preload() {
    deform = createShader(fip.defaultVert, fip.deform); // Load the shader
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
    shader(deform);
    
    // Set the shader uniforms
    deform.setUniform("texture", layer.color); // Set the texture to apply the shader to
    deform.setUniform('deformationAmount', 0.1);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```