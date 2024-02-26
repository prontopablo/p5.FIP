Applies a threshold to a texture, converting it to a binary black and white image based on a specified threshold value.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`threshold` **Float:** The threshold value that determines the cutoff point. Pixels with grayscale values above this threshold will be set to white, and those below will be set to black. Default: **`0.0`**

## Example
```javascript hl_lines="29 30"
let layer,
  bird,
  threshold;

function preload() {
    threshold = createShader(fip.defaultVert, fip.threshold); // Load the shader
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
    shader(threshold);
    
    // Set the shader uniforms
    threshold.setUniform("texture", layer.color); // Set the texture to apply the shader to
    threshold.setUniform("threshold", 0.5);
    
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```