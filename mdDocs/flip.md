Flips the input texture horizontally and/or vertically based on specified parameters.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`flipHorizontal` **Boolean:**  If `true`, flips the texture horizontally. Default: **`false`**
<br>
`flipVertical` **Boolean:**  If `true`, flips the texture vertically. Default: **`false`**

## Example
```javascript hl_lines="29 30 31"
let layer,
  bird,
  flip;

function preload() {
    flip = createShader(fip.defaultVert, fip.flip); // Load the shader
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
    shader(flip);
    
    // Set the shader uniforms
    flip.setUniform("texture", layer.color); // Set the texture to apply the shader to
    flip.setUniform("flipHorizontal", true);
    flip.setUniform("flipVertical", true);
    
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```