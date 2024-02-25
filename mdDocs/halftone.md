Applies a halftone effect by converting texture coordinates to screen space, defining cells based on the specified size, and calculating dots within each cell.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`resolution` **Vec2**: The resolution of the input texture. Default: **`vec2(1.0)`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`cellSize` **Float:** The size of each halftone cell. Default: **`20.0`**
<br>
`threshold` Float: The threshold value for dot creation. A higher value results in fewer dots. Default: **`0.8`**

## Example
```java
import fip.*;

PShader halftone;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  halftone = loadShader("halftone.glsl");

  ireland = loadImage("ireland.jpg");

  halftone.set("resolution", width, height);
  halftone.set("cellSize", 5.0);
  halftone.set("threshold", 0.2);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(halftone);
}

```