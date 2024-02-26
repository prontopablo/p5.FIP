Rotates an input texture based on a specified rotation angle in degrees. It ensures that the resulting rotated coordinates are within the texture bounds. If the rotated coordinates fall outside the bounds, the pixel becomes transparent. 

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`rotationAngleDegrees` **Float:** Rotation angle in degrees. Default: **`0.0`**

## Example
```javascript hl_lines="29 30"
let layer,
  bird,
  rotate;

function preload() {
    rotate = createShader(fip.defaultVert, fip.rotate); // Load the shader
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
    shader(rotate);
    
    // Set the shader uniforms
    rotate.setUniform("texture", layer.color); // Set the texture to apply the shader to
    rotate.setUniform("rotationAngle", -45);
    
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```