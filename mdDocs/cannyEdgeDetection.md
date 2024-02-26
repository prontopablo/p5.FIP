Detects edges using the Canny edge detection algorithm.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`uTextureSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`(0.0, 0.0)`**
<br>
`thresholdLow` **Float:** The lower threshold for edge detection. Pixels with intensity gradients below this threshold will be suppressed. Default: **`0.0`**
<br>
`thresholdHigh` **Float:** The higher threshold for edge detection. Pixels with intensity gradients above this threshold will be considered strong edges. Default: **`0.0`**

## Example
```javascript hl_lines="29 30 31 32"
let layer,
  bird,
  cannyEdgeDetection;

function preload() {
    cannyEdgeDetection = createShader(fip.defaultVert, fip.cannyEdgeDetection); // Load the shader
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
    shader(cannyEdgeDetection);
    
    // Set the shader uniforms
    cannyEdgeDetection.setUniform("texture", layer.color); // Set the texture to apply the shader to
    cannyEdgeDetection.setUniform('uTextureSize', [width, height]); // Set the size of the texture used
    cannyEdgeDetection.setUniform('thresholdLow', 0.1);
    cannyEdgeDetection.setUniform('thresholdHigh', 0.3);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```