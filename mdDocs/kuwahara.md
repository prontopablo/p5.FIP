Local image processing technique used for noise reduction and edge preservation. It divides the image into quadrants, calculates the mean and variance of color values in each quadrant, and selects the quadrant with the minimum color variance. This results in a smoothed version of the original image.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**

## Example
```java
import fip.*;

PShader kuwahara;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  kuwahara = loadShader("kuwahara.glsl");

  ireland = loadImage("ireland.jpg");
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(kuwahara);
}

```