Applies gamma correction to the input texture color.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`gamma` **Float:**  Gamma value for correction. Default: **`0.0`**


## Example
```javascript
let layer,
  bird,
  gamma;

function preload() {
    gamma = createShader(fip.defaultVert, fip.gamma); // Load the shader
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
    scale(1, -1); // gamma the Y-axis to match the canvas (different coordinate system in framebuffer)
    image(bird, -width / 2, -height / 2, width, height);
    layer.end();
    
    // Apply the shader
    shader(gamma);
    
    // Set the shader uniforms
    gamma.setUniform("texture", layer.color); // Set the texture to apply the shader to
    gamma.setUniform('gamma', 2.2);
    
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```