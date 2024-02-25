Performs basic anti-aliasing using a 2x2 super-sampling technique. Takes four samples per pixel and averages them to smooth out edges.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`strength` **Float:**  Default: **`1.0`** Controls the size of the offset for super-sampling. Larger values result in stronger anti-aliasing.

## Example
```java
import fip.*;

PShader antiAliasing;
PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  antiAliasing = loadShader("antiAliasing.glsl");

  ireland = loadImage("ireland.jpg");

  antiAliasing.set("strength", 2.0);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(antiAliasing);
}
```