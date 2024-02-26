Creates a ripple effect using sine function.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`resolution` **Vec2**: The resolution of the input texture. Default: **`vec2(0.0)`**
<br>
`rippleFrequency` **Float:** The frequency of the ripples. Default: **`0.0`**
<br>
`rippleAmplitude` **Float:** The amplitude or strength of the ripples. Default: **`0.0`**


## Example
```javascript hl_lines="29 30 31 32"
let layer,
  bird,
  ripple;

function preload() {
    ripple = createShader(fip.defaultVert, fip.ripple); // Load the shader
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
    shader(ripple);
    
    // Set the shader uniforms
    ripple.setUniform("texture", layer.color); // Set the texture to apply the shader to
    ripple.setUniform('resolution', [width, height]);
    ripple.setUniform('rippleFrequency', 50.0);
    ripple.setUniform('rippleAmplitude', 0.01);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```