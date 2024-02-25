Emulates a seven-segment display by grouping pixels into dots.

## Parameters
`texture` **Texture**: The input texture to be filtered. Default: **`The entire canvas`**
<br>
`dotSize` **Float:** The size of each dot in the display. Default: **`0.008`**
<br>

## Example
```java
import fip.*;

PShader dot;
PImage ireland;

void setup() {
  size(1000, 1000, P3D);

  dot = loadShader("dot.glsl");

  ireland = loadImage("ireland.jpg");
  dot.set("dotSize", 0.008);
}

void draw() {
  image(ireland, 0, 0, width, height);

  filter(dot);
}
```