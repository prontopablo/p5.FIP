Adjusts the saturation of an input texture. It operates by converting the original color to grayscale (luminance) and then interpolating between the grayscale version and the original color based on the saturation parameter.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`saturation` **Float:** Controls the saturation of the image. A value of 0.0 results in a grayscale image, while higher values increase saturation. Default: **`2.0`**

## Example
```java
import fip.*;

PShader saturation;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  saturation = loadShader("saturation.glsl");

  ireland = loadImage("ireland.jpg");

  saturation.set("saturation", 1.5);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(saturation);
}

```