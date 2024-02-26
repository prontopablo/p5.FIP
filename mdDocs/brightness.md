Adjusts the brightness.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`brightness` **Float:** The factor by which to adjust the brightness. A value less than 1.0 darkens the image, while a value greater than 1.0 brightens it. Default: **`0.0`**

## Example
```javascript hl_lines="29 30"
let layer,
  bird,
  brightness;

function preload() {
    brightness = createShader(fip.defaultVert, fip.brightness); // Load the shader
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
    shader(brightness);
    
    // Set the shader uniforms
    brightness.setUniform("texture", layer.color); // Set the texture to apply the shader to
    brightness.setUniform('brightness', 2.1);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```