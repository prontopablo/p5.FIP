Applies dithering to an image, a technique commonly used to simulate additional colors and reduce banding in lower bit-depth images.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>

## Example
```java
import fip.*;

PShader dithering;
PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  dithering = loadShader("dithering.glsl");

  ireland = loadImage("ireland.jpg");
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(dithering);
}
```