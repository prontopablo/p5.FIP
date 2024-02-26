The RGB channels are separated and displaced, then the original and glitched colors are mixed.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`glitchIntensity` **Float:**  Value to determine the intensity of the glitch effect. Default: **`0.0`**

## Example
```javascript hl_lines="29 30"
let layer,
  bird,
  glitch;

function preload() {
    glitch = createShader(fip.defaultVert, fip.glitch); // Load the shader
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
    shader(glitch);
    
    // Set the shader uniforms
    glitch.setUniform("texture", layer.color); // Set the texture to apply the shader to
    glitch.setUniform('glitchIntensity', 0.8);
    
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```