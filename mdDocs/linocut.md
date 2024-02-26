Simulates a linocut effect by converting the input image to grayscale and applying a threshold to distinguish between ink and paper regions.  

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`threshold` **Float:** The threshold value to determine the cutoff between ink and paper colors. Values above the threshold represent ink, while values below represent paper. Default: **`0.0`**
<br>
`inkColor` **Vec3**: The color of the ink. This is a RGB vector, where each component is in the range [0, 1]. Default: **`(0.0, 0.0, 0.0)`**
<br>
`paperColor` **Vec3**: The color of the paper. This is a RGB vector, where each component is in the range [0, 1]. Default: **`(0.0, 0.0, 0.0)`**

## Example 
```javascript hl_lines="29 30 31 32"
let layer,
  bird,
  linocut;

function preload() {
    linocut = createShader(fip.defaultVert, fip.linocut); // Load the shader
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
    shader(linocut);
    
    // Set the shader uniforms
    linocut.setUniform("texture", layer.color); // Set the texture to apply the shader to
    linocut.setUniform('threshold', 0.4);
    linocut.setUniform('inkColor', [0.4, 0.4, 1.0]);
    linocut.setUniform('paperColor', [1.0, 1.0, 1.0]);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```