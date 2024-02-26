Converts the input image to a sepia-toned version using a specific color transformation.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**

## Example
```javascript hl_lines="29"
let layer,
  bird,
  sepia;

function preload() {
    sepia = createShader(fip.defaultVert, fip.sepia); // Load the shader
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
    shader(sepia);
    
    // Set the shader uniforms
    sepia.setUniform("texture", layer.color); // Set the texture to apply the shader to
    
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```