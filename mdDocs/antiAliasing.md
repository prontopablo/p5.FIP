Performs basic anti-aliasing using a 2x2 super-sampling technique. Takes four samples per pixel and averages them to smooth out edges.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`uTextureSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`(0.0, 0.0)`**
<br>
`strength` **Float:**  Default: **`0.0`** Controls the size of the offset for super-sampling. Larger values result in stronger anti-aliasing.

## Example
```javascript
let layer,
  bird,
  antiAliasing;

function preload() {
    antiAliasing = createShader(fip.defaultVert, fip.antiAliasing); // Load the shader
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
    shader(antiAliasing);
    
    // Set the shader uniforms
    antiAliasing.setUniform("texture", layer.color); // Set the texture to apply the shader to
    antiAliasing.setUniform('uTextureSize', [width, height]); // Set the size of the texture used
    antiAliasing.setUniform('strength', 0.9);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```