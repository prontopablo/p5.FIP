Adds a cartoon effect by emphasizing edges and darkening them.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`edgeThreshold` **Float:** The threshold value that determines whether a pixel is considered an edge pixel based on the difference between the center pixel and its neighbors. Default: **`0.1`**

## Example
```java
import fip.*;

PShader cartoon;
PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  cartoon = loadShader("cartoon.glsl");

  ireland = loadImage("ireland.jpg");

  cartoon.set("edgeThreshold", 0.1);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(cartoon);
}
```