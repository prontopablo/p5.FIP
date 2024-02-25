Adjusts the contrast.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`contrast` **Float:** The contrast adjustment factor. A value of 1.0 leaves the contrast unchanged, while higher values increase contrast, and lower values decrease contrast. Default: **`2.0`**

## Example
```java
import fip.*;

PShader contrast;
PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  contrast = loadShader("contrast.glsl");

  ireland = loadImage("ireland.jpg");

  contrast.set("contrast", 1.5);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(contrast);
}
```