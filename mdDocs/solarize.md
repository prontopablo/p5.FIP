Inverts colors based on the intensity of pixel colors. If the average intensity of a pixel's color is above a specified threshold, the colors are inverted, creating a solarization effect.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`resolution` **Vec2**: The resolution of the input texture. Default: **`vec2(1.0)`**
<br>
`threshold` **Float:** The intensity threshold above which colors will be inverted. Ranges from 0.0 to 1.0. Default: **`0.5`**

## Example
```java
import fip.*;

PShader solarize;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  solarize = loadShader("solarize.glsl");

  ireland = loadImage("ireland.jpg");

  solarize.set("threshold", 0.5);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(solarize);
}

```