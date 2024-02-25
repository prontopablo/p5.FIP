Computes the minimum pixel value within a local neighborhood. The structuring element is a square kernel centered at each pixel, and its size is determined by the specified radius.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`radius` **Int:** The radius of the erosion operation. Default: **`3`**

## Example
```java
import fip.*;

PShader erosion;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  erosion = loadShader("erosion.glsl");

  ireland = loadImage("ireland.jpg");

  erosion.set("radius", 3);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(erosion);
}

```