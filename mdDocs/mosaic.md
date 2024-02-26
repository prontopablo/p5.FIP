Applies a mosaic effect to an input texture.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`mosaicSize` **Float:** Size of the mosaic cells. A higher value results in larger mosaic cells. Default: **`0.0`**

## Example
```javascript hl_lines="29 30"
let layer,
  bird,
  mosaic;

function preload() {
    mosaic = createShader(fip.defaultVert, fip.mosaic); // Load the shader
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
    shader(mosaic);
    
    // Set the shader uniforms
    mosaic.setUniform("texture", layer.color); // Set the texture to apply the shader to
    mosaic.setUniform('mosaicSize', 12.0);
    
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```