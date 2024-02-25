Applies an emboss effect to the input texture, creating a 3D appearance. This is achieved by calculating the gradient of the pixel values and normalizing the result.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`uTextureSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`(0.0, 0.0)`**


## Example
```javascript
let layer,
  bird,
  emboss;

function preload() {
    emboss = createShader(fip.defaultVert, fip.emboss); // Load the shader
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
    shader(emboss);
    
    // Set the shader uniforms
    emboss.setUniform("texture", layer.color); // Set the texture to apply the shader to
    emboss.setUniform('uTextureSize', [width, height]); // Set the size of the texture used
    
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```