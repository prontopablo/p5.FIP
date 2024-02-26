Performs unsharp masking to enhance image sharpness. Unsharp masking involves subtracting a blurred version of the image from the original and then adding the result back to the original image. 

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`uTextureSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`(0.0, 0.0)`**
<br>
`strength` **Float:** The strength of the unsharp masking effect. A higher value increases the sharpening effect. Default: **`0.0`**

## Example
```javascript hl_lines="29 30 31"
let layer,
  bird,
  unsharpMasking;

function preload() {
    unsharpMasking = createShader(fip.defaultVert, fip.unsharpMasking); // Load the shader
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
    shader(unsharpMasking);
    
    // Set the shader uniforms
    unsharpMasking.setUniform("texture", layer.color); // Set the texture to apply the shader to
    unsharpMasking.setUniform('uTextureSize', [width, height]); // Set the size of the texture used
    unsharpMasking.setUniform('strength', 2.0);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```