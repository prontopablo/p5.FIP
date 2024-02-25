Dilates the input image to increase light areas. Samples surrounding pixels and combines them to produce a dilated effect.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>

## Example
```java
import fip.*;

PShader dilate;
PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  dilate = loadShader("dilate.glsl");

  ireland = loadImage("ireland.jpg");
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(dilate);
}
```