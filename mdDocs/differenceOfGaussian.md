Applies two Gaussian blurs to the input texture and calculates the Difference of Gaussian.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`resolution` **Vec2**: The resolution of the input texture. Default: **`undefined`**
<br>
`radius1` **Float:** The radius of the first Gaussian blur. Default: **`0.0`**
<br>
`radius2` **Float:** The radius of the second Gaussian blur. Default: **`0.0`**

## Example
```javascript hl_lines="29 30 31 32"
let layer,
  bird,
  differenceOfGaussian;

function preload() {
    differenceOfGaussian = createShader(fip.defaultVert, fip.differenceOfGaussian); // Load the shader
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
    shader(differenceOfGaussian);
    
    // Set the shader uniforms
    differenceOfGaussian.setUniform("texture", layer.color); // Set the texture to apply the shader to
    differenceOfGaussian.setUniform('resolution', [width, height]);
    differenceOfGaussian.setUniform('radius1', 1.0);
    differenceOfGaussian.setUniform('radius2', 2.0);
    
    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```