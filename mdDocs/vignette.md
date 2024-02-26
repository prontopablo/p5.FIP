Adds a vignette effect to the texture.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`undefined`**
<br>
`uTextureSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`(0.0, 0.0)`**
<br>
`vignetteStrength` **Float:** Strength of the vignette effect. Range: 0.0 (none) to 1.0 (maximum). Default: **`0.0`**
<br>
`vignetteFalloff` **Float:** Rate at which the vignette diminishes. Default: **`0.0`**
<br>
`vignetteSign` **Float:** Direction of the vignette effect. -1.0 (inward) or 1.0 (outward). Default: **`0.0`**
<br>
`vignetteSize` **Float:** Overall size of the vignette effect. Default: **`0.0`**

## Example
```javascript
let layer,
  bird,
  vignette;

function preload() {
    vignette = createShader(fip.defaultVert, fip.vignette); // Load the shader
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
    shader(vignette);
    
    // Set the shader uniforms
    vignette.setUniform("texture", layer.color); // Set the texture to apply the shader to
    vignette.setUniform('uTextureSize', [width, height]); // Set the size of the texture used
    vignette.setUniform('vignetteStrength', 0.3);
    vignette.setUniform('vignetteFalloff', 1.0);
    vignette.setUniform('vignetteSign', 1.0);
    vignette.setUniform('vignetteSize', 1.0);

    rect(0, 0, width, height); // Draw a rectangle to apply the shader to
    resetShader(); 
}
```