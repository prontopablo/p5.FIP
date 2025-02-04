# Setting Parameters
Each effect has parameters that you can edit using _.setUniform()_. The reference page for each effect lists the parameters and what they do.

The example below sets the glitch intensity of the glitch shader to a value of 0.8.
```javascript hl_lines="18"
let bird, glitch;

function setup() {
    createCanvas(600, 600, WEBGL); // Use WEBGL mode to use the shader
    glitch = createFilterShader(fip.glitch); // Load the glitch shader
    bird = loadImage("bird.jpg");
}
  
function draw() {
    background(0);
    
    // Draw our scene
    imageMode(CENTER);
    image(bird, 0, 0, width, height);
    
    filter(glitch); // Apply the shader
    
    glitch.setUniform('glitchIntensity', 0.8); // Set the intensity of the glitch effect
}
```

