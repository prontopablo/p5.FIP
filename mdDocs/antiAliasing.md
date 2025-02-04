Performs basic anti-aliasing using a 2x2 super-sampling technique. Takes four samples per pixel and averages them to smooth out edges.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`canvasSize` **Vec2:** The size of the texture used for sampling neighboring pixels. Default: **`The entire canvas`**
<br>
`strength` **Float:** Controls the size of the offset for super-sampling. Larger values result in stronger anti-aliasing. Default: **`0.0`** 

## Example
```javascript hl_lines="18"
let bird, antiAliasing;

function setup() {
  createCanvas(600, 600, WEBGL); // Use WEBGL mode to use the shader
  antiAliasing = createFilterShader(fip.antiAliasing); // Load the shader
  bird = loadImage("bird.jpg");
}
  
function draw() {
  background(0);
  imageMode(CENTER);
  image(bird, 0, 0, width, height);
    
  // Apply the shader
  filter(antiAliasing);
    
  // Set the shader uniforms
  antiAliasing.setUniform('strength', 0.9);
}
```