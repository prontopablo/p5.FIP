Blurs while preserving edges based on spatial and intensity (color) differences.

## Parameters
`tex0` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`sigmaSpace` **Float:** Spatial standard deviation for calculating spatial differences. Default: **`0.0`**
<br>
`sigmaColor` **Float:** Intensity (color) standard deviation for calculating color differences. Default: **`0.0`**

## Example
```javascript hl_lines="19 20"
let bird, bilateral;

function setup() {
  createCanvas(600, 600, WEBGL); // Use WEBGL mode to use the shader
  bilateral = createFilterShader(fip.bilateral); // Load the shader
  bird = loadImage("bird.jpg");
}
  
function draw() {
  background(0);
  imageMode(CENTER);
  image(bird, 0, 0, width, height);
    
  // Apply the shader
  filter(bilateral);
    
  // Set the shader uniforms
  bilateral.setUniform('sigmaSpace', 1.0);
  bilateral.setUniform('sigmaColor', 0.8);
}
```
> **Note:** The rest of the reference pages from here on out simply list sample parameter values, not an entire sketch like below. You can copy/paste the sample values from other filters into this example.