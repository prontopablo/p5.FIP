Applies an edge-preserving filter to the input texture, emphasizing edges while smoothing other areas.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`uTextureSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`(0.0, 0.0)`**
<br>
`threshold` **Float**: The threshold value that determines whether to preserve the original pixel color or use the local average. Default: **`0.0`**


## Example
```javascript
let layer,
  bird,
  edgePreservingSmooth;

function preload() {
    edgePreservingSmooth = createShader(fip.defaultVert, fip.edgePreservingSmooth); // Load the shader
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
    shader(edgePreservingSmooth);
    
    // Set the shader uniforms
    edgePreservingSmooth.setUniform("texture", layer.color); // Set the texture to apply the shader to
    edgePreservingSmooth.setUniform('uTextureSize', [width, height]); // Set the size of the texture used
    edgePreservingSmooth.setUniform('threshold', 0.2);
    
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```