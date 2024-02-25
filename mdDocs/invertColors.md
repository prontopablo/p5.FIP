Inverts the colors of a texture.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**

## Example
```java
import fip.*;

PShader invertColors;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  invertColors = loadShader("invertColors.glsl");

  ireland = loadImage("ireland.jpg");
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(invertColors);
}

```