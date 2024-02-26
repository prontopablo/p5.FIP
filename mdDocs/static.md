Combines Sobel operator for edge detection and stippling. The Sobel operator calculates the intensity gradient of the image, and the stippling effect adds random dots to the edges, creating an TV static appearance.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`uTextureSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`(0.0, 0.0)`**
<br>
`threshold` **Float:** The threshold for edge detection. Pixels with intensity above this threshold will be treated as edges. Default: **`0.0`**
<br>
`stippleDensity` **Float:** The density of stippling dots to be added to the ink effect. A lower value results in more dots. Default: **`0.0`**

## Example
```javascript
let layer,
  bird,
  static;

function preload() {
    static = createShader(fip.defaultVert, fip.static); // Load the shader
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
    shader(static);
    
    // Set the shader uniforms
    static.setUniform("texture", layer.color); // Set the texture to apply the shader to
    static.setUniform('uTextureSize', [width, height]); // Set the size of the texture used
    static.setUniform('threshold', 0.2);
    static.setUniform('stippleDensity', 0.99);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```