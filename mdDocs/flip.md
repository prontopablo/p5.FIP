Flips the input texture horizontally and/or vertically based on specified parameters.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`texOffset` **Vec2:** The offset used for sampling neighboring pixels. Default: **`(1.0 / width, 1.0 / height)`**
<br>
`flipHorizontal` **Boolean:**  If `true`, flips the texture horizontally. Default: **`false`**
<br>
`flipVertical` **Boolean:**  If `true`, flips the texture vertically. Default: **`true`**

## Example
```java
import fip.*;

PShader flip;

PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  flip = loadShader("flip.glsl");

  ireland = loadImage("ireland.jpg");

  flip.set("flipHorizontal", true);
  flip.set("flipVertical", false);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(flip);
}

```