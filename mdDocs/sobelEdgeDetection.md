Performs edge detection on the input texture using the Sobel operator. It calculates the intensity gradients in the horizontal and vertical directions and combines them to detect edges. 

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`uTextureSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`(0.0, 0.0)`**
<br>
`threshold` **Float:** The threshold value to determine the intensity at which edges are detected. Default: **`0.0`**

## Example
```javascript hl_lines="29 30 31"
let layer,
  bird,
  sobelEdgeDetection;

function preload() {
    sobelEdgeDetection = createShader(fip.defaultVert, fip.sobelEdgeDetection); // Load the shader
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
    shader(sobelEdgeDetection);
    
    // Set the shader uniforms
    sobelEdgeDetection.setUniform("texture", layer.color); // Set the texture to apply the shader to
    sobelEdgeDetection.setUniform('uTextureSize', [width, height]);
    sobelEdgeDetection.setUniform('threshold', 0.2);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```