Pixelates an image by rounding each pixel to a fixed grid based on the specified pixel size.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`pixelSize` **Float:** The size of each pixel in the pixel grid. Default: **`10.0`**

## Example
```java
import fip.*;

PShader pixelate;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  pixelate = loadShader("pixelate.glsl");

  ireland = loadImage("ireland.jpg");

  pixelate.set("pixelSize", 0.01);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(pixelate);
}

```