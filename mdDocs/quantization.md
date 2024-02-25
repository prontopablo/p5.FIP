Reduces the number of colors in an image through quantization.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`resolution` **Vec2**: The resolution of the input texture. Default: **`vec2(1.0)`**
<br>
`shades` **Int:** Number of shades to quantize the colors to. Default: **`4.0`**

## Example
```java
import fip.*;

PShader quantization;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  quantization = loadShader("quantization.glsl");

  ireland = loadImage("ireland.jpg");

  quantization.set("shades", 4);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(quantization);
}

```