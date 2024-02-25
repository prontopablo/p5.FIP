Recreates the effects of an old CRT television with visible scanlines, spherical warping, and vignette.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`thresholdLow` **Float:** Threshold to highlight edges. Pixels with intensity gradients below this threshold are considered non-edges. Default: **`0.0`**
<br>
`thresholdHigh` **Float:** Threshold to perform hysteresis and link edges. Pixels with intensity gradients above this threshold are fully considered as edges. Default: **`0.0`**
<br>
`scanlineWeight` **Float:** Weight of the scanlines effect. Default: **`0.0`**
<br>
`brightness` **Float:** Adjusts the overall brightness of the image. Default: **`0.0`**
<br>
`distortion` **Float:** Controls the amount of spherical warping. Default: **`0.0`**

## Example
```javascript
let layer,
  bird,
  crt;

function preload() {
    crt = createShader(fip.defaultVert, fip.crt); // Load the shader
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
    shader(crt);
    
    // Set the shader uniforms
    crt.setUniform("texture", layer.color); // Set the texture to apply the shader to
    crt.setUniform('thresholdLow', 0.1); // Set the size of the texture used
    crt.setUniform('thresholdHigh', 0.3);
    crt.setUniform('scanlineWeight', 0.1);
    crt.setUniform('brightness', 2.5);
    crt..setUniform('distortion', 0.02);
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```