# Usage
Once FIP has been added to your libraries, to use an effect you:

1. Import FIP
2. Specify in `size()` the P2D or P3D renderer, but not the default renderer ([Why?](https://processing.org/reference/shader_.html)).
3. Load the shader you want, using `loadShader()`.
4. Call `filter()`, passing in the shader name.

```java
import fip.*; // Import the FIP library

PShader glitch;
PImage ireland;

void setup() {
    size(1000, 1000, P3D); // Set up the canvas with a renderer (P3D in this case)

    glitch = loadShader("glitch.glsl"); // Load the glitch shader

    ireland = loadImage("ireland.jpg");
}

void draw() {
    image(ireland, 0, 0, width, height);

    filter(glitch); // Apply the glitch shader
}
```

<div style="display: flex;">
    <div style="margin-right: 5px;">
        <img width="400" height="400" src="./images/irelandBefore.jpg">
        <figcaption>Image with no effects</figcaption>
    </div>
    <div>
        <img width="400" height="400" src="./images/irelandGlitch.jpg">
        <figcaption>Image with glitch effect applied</figcaption>
    </div>
</div>