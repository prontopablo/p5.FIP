Applies a sharpening effect to the input texture using a convolution kernel. It calculates the sharpened color of each pixel by enhancing the details in the center pixel and subtracting a fraction of the neighboring pixels.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`resolution` **Vec2**: The resolution of the input texture. Default: **`vec2(0.0)`**
<br>
`sharpness` **Float:** The intensity of the sharpening effect.  Default: **`0.0`**

## Example
```javascript
let layer,
  bird,
  sharpen;

function preload() {
    sharpen = createShader(fip.defaultVert, fip.sharpen); // Load the shader
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
    shader(sharpen);
    
    // Set the shader uniforms
    sharpen.setUniform("texture", layer.color); // Set the texture to apply the shader to
    sharpen.setUniform('resolution', [width, height]);
    sharpen.setUniform('sharpness', 1.5);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```