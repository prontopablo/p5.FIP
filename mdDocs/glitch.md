The RGB channels are separated and displaced, then the original and glitched colors are mixed.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`glitchIntensity` **Float:**  Value to determine the intensity of the glitch effect. Default: **`0.0`**

## Example
```javascript hl_lines="18"
let bird, glitch;

function setup() {
  createCanvas(600, 600, WEBGL); // Use WEBGL mode to use the shader
  glitch = createFilterShader(fip.glitch); // Load the glitch shader
  bird = loadImage("bird.jpg");
}
  
function draw() {
  background(0);
  imageMode(CENTER);
  image(bird, 0, 0, width, height);
    
  // Apply the shader
  filter(glitch);
    
  // Set the shader uniforms
  glitch.setUniform('glitchIntensity', 0.8); // Set the intensity of the glitch effect
}
```