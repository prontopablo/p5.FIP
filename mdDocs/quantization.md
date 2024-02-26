Reduces the number of colors in an image through quantization.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`shades` **Int:** Number of shades to quantize the colors to. Default: **`0.0`**

## Example
```javascript
let layer,
  bird,
  pixelate;

function preload() {
    pixelate = createShader(fip.defaultVert, fip.pixelate); // Load the shader
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
    shader(pixelate);
    
    // Set the shader uniforms
    pixelate.setUniform("texture", layer.color); // Set the texture to apply the shader to
    pixelate.setUniform('pixelSize', 0.01);
    
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```