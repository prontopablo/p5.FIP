Dilates the input image to increase light areas. Samples surrounding pixels and combines them to produce a dilated effect.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`resolution` **Vec2**: The resolution of the input texture. Default: **`undefined`**

## Example
```javascript
let layer,
  bird,
  dilate;

function preload() {
    dilate = createShader(fip.defaultVert, fip.dilate); // Load the shader
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
    shader(dilate);
    
    // Set the shader uniforms
    dilate.setUniform("texture", layer.color); // Set the texture to apply the shader to
    dilate.setUniform('resolution', [width, height]);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```