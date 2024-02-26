Applies a halftone effect by converting texture coordinates to screen space, defining cells based on the specified size, and calculating dots within each cell.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`resolution` **Vec2**: The resolution of the input texture. Default: **`undefined`**
<br>
`cellSize` **Float:** The size of each halftone cell. Default: **`0.0`**
<br>
`threshold` Float: The threshold value for dot creation. A higher value results in fewer dots. Default: **`0.0`**

## Example
```javascript hl_lines="29 30 31 32"
let layer,
  bird,
  halftone;

function preload() {
    halftone = createShader(fip.defaultVert, fip.halftone); // Load the shader
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
    shader(halftone);
    
    // Set the shader uniforms
    halftone.setUniform("texture", layer.color); // Set the texture to apply the shader to
    halftone.setUniform('resolution', [width, height]);
    halftone.setUniform('cellSize', 4.0);
    halftone.setUniform('threshold', 0.2);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```