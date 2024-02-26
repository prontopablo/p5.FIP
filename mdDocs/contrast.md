Adjusts the contrast.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`contrast` **Float:** The contrast adjustment factor. A value of 1.0 leaves the contrast unchanged, while higher values increase contrast, and lower values decrease contrast. Default: **`0.0`**

## Example
```javascript hl_lines="29 30"
let layer,
  bird,
  contrast;

function preload() {
    contrast = createShader(fip.defaultVert, fip.contrast); // Load the shader
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
    shader(contrast);
    
    // Set the shader uniforms
    contrast.setUniform("texture", layer.color); // Set the texture to apply the shader to
    contrast.setUniform('contrast', 2.0);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```