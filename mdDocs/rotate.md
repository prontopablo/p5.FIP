Rotates an input texture based on a specified rotation angle in degrees. It ensures that the resulting rotated coordinates are within the texture bounds. If the rotated coordinates fall outside the bounds, the pixel becomes transparent. 

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`rotationAngleDegrees` **Float:** Rotation angle in degrees. Default: **`45.0`**

## Example
```java
import fip.*;

PShader rotate;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  rotate = loadShader("rotate.glsl");

  ireland = loadImage("ireland.jpg");

  rotate.set("rotationAngleDegrees", 45.0);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(rotate);
}

```