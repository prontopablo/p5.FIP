Applies a sharpening effect to the input texture using a convolution kernel. It calculates the sharpened color of each pixel by enhancing the details in the center pixel and subtracting a fraction of the neighboring pixels.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`resolution` **Vec2**: The resolution of the input texture. Default: **`vec2(1.0)`**
<br>
`sharpness` **Float:** The intensity of the sharpening effect.  Default: **`1.5`**

## Example
```java
import fip.*;

PShader sharpen;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  sharpen = loadShader("sharpen.glsl");

  ireland = loadImage("ireland.jpg");

  sharpen.set("sharpness", 1.5);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(sharpen);
}

```