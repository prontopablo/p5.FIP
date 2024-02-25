# Issues
Below are some common issues people have when using FIP and how to resolve them. If your issue is not listed below, please report it [here](https://github.com/prontopablo/FIP/issues) and I'll try to help you or fix it.

## Out of date graphics drivers
As FIP runs GLSL shaders on the GPU, make sure you update to the latest graphics drivers for your GPU ([how?](https://www.youtube.com/watch?v=NBiJSPd_K4g)), otherwise you may see some visual glitches.

## Not passing textures
Some shaders have required parameters and will not work if these parameters are not passed into them. Below we use the _blend_ shader but fail to pass it the textures we want to blend, so it does nothing.

```java
import fip.*;

PShader blend;

PImage ireland;
PImage bird;

void setup() {
  size(1000, 1000, P3D);

  blend = loadShader("blend.glsl");

  ireland = loadImage("ireland.jpg");
  bird = loadImage("bird.jpg");

  // blend.set("texture1", ireland); - Blend requires these 2 textures to be passed into it.
  // blend.set("texture2", bird);
  
  blend.set("mixFactor", 0.5);
  blend.set("blendingMode", 0);
}

void draw() {
  background(255);
  filter(blend);
}
```

<div style="display: flex;">
    <div style="margin-right: 5px;">
        <img width="400" height="400" src="./images/blackScreen.jpg">
        <figcaption>Required parameters not set, shader does nothing </figcaption>
    </div>
    <div>
        <img width="400" height="400" src="./images/irelandBlend.jpg">
        <figcaption>Image when textures are passed</figcaption>
    </div>
</div>
