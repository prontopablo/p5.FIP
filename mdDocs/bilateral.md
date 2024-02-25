Blurs while preserving edges based on spatial and intensity (color) differences.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`sigmaSpace` **Float:** Spatial standard deviation for calculating spatial differences. Default: **`20.0`**
<br>
`sigmaColor` **Float:** Intensity (color) standard deviation for calculating color differences. Default: **`0.1`**

## Example
```java
import fip.*;

PShader bilateral;
PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  bilateral = loadShader("bilateral.glsl");

  ireland = loadImage("ireland.jpg");

  bilateral.set("sigmaSpace", 20.0);
  bilateral.set("sigmaColor", 0.1);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(bilateral);
}
```