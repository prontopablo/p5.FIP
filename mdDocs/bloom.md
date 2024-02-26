Adds a glow effect using a combination of blurring and blending techniques.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`uTextureSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`(0.0, 0.0)`**
<br>
`intensity` **Float:** The strength of the glow effect. A higher value intensifies the glow. Default: **`0.0`**
<br>
`glow` **Float:** The extent of the glow, controlled by the blur radius. Should be within the range [0.0, 8.0]. Default: **`0.0`**

## Example
```javascript hl_lines="29 30 31 32"
let layer,
  bird,
  bloom;

function preload() {
    bloom = createShader(fip.defaultVert, fip.bloom); // Load the shader
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
    shader(bloom);
    
    // Set the shader uniforms
    bloom.setUniform("texture", layer.color); // Set the texture to apply the shader to
    bloom.setUniform('uTextureSize', [width, height]); // Set the size of the texture used
    bloom.setUniform('intensity', 0.8);
    bloom.setUniform('glow', 1.0);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```