Applies two Gaussian blurs to the input texture and calculates the Difference of Gaussian.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`resolution` **Vec2**: The resolution of the input texture. Default: **`undefined`**
<br>
`radius1` **Float:** The radius of the first Gaussian blur. Default: **`10.0`**
<br>
`radius2` **Float:** The radius of the second Gaussian blur. Default: **`1.0`**

## Example
```java
import fip.*;

PShader differenceOfGaussian;
PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  differenceOfGaussian = loadShader("differenceOfGaussian.glsl");

  ireland = loadImage("ireland.jpg");

  differenceOfGaussian.set("resolution", float(width), float(height));
  differenceOfGaussian.set("radius1", 10.0);
  differenceOfGaussian.set("radius2", 1.0);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(differenceOfGaussian);
}
```