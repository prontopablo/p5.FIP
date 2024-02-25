Blends textures together based on a mix factor and blending type.

## Parameters
`texture1` **Texture**: The first texture to be blended. Default: **`undefined`**
<br>
`texture2` **Texture**: The second texture to be blended. Default: **`undefined`**
<br>
`mixFactor` **Float**: How much weight to give each picture in the blending. A value of 0.0 only outputs texture1, 1.0 only outputs texture2. Default: **`0.5`**
<br>
`blendingMode` **Int**: Which blending mode to use. Below is a table of the values and their respective blend modes. Default: **`1.0`**

| blendingMode  | Blend Mode                  |
|---------------|-----------------------------|
| 1             | Additive Blending           |
| 2             | Subtract Blending           |
| 3             | Multiplicative Blending     |
| 4             | Screen Blending             |
| 5             | Overlay Blending            |
| 6             | Darken Blending             |
| 7             | Lighten Blending            |
| 8             | Difference Blending         |
| 9             | Exclusion Blending          |
| 10            | Behind Blending             |
| 11            | Dissolve Blending           |
| 12            | Hue Blending                |
| 13            | Normal Blending             |
| Default       | Linear Interpolation        |

## Example
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

  blend.set("texture1", ireland); // Blend requires these 2 textures to be passed into it. 
  blend.set("texture2", bird);
  blend.set("mixFactor", 0.5); // Equally blend the images
  blend.set("blendingMode", 0); // Use linear interpolation blending
}

void draw() {
  background(255);
  filter(blend);
}
```

<div style="display: flex;">
    <div style="margin-right: 20px">
        <img width="200" height="200" src="./images/irelandBefore.jpg">
        <img width="200" height="200" src="./images/bird.jpg">
        <figcaption>Images to be blended</figcaption>
    </div>
    <div>
        <img width="400" height="400" src="./images/irelandBlend.jpg">
        <figcaption>Blended image</figcaption>
    </div>
</div>