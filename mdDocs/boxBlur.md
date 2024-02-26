Blurs using a simple box blur algorithm.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`uTextureSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`(0.0, 0.0)`**
<br>
`blurRadius` **Int:** The radius of the box blur. Controls the extent of blurring. Default: **`0`**

## Example
```javascript hl_lines="29 30 31"
let layer,
  bird,
  boxBlur;

function preload() {
    boxBlur = createShader(fip.defaultVert, fip.boxBlur); // Load the shader
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
    shader(boxBlur);
    
    // Set the shader uniforms
    boxBlur.setUniform("texture", layer.color); // Set the texture to apply the shader to
    boxBlur.setUniform('uTextureSize', [width, height]); // Set the size of the texture used
    boxBlur.setUniform('blurRadius', 3);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```