Inverts colors based on the intensity of pixel colors. If the average intensity of a pixel's color is above a specified threshold, the colors are inverted, creating a solarization effect.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`threshold` **Float:** The intensity threshold above which colors will be inverted. Ranges from 0.0 to 1.0. Default: **`0.0`**

## Example
```javascript hl_lines="29 30"
let layer,
  bird,
  solarize;

function preload() {
    solarize = createShader(fip.defaultVert, fip.solarize); // Load the shader
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
    shader(solarize);
    
    // Set the shader uniforms
    solarize.setUniform("texture", layer.color); // Set the texture to apply the shader to
    solarize.setUniform("threshold", 0.5);
    
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```